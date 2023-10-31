import { Account } from 'aleph-sdk-ts/dist/accounts/account'
import {
  apiServer,
  defaultAccountChannel,
  rewardsAddress,
} from '@/helpers/constants'
import { AlephNode, CCN, CRN } from './node'
import { normalizeValue } from '@/helpers/utils'
import { post } from 'aleph-sdk-ts/dist/messages'
import { ItemType } from 'aleph-sdk-ts/dist/messages/types'

export class StakeManager {
  constructor(
    protected account?: Account,
    protected channel = defaultAccountChannel,
  ) {}

  async getLastStakingRewards(): Promise<Record<string, number>> {
    const res = await post.Get({
      types: 'staking-rewards-distribution',
      addresses: [rewardsAddress],
      tags: ['distribution'],
      pagination: 1,
      page: 1,
    })

    return (res.posts[0]?.content as any)?.rewards
  }

  async getLastUserStakingRewards(): Promise<number> {
    if (!this.account) return 0
    const rewards = await this.getLastStakingRewards()

    return rewards[this.account.address]
  }

  // https://github.com/aleph-im/aleph-account/blob/main/src/pages/Stake.vue#L204
  // https://github.com/aleph-im/aleph-account/blob/main/src/components/NodesTable.vue#L289
  async stake(nodeHash: string): Promise<void> {
    if (!this.account) throw new Error('Invalid account')

    await post.Publish({
      account: this.account,
      postType: 'corechan-operation',
      storageEngine: ItemType.inline,
      ref: nodeHash,
      APIServer: apiServer,
      channel: 'FOUNDATION',
      content: {
        tags: ['stake-split', 'mainnet'],
        action: 'stake-split',
      },
    })
  }

  // https://github.com/aleph-im/aleph-account/blob/main/src/components/NodesTable.vue#L268
  async unStake(nodeHash: string): Promise<void> {
    if (!this.account) throw new Error('Invalid account')

    await post.Publish({
      account: this.account,
      postType: 'corechan-operation',
      storageEngine: ItemType.inline,
      ref: nodeHash,
      APIServer: apiServer,
      channel: 'FOUNDATION',
      content: {
        tags: ['unstake', 'mainnet'],
        action: 'unstake',
      },
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

  totalStakedByOperators(nodes: (CCN | CRN)[]): number {
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

  computeCCNRewards(node: CCN, nodes: CCN[]): number {
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

  computeCRNRewards(node: CRN): number {
    if (!node.parent) return 0
    if (!node.score || !node.decentralization) return 0

    const { decentralization, score } = node
    const maxRewards = 500 + decentralization * 2500

    return maxRewards * normalizeValue(score, 0.2, 0.8, 0, 1)
  }
}
