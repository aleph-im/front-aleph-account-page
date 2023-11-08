import {
  apiServer,
  defaultAccountChannel,
  scoringAddress,
} from '@/helpers/constants'
import { Account } from 'aleph-sdk-ts/dist/accounts/account'
import { messages } from 'aleph-sdk-ts'
import {
  fetchAndCache,
  getLatestReleases,
  stripExtraTagDescription,
} from '@/helpers/utils'

const { post } = messages

export type NodeType = 'ccn' | 'crn'

export type NodeLastVersions = {
  latest: string | null
  prerelease: string | null
  outdated: string | null
}

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
  metricsData?: CCNMetrics
  crnsData: CRN[]
}

export type CRN = BaseNode & {
  authorized: string
  parent: string
  type: string
  scoreData?: CRNScore
  metricsData?: CRNMetrics
  parentData?: CCN
}

export type AlephNode = CCN | CRN

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

export type BaseNodeMetrics = {
  asn: number
  url: string
  as_name: string
  node_id: string
  version: string
  measured_at: number
  base_latency: number
  base_latency_ipv4: number
}

export type CCNMetrics = BaseNodeMetrics & {
  txs_total: number
  metrics_latency: number
  pending_messages: number
  aggregate_latency: number
  file_download_latency: number
  eth_height_remaining: number
}

export type CRNMetrics = BaseNodeMetrics & {
  full_check_latency: number
  diagnostic_vm_latency: number
}

export class NodeManager {
  constructor(
    protected account?: Account,
    protected channel = defaultAccountChannel,
  ) {}

  async getCCNNodes(): Promise<CCN[]> {
    const res = await fetch(
      `${apiServer}/api/v0/aggregates/0xa1B3bb7d2332383D96b7796B908fB7f7F3c2Be10.json?keys=corechannel&limit=100`,
    )

    const content = await res.json()
    const crns: CRN[] = content?.data?.corechannel?.resource_nodes
    let ccns: CCN[] = content?.data?.corechannel?.nodes

    ccns = this.parseResourceNodes(ccns, crns)
    ccns = await this.parseScores(ccns, false)
    ccns = await this.parseMetrics(ccns, false)

    // console.log(ccns)

    return ccns
  }

  async getCRNNodes(): Promise<CRN[]> {
    const res = await fetch(
      `${apiServer}/api/v0/aggregates/0xa1B3bb7d2332383D96b7796B908fB7f7F3c2Be10.json?keys=corechannel&limit=100`,
    )

    const content = await res.json()
    const ccns: CCN[] = content?.data?.corechannel?.nodes
    let crns: CRN[] = content?.data?.corechannel?.resource_nodes

    crns = this.parseParentNodes(crns, ccns)
    crns = await this.parseScores(crns, true)
    crns = await this.parseMetrics(crns, true)

    // console.log(crns)

    return crns
  }

  async getLatestVersion(node: AlephNode): Promise<NodeLastVersions> {
    return this.isCRN(node)
      ? this.getLatestCRNVersion()
      : this.getLatestCCNVersion()
  }

  async getLatestCCNVersion(): Promise<NodeLastVersions> {
    return fetchAndCache(
      'https://api.github.com/repos/aleph-im/pyaleph/releases',
      'ccn_versions',
      300_000,
      getLatestReleases,
    )
  }

  async getLatestCRNVersion(): Promise<NodeLastVersions> {
    return fetchAndCache(
      'https://api.github.com/repos/aleph-im/aleph-vm/releases',
      'crn_versions',
      300_000,
      getLatestReleases,
    )
  }

  isCRN(node: AlephNode): node is CRN {
    return Object.hasOwn(node, 'parent')
  }

  isKYCRequired(node: CCN): boolean {
    return node.registration_url !== undefined && node.registration_url !== ''
  }

  isKYCCleared(node: CCN): boolean {
    if (!this.account) return false
    return node.authorized?.includes(this.account.address)
  }

  isLocked(node: CCN): boolean {
    if (!node.locked) return false
    return !(this.isKYCRequired(node) && this.isKYCCleared(node))
  }

  isUserNode(node: AlephNode): boolean {
    if (!this.account) return false
    return this.account.address === node.owner
  }

