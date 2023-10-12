import { Account } from 'aleph-sdk-ts/dist/accounts/account'
import { defaultAccountChannel } from '@/helpers/constants'
import { CCN } from './node'
import { normalizeValue } from '@/helpers/utils'

export class RewardManager {
  constructor(
    protected account: Account,
    protected channel = defaultAccountChannel,
  ) {}

  activeNodes(nodes: CCN[]): CCN[] {
    return nodes.filter((node) => node.status === 'active')
  }

  totalStakedInActive(nodes: CCN[]): number {
    return this.activeNodes(nodes).reduce((ac, cu) => ac + cu.total_staked, 0)
  }

  totalPerDay(nodes: CCN[]): number {
    const activeNodes = this.activeNodes(nodes).length
    return 15000 * ((Math.log10(activeNodes) + 1) / 3)
  }

  totalPerAlephPerDay(nodes: CCN[]): number {
    return this.totalPerDay(nodes) / this.totalStakedInActive(nodes)
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
