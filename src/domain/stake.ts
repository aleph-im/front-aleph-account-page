import { Account } from 'aleph-sdk-ts/dist/accounts/account'
import { apiServer, defaultAccountChannel } from '@/helpers/constants'
import { CCN } from './node'
import { normalizeValue } from '@/helpers/utils'
import { post } from 'aleph-sdk-ts/dist/messages'
import { ItemType } from 'aleph-sdk-ts/dist/messages/types'

export class StakeManager {
  constructor(
    protected account?: Account,
    protected channel = defaultAccountChannel,
  ) {}

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

  activeNodes(nodes: CCN[]): CCN[] {
    return nodes.filter((node) => node.status === 'active')
  }

  totalStakedInActive(nodes: CCN[]): number {
    return this.activeNodes(nodes).reduce((ac, cu) => ac + cu.total_staked, 0)
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
}