  isUserStake(node: CCN): boolean {
    if (!this.account) return false
    return node.stakers[this.account.address] !== undefined
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

  hasIssues(node: CCN | CRN, staking = false): string | undefined {
    if (this.isCRN(node)) {
      if (node.score < 0.8) return 'The CRN is underperforming'
      if (!node.parentData) return 'The CRN is not being linked to a CCN'
      if ((node?.parentData?.score || 0) <= 0)
        return 'The linked CCN is underperforming'
    } else {
      if (node.score < 0.8) return 'The CCN is underperforming'
      if ((node?.crnsData.length || 0) < 3)
        return 'The CCN has less than three linked CRNs'
      if (!staking && node?.crnsData.some((crn) => crn.score < 0.8))
        return 'One of the linked CRN is underperforming'
    }
  }

  isNodeExperimental(node: AlephNode, lastVersion: NodeLastVersions): boolean {
    const closestTag = stripExtraTagDescription(node.metricsData?.version || '')

    return (
      closestTag !== node.metricsData?.version &&
      closestTag === lastVersion.prerelease
    )
  }

  isNodeLatest(node: AlephNode, lastVersion: NodeLastVersions) {
    return node.metricsData?.version === lastVersion.latest
  }

  isNodePrerelease(node: AlephNode, lastVersion: NodeLastVersions) {
    return node.metricsData?.version === lastVersion.prerelease
  }

  isNodeUptodate(node: AlephNode, lastVersion: NodeLastVersions) {
    return (
      this.isNodeLatest(node, lastVersion) ||
      this.isNodePrerelease(node, lastVersion) ||
      this.isNodeExperimental(node, lastVersion)
    )
  }

  isNodeOutdated(node: AlephNode, lastVersion: NodeLastVersions) {
    return lastVersion.outdated === node.metricsData?.version
  }

  protected parseResourceNodes(ccns: CCN[], crns: CRN[]): CCN[] {
    const crnsMap = crns.reduce((ac, cu) => {
      const crns = (ac[cu.parent] = ac[cu.parent] || [])
      crns.push(cu)
      return ac
    }, {} as Record<string, CRN[]>)

    return ccns.map((ccn) => {
      const crnsData = crnsMap[ccn.hash] || []
      if (!crnsData) return ccn

      return {
        ...ccn,
        crnsData,
      }
    })
  }

  protected parseParentNodes(crns: CRN[], ccns: CCN[]): CRN[] {
    const ccnsMap = ccns.reduce((ac, cu) => {
      ac[cu.hash] = cu
      return ac
    }, {} as Record<string, CCN>)

    return crns.map((crn) => {
      const parentData = ccnsMap[crn.parent]
      if (!parentData) return crn

      return {
        ...crn,
        parentData,
      }
    })
  }

  protected async parseScores<T extends AlephNode>(
    nodes: T[],
    isCrn: boolean,
  ): Promise<T[]> {
    const scores = isCrn ? await this.getCRNScores() : await this.getCCNScores()
    const scoresMap = new Map(scores.map((score) => [score.node_id, score]))

    return nodes.map((node) => {
      const scoreData = scoresMap.get(node.hash)
      if (!scoreData) return node

      return {
        ...node,
        score: scoreData.total_score,
        decentralization: scoreData.decentralization,
        performance: scoreData.performance,
        version: scoreData.version,
        scoreData,
      }
    })
  }

  protected async parseMetrics<T extends AlephNode>(
    nodes: T[],
    isCrn: boolean,
  ): Promise<T[]> {
    const metrics = isCrn
      ? await this.getCRNMetrics()
      : await this.getCCNMetrics()

    const metricsMap = new Map(
      metrics.map((metrics) => [metrics.node_id, metrics]),
    )

    return nodes.map((node) => {
      const metricsData = metricsMap.get(node.hash)
      if (!metricsData) return node

      return {
        ...node,
        metricsData,
      }
    })
  }

  protected async getScores(): Promise<{
    ccn: CCNScore[]
    crn: CRNScore[]
  }> {
    const res = await post.Get({
      types: 'aleph-scoring-scores',
      addresses: [scoringAddress],
      pagination: 1,
      page: 1,
    })

    return (res.posts[0]?.content as any)?.scores
  }

  protected async getMetrics(): Promise<{
    ccn: CCNMetrics[]
    crn: CRNMetrics[]
  }> {
    const res = await post.Get({
      types: 'aleph-network-metrics',
      addresses: [scoringAddress],
      pagination: 1,
      page: 1,
    })

    return (res.posts[0]?.content as any)?.metrics
  }

  protected async getCCNScores(): Promise<CCNScore[]> {
    const res = await this.getScores()
    return res.ccn
  }

  protected async getCCNMetrics(): Promise<CCNMetrics[]> {
    const res = await this.getMetrics()
    return res.ccn
  }

  protected async getCRNScores(): Promise<CRNScore[]> {
    const res = await this.getScores()
    return res.crn
  }

  protected async getCRNMetrics(): Promise<CRNMetrics[]> {
    const res = await this.getMetrics()
    return res.crn
  }
}
