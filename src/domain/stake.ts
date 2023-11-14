import { Account } from 'aleph-sdk-ts/dist/accounts/account'
import {
  apiServer,
  channel,
  defaultAccountChannel,
  monitorAddress,
  postType,
  senderAddress,
  tags,
  wsServer,
} from '@/helpers/constants'
import { AlephNode, CCN, CRN } from './node'
import { Future, normalizeValue } from '@/helpers/utils'
import { post } from 'aleph-sdk-ts/dist/messages'
import { ItemType } from 'aleph-sdk-ts/dist/messages/types'

export type RewardsResponse = {
  type: 'calculation' | 'distribution'
  rewards: Record<string, number>
  lastHeight: number
  timestamp: number
}

export class StakeManager {
  constructor(
    protected account?: Account,
    protected channel = defaultAccountChannel,
  ) {}

  async getLastRewardsCalculation(): Promise<RewardsResponse> {
    const res = await post.Get({
      types: 'staking-rewards-distribution',
      addresses: [monitorAddress],
      tags: ['calculation'],
      pagination: 1,
      page: 1,
      APIServer: apiServer,
    })

    const { content, time } = res.posts[0]
    const { rewards, end_height: lastHeight } = content as any

    return {
      type: 'calculation',
      rewards,
      lastHeight,
      timestamp: Math.trunc(time * 1000),
    }
  }

  async getLastRewardsDistribution(): Promise<RewardsResponse> {
    const res = await post.Get({
      types: 'staking-rewards-distribution',
      addresses: [senderAddress],
      tags: ['distribution'],
      pagination: 1,
      page: 1,
      APIServer: apiServer,
    })

    const { content, time } = res.posts[0]
    const { rewards, end_height: lastHeight } = content as any

    return {
      type: 'distribution',
      rewards,
      lastHeight,
      timestamp: Math.trunc(time * 1000),
    }
  }

  async *subscribeRewardsFeed(): AsyncGenerator<RewardsResponse> {
    let socket: WebSocket | undefined

    const values: RewardsResponse[] = []
    const futures: Future<RewardsResponse>[] = []

    function deliver() {
      while (true) {
        if (values.length === 0 || futures.length === 0) return

        const nextValue = values.shift() as RewardsResponse
        const nextFuture = futures.shift() as Future<RewardsResponse>

        nextFuture?.resolve(nextValue)
      }
    }

    const connect = () => {
      socket = new WebSocket(
        // `${wsServer}/api/ws0/messages?msgType=POST&history=1&contentTypes=staking-rewards-distribution&addresses=${senderAddress},${monitorAddress}`,
        `${wsServer}/api/ws0/messages?msgType=POST&history=1&contentTypes=staking-rewards-distribution&addresses=${senderAddress}`,
      )

      socket.addEventListener('message', handleMessage)
      socket.addEventListener('close', handleClose)
      socket.addEventListener('error', handleError)

      console.log('Oppening Socket', socket.readyState)
    }

    const close = (e?: CloseEvent, reconnect = true) => {
      const ws = socket

      socket?.removeEventListener('message', handleMessage)
      socket?.removeEventListener('close', handleClose)
      socket?.removeEventListener('error', handleError)

      socket?.close()
      socket = undefined

      console.log('Closing Socket', e?.reason, ws?.readyState)

      if (reconnect) {
        console.log('Reconnecting Socket in 1 second')
        setTimeout(connect, 1000)
      }
    }

    const push = (value: RewardsResponse) => {
      values.push(value)
      deliver()
    }

    const handleMessage = (event: MessageEvent) => {
      const data = JSON.parse(event.data)

      if (!data.content) return
      if (!data.content.content) return

      const { content, time } = data.content
      const { status: type, rewards, end_height: lastHeight } = content

      if (
        type === 'calculation' ||
        (type === 'distribution' &&
          data.content.content.targets.every(({ success }: any) => success))
      ) {
        push({
          type,
          rewards,
          lastHeight,
          timestamp: Math.trunc(time * 1000),
        })
      }
    }

    const handleClose = (e: CloseEvent) => {
      close(e, true)
    }

    const handleError = (err: any) => {
      console.error(
        'Socket encountered error: ',
        err?.message,
        'Closing socket',
      )
      close(undefined, false)
    }

    connect()

    try {
      while (true) {
        const future = new Future<RewardsResponse>()
        futures.push(future)

        deliver()

        yield await future.promise
      }
    } finally {
      // @note. close socket on desubs
      close()
    }
  }

