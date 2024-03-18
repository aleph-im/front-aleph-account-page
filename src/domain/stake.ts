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
import { normalizeValue } from '@/helpers/utils'
import { post } from 'aleph-sdk-ts/dist/messages'
import { ItemType, PostMessage } from 'aleph-sdk-ts/dist/messages/types'
import { subscribeSocketFeed } from '@/helpers/socket'

export type RewardsResponse = {
  type: 'calculation' | 'distribution'
  rewards: Record<string, number>
  lastHeight: number
  timestamp: number
}

export class StakeManager {
  // @todo: Calculate halving automatically using dates
  static dailyRewardsPool = 15_000 / 2
  static minStakeToActivateNode = 200_000
  static minLinkedNodesForPenalty = 3

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

  async *subscribeRewardsFeed(
    abort: Promise<void>,
  ): AsyncGenerator<RewardsResponse> {
    const feed = subscribeSocketFeed<PostMessage<any>>(
      // `${wsServer}/api/ws0/messages?msgType=POST&history=1&contentTypes=staking-rewards-distribution&addresses=${senderAddress},${monitorAddress}`,
      `${wsServer}/api/ws0/messages?msgType=POST&history=1&contentTypes=staking-rewards-distribution&addresses=${senderAddress}`,
      abort,
    )

    for await (const data of feed) {
      if (!data.content) return
      if (!data.content.content) return

      const { content, time } = data.content || {}
      const { status: type, rewards, end_height: lastHeight } = content

      if (
        type === 'calculation' ||
        (type === 'distribution' &&
          data.content.content.targets.some(({ success }: any) => success))
      ) {
        yield {
          type,
          rewards,
          lastHeight,
          timestamp: Math.trunc(time * 1000),
        }
      }
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
  async unstake(nodeHash: string): Promise<void> {
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
    return nodes.length * StakeManager.minStakeToActivateNode
  }

  totalStakedInActive(nodes: CCN[]): number {
    return this.totalStaked(this.activeNodes(nodes))
  }

  totalPerDay(nodes: CCN[]): number {
    const activeNodes = this.activeNodes(nodes).length
    if (!activeNodes) return 0

    // @note: https://medium.com/aleph-im/aleph-im-staking-go-live-part-2-stakers-tokenomics-663164b5ec78
    return StakeManager.dailyRewardsPool * ((Math.log10(activeNodes) + 1) / 3)
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
      const normalizedScore = normalizeValue(node.score, 0.2, 0.8, 0, 1)
      const linkedCRNPenalty = this.totalLinkedCRNPenaltyFactor(node)

      estAPY = this.currentAPY(nodes) * normalizedScore * linkedCRNPenalty
    }

    return estAPY
  }

  stakingRewardsPerDay(stake: number, nodes: CCN[]): number {
    return stake * this.totalPerAlephPerDay(nodes)
  }

  totalLinkedCRNPenaltyFactor(node: CCN): number {
    /** @note:
     * 3 to 5 linked > 100%
     * 2 linked > 90%
     * 1 linked > 80%
     * 0 linked > 70%
     **/

    const linkedCRN = Math.min(
      node.crnsData.filter((x) => x.score >= 0.2).length,
      StakeManager.minLinkedNodesForPenalty,
    )

    return 1 - (StakeManager.minLinkedNodesForPenalty - linkedCRN) / 10
  }

  CCNRewardsPerDay(node: CCN, nodes: CCN[]): number {
    if (!node.score) return 0

    const activeNodes = this.activeNodes(nodes).length
    const nodePool = StakeManager.dailyRewardsPool / activeNodes
    const normalizedScore = normalizeValue(node.score, 0.2, 0.8, 0, 1)
    const linkedCRNPenalty = this.totalLinkedCRNPenaltyFactor(node)

    return nodePool * normalizedScore * linkedCRNPenalty
  }

  CRNRewardsPerDay(node: CRN): number {
    if (!node.parent) return 0
    if (!node.score || !node.decentralization) return 0

    const { decentralization, score } = node
    const maxRewards = 500 + decentralization * 2500

    return maxRewards * normalizeValue(score, 0.2, 0.8, 0, 1)
  }
}
