import { defaultAccountChannel, scoringAddress } from '@/helpers/constants'
import { Account } from 'aleph-sdk-ts/dist/accounts/account'
import { messages } from 'aleph-sdk-ts'

const { post } = messages

export type BaseNode = {
  address: string
  multiaddress: string
  banner: string
  decentralization: number
  description: string
  hash: string
  locked: boolean
  manager: string
  name: string
  owner: string
  performance: number
  picture: string
  score: number
  score_updated: boolean
  registration_url: string
  reward: string
  status: string
  time: number
}

export type CCN = BaseNode & {
  authorized: string[]
  has_bonus: true
  resource_nodes: string[]
  stakers: Record<string, number>
  total_staked: number
  scoreData?: CCNScore
  crnsData: CRN[]
}

export type CRN = BaseNode & {
  authorized: string
  parent: string
  type: string
  scoreData?: CRNScore
}

export type BaseNodeScore = {
  decentralization: number
  node_id: string
  performance: number
  total_score: number
  version: number
}

export type CCNScore = BaseNodeScore & {
  measurements: {
    aggregate_latency_score_p25: number
    aggregate_latency_score_p95: number
    base_latency_score_p25: number
    base_latency_score_p95: number
    eth_height_remaining_score_p25: number
    eth_height_remaining_score_p95: number
    file_download_latency_score_p25: number
    file_download_latency_score_p95: number
    metrics_latency_score_p25: number
    metrics_latency_score_p95: number
    node_version_latest: number
    node_version_missing: number
    node_version_obsolete: number
    node_version_other: number
    node_version_outdated: number
    node_version_prerelease: number
    nodes_with_identical_asn: number
    total_nodes: number
  }
}

export type CRNScore = BaseNodeScore & {
  measurements: {
    base_latency_score_p25: number
    base_latency_score_p95: number
    diagnostic_vm_latency_score_p25: number
    diagnostic_vm_latency_score_p95: number
    full_check_latency_score_p25: number
    full_check_latency_score_p95: number
    node_version_latest: number
    node_version_missing: number
    node_version_obsolete: number
    node_version_other: number
    node_version_outdated: number
    node_version_prerelease: number
    nodes_with_identical_asn: number
    total_nodes: number
  }
}

export class NodeManager {
  constructor(
    protected account: Account,
    protected channel = defaultAccountChannel,
  ) {}

  async getCCNNodes(): Promise<CCN[]> {
    const res = await fetch(
      'https://api2.aleph.im/api/v0/aggregates/0xa1B3bb7d2332383D96b7796B908fB7f7F3c2Be10.json?keys=corechannel&limit=100',
    )

    const content = await res.json()
    const crns: CRN[] = content?.data?.corechannel?.resource_nodes
    let ccns: CCN[] = content?.data?.corechannel?.nodes

    const scores = await this.getScores()
    const scoresMap = new Map(scores.map((score) => [score.node_id, score]))

    ccns = ccns.map((ccn) => {
      const scoreData = scoresMap.get(ccn.hash)
      if (!scoreData) return ccn

      return {
        ...ccn,
        score: scoreData.total_score,
        scoreData,
      }
    })

    const crnsMap = crns.reduce((ac, cu) => {
      const crns = (ac[cu.parent] = ac[cu.parent] || [])
      crns.push(cu)
      return ac
    }, {} as Record<string, CRN[]>)

    ccns = ccns.map((ccn) => {
      const crnsData = crnsMap[ccn.hash] || []
      if (!crnsData) return ccn

      return {
        ...ccn,
        crnsData,
      }
    })

    console.log(ccns)

    return ccns
  }

  protected async getScores(): Promise<CCNScore[]> {
    const res = await post.Get({
      types: 'aleph-scoring-scores',
      addresses: [scoringAddress],
      pagination: 1,
      page: 1,
    })

    console.log(res)

    return (res.posts[0]?.content as any)?.scores?.ccn
  }

  protected async getMetrics() {
    return post.Get({
      types: 'aleph-network-metrics',
      addresses: [scoringAddress],
      pagination: 1,
      page: 1,
    })
  }

  isKYCRequired(node: CCN): boolean {
    return node.registration_url !== undefined && node.registration_url !== ''
  }

  isKYCCleared(node: CCN): boolean {
    return this.account && node.authorized?.includes(this.account.address)
  }

  isLocked(node: CCN): boolean {
    if (!node.locked) return false
    return !(this.isKYCRequired(node) && this.isKYCCleared(node))
  }

  isUserNode(node: CCN): boolean {
    if (!this.account) return false
    return this.account.address === node.owner
  }

  isStakeable(
    node: CCN,
    balance: number,
    stakeNodes: CCN[],
  ): [boolean, string] {
    if (!this.account) return [false, 'Please login']

    if (balance < 10_000)
      return [false, 'You need at least 10000 ALEPH to stake']

    if (node.total_staked >= 750_000)
      return [false, 'Too many ALEPH staked on that node']

    if (this.isLocked(node)) return [false, 'This node is locked']

    if (this.isUserNode(node))
      return [false, "You can't stake while you operate a node"]

    if (stakeNodes.length)
      return [
        true,
        'Add this node to your staking (each node will have an equal part of your total balance staked)',
      ]

    return [true, `Stake ${balance.toFixed(2)} ALEPH in this node`]
  }
}