  // https://github.com/aleph-im/aleph-account/blob/main/src/pages/Stake.vue#L204
  // https://github.com/aleph-im/aleph-account/blob/main/src/components/NodesTable.vue#L289
  async stake(nodeHash: string): Promise<void> {
    if (!this.account) throw new Error('Invalid account')

    await post.Publish({
      account: this.account,
      postType,
      channel,
      ref: nodeHash,
      content: {
        tags: ['stake-split', ...tags],
        action: 'stake-split',
      },
      storageEngine: ItemType.inline,
      APIServer: apiServer,
    })
  }

  // https://github.com/aleph-im/aleph-account/blob/main/src/components/NodesTable.vue#L268
  async unStake(nodeHash: string): Promise<void> {
    if (!this.account) throw new Error('Invalid account')

    await post.Publish({
      account: this.account,
      postType,
      channel,
      ref: nodeHash,
      content: {
        tags: ['unstake', ...tags],
        action: 'unstake',
      },
      storageEngine: ItemType.inline,
      APIServer: apiServer,
    })
  }

  // @todo: Refactor and inject nodeManager as dep
  isCRN(node: AlephNode): node is CRN {
    return Object.hasOwn(node, 'parent')
  }

  activeNodes<T extends AlephNode>(nodes: T[]): T[] {
    return nodes.filter((node) =>
      this.isCRN(node) ? node.status === 'linked' : node.status === 'active',
    )
  }

  totalStaked(nodes: CCN[]): number {
    return nodes.reduce((ac, cu) => ac + cu.total_staked, 0)
  }

  totalStakedByUser(nodes: CCN[]): number {
    const { account } = this
    if (!account) return 0

    return nodes.reduce((ac, cu) => ac + (cu.stakers[account.address] || 0), 0)
  }

  totalStakedByOperators(nodes: AlephNode[]): number {
    return nodes.length * 200_000
  }

  totalStakedInActive(nodes: CCN[]): number {
    return this.totalStaked(this.activeNodes(nodes))
  }

  totalPerDay(nodes: CCN[]): number {
    const activeNodes = this.activeNodes(nodes).length
    if (!activeNodes) return activeNodes

    return 15000 * ((Math.log10(activeNodes) + 1) / 3)
  }

  totalPerAlephPerDay(nodes: CCN[]): number {
    const totalStakedInActive = this.totalStakedInActive(nodes)
    if (!totalStakedInActive) return 0

    return this.totalPerDay(nodes) / totalStakedInActive
  }

  currentAPY(nodes: CCN[]): number {
    return (1 + this.totalPerAlephPerDay(nodes)) ** 365 - 1
  }

  computeEstimatedStakersAPY(node: CCN, nodes: CCN[]): number {
    let estAPY = 0

    if (node.score) {
      const linkedCRN = Math.min(
        node.crnsData.filter((x) => x.score >= 0.2).length,
        3,
      )

      const normalizedScore = normalizeValue(node.score, 0.2, 0.8, 0, 1)
      const linkedCRNPenalty = (3 - linkedCRN) / 10

      estAPY = this.currentAPY(nodes) * normalizedScore * (1 - linkedCRNPenalty)
    }

    return estAPY
  }

  stakingRewardsPerDay(stake: number, nodes: CCN[]): number {
    return stake * this.totalPerAlephPerDay(nodes)
  }

  CCNRewardsPerDay(node: CCN, nodes: CCN[]): number {
    let estRewards = 0

    if (node.score) {
      const linkedCRN = Math.min(node.crnsData.length, 3)
      const activeNodes = this.activeNodes(nodes).length
      const pool = 15_000 / activeNodes
      const normalizedScore = normalizeValue(node.score, 0.2, 0.8, 0, 1)
      const linkedCRNPenalty = (3 - linkedCRN) / 10

      estRewards = pool * normalizedScore * (1 - linkedCRNPenalty)
    }

    return estRewards
  }

  CRNRewardsPerDay(node: CRN): number {
    if (!node.parent) return 0
    if (!node.score || !node.decentralization) return 0

    const { decentralization, score } = node
    const maxRewards = 500 + decentralization * 2500

    return maxRewards * normalizeValue(score, 0.2, 0.8, 0, 1)
  }
}
