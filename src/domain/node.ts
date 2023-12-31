import {
  apiServer,
  channel,
  defaultAccountChannel,
  monitorAddress,
  postType,
  scoringAddress,
  tags,
  wsServer,
} from '@/helpers/constants'
import { Account } from 'aleph-sdk-ts/dist/accounts/account'
import { messages } from 'aleph-sdk-ts'
import {
  fetchAndCache,
  getLatestReleases,
  stripExtraTagDescription,
} from '@/helpers/utils'
import { AggregateMessage, ItemType } from 'aleph-sdk-ts/dist/messages/types'
import {
  newCCNSchema,
  newCRNSchema,
  updateCCNSchema,
  updateCRNSchema,
} from '@/helpers/schemas'
import { FileManager } from './file'
import { subscribeSocketFeed } from '@/helpers/socket'

const { post } = messages

export type NodeType = 'ccn' | 'crn'

export type NodeLastVersions = {
  latest: string | null
  prerelease: string | null
  outdated: string | null
}

export type BaseNodeStatus = 'active' | 'waiting'

export type BaseNode = {
  hash: string
  owner: string
  reward: string
  locked: boolean
  authorized?: string[]
  time: number
  score: number
  score_updated: boolean
  decentralization: number
  performance: number
  name?: string
  picture?: string
  banner?: string
  description?: string
  manager?: string

  // --------- CCN fields ?
  registration_url?: string

  virtual?: number
}

export type CCN = BaseNode & {
  multiaddress?: string
  status: BaseNodeStatus

  has_bonus: boolean
  resource_nodes: string[]
  stakers: Record<string, number>
  total_staked: number
  scoreData?: CCNScore
  metricsData?: CCNMetrics
  crnsData: CRN[]
}

export type CRN = BaseNode & {
  address?: string
  status: BaseNodeStatus | 'linked'

  parent: string | null
  type: string | 'compute'
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

export type BaseNodeScoreMeasurements = {
  total_nodes: number
  node_version_other: number
  node_version_latest: number
  node_version_missing: number
  node_version_obsolete: number
  node_version_outdated: number
  base_latency_score_p25: number
  base_latency_score_p95: number
  node_version_prerelease: number
  nodes_with_identical_asn: number
}

export type CCNScore = BaseNodeScore & {
  measurements: BaseNodeScoreMeasurements & {
    metrics_latency_score_p25: number
    metrics_latency_score_p95: number
    aggregate_latency_score_p25: number
    aggregate_latency_score_p95: number
    eth_height_remaining_score_p25: number
    eth_height_remaining_score_p95: number
    file_download_latency_score_p25: number
    file_download_latency_score_p95: number
  }
}

export type CRNScore = BaseNodeScore & {
  measurements: BaseNodeScoreMeasurements & {
    full_check_latency_score_p25: number
    full_check_latency_score_p95: number
    diagnostic_vm_latency_score_p25: number
    diagnostic_vm_latency_score_p95: number
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

export type NewCCN = {
  name: string
  multiaddress?: string
}

export type NewCRN = {
  name: string
  address: string
}

export type BaseUpdateNode = {
  hash?: string
  picture?: string | File
  banner?: string | File
  name?: string
  description?: string
  reward?: string
  authorized?: string | string[]
  locked?: boolean
  registration_url?: string
  manager?: string
}

export type UpdateCCN = BaseUpdateNode & {
  multiaddress?: string
}

export type UpdateCRN = BaseUpdateNode & {
  address?: string
}

export type UpdateAlephNode = UpdateCCN | UpdateCRN

export type NodesResponse = { ccns: CCN[]; crns: CRN[]; timestamp: number }

export class NodeManager {
  static newCCNSchema = newCCNSchema
  static newCRNSchema = newCRNSchema
  static updateCCNSchema = updateCCNSchema
  static updateCRNSchema = updateCRNSchema

  constructor(
    protected account?: Account,
    protected channel = defaultAccountChannel,
    protected fileManager: FileManager = new FileManager(account, channel),
  ) {}

  async getCCNNodes(): Promise<CCN[]> {
    const res = await this.fetchAllNodes()
    let { ccns, crns } = res

    crns = this.parseResourceNodes(crns)

    ccns = this.parseChildrenResourceNodes(ccns, crns)
    ccns = await this.parseScores(ccns, false)
    ccns = await this.parseMetrics(ccns, false)

    return ccns
  }

  async getCRNNodes(): Promise<CRN[]> {
    const res = await this.fetchAllNodes()
    const { ccns } = res
    let { crns } = res

    crns = this.parseResourceNodes(crns)

    crns = this.parseParentNodes(crns, ccns)
    crns = await this.parseScores(crns, true)
    crns = await this.parseMetrics(crns, true)

    return crns
  }

  async getAllNodes(): Promise<NodesResponse> {
    const response = await this.fetchAllNodes()

    const { timestamp } = response
    let { ccns, crns } = response

    crns = this.parseResourceNodes(crns)

    ccns = this.parseChildrenResourceNodes(ccns, crns)
    ccns = await this.parseScores(ccns, false)
    ccns = await this.parseMetrics(ccns, false)

    crns = this.parseParentNodes(crns, ccns)
    crns = await this.parseScores(crns, true)
    crns = await this.parseMetrics(crns, true)

    return { ccns, crns, timestamp }
  }

  async *subscribeNodesFeed(
    abort: Promise<void>,
  ): AsyncGenerator<NodesResponse> {
    const feed = subscribeSocketFeed<AggregateMessage<any>>(
      `${wsServer}/api/ws0/messages?msgType=AGGREGATE&history=1&addresses=${monitorAddress}`,
      abort,
    )

    for await (const data of feed) {
      if (!data.content) return
      if (!data.content.content) return

      const { content, address, key, time } = data.content || {}
      const { nodes, resource_nodes } = content

      if (
        address === monitorAddress &&
        key === 'corechannel' &&
        (nodes !== undefined || resource_nodes !== undefined)
      ) {
        let crns: CRN[] = resource_nodes
        let ccns: CCN[] = nodes

        crns = this.parseResourceNodes(crns)

        ccns = this.parseChildrenResourceNodes(ccns, crns)
        ccns = await this.parseScores(ccns, false)
        ccns = await this.parseMetrics(ccns, false)

        crns = this.parseParentNodes(crns, ccns)
        crns = await this.parseScores(crns, true)
        crns = await this.parseMetrics(crns, true)

        const timestamp = Math.trunc(time * 1000)

        yield { ccns, crns, timestamp }
      }
    }
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

  async newCoreChannelNode(newCCN: NewCCN): Promise<string> {
    if (!this.account) throw new Error('Invalid account')

    newCCN = await NodeManager.newCCNSchema.parseAsync(newCCN)

    const res = await post.Publish({
      account: this.account,
      postType,
      channel,
      content: {
        tags: ['create-node', ...tags],
        action: 'create-node',
        details: newCCN,
      },
      storageEngine: ItemType.inline,
      APIServer: apiServer,
    })

    return res.item_hash
  }

  async newComputeResourceNode(newCRN: NewCRN): Promise<string> {
    if (!this.account) throw new Error('Invalid account')

    newCRN = await NodeManager.newCRNSchema.parseAsync(newCRN)

    const res = await post.Publish({
      account: this.account,
      postType,
      channel,
      content: {
        tags: ['create-resource-node', ...tags],
        action: 'create-resource-node',
        details: { ...newCRN, type: 'compute' },
      },
      storageEngine: ItemType.inline,
      APIServer: apiServer,
    })

    return res.item_hash
  }

  async updateCoreChannelNode(
    updateCCN: UpdateCCN,
  ): Promise<[string, Partial<CCN>]> {
    updateCCN = await NodeManager.updateCCNSchema.parseAsync(updateCCN)

    return this.updateNode(updateCCN, 'create-node')
  }

  async updateComputeResourceNode(
    updateCRN: UpdateCRN,
  ): Promise<[string, Partial<CRN>]> {
    updateCRN = await NodeManager.updateCRNSchema.parseAsync(updateCRN)

    return this.updateNode(updateCRN, 'create-resource-node')
  }

  async removeNode(hash: string): Promise<string> {
    if (!this.account) throw new Error('Invalid account')

    // const res = await forget.Publish({
    //   hashes: [hash],
    //   channel,
    //   account: this.account,
    //   storageEngine: ItemType.inline,
    //   APIServer: apiServer,
    // })

    const res = await post.Publish({
      account: this.account,
      postType,
      channel,
      ref: hash,
      content: {
        tags: ['drop-node', ...tags],
        action: 'drop-node',
      },
      storageEngine: ItemType.inline,
      APIServer: apiServer,
    })

    return res.item_hash
  }

  // https://github.com/aleph-im/aleph-account/blob/8b920e34fab9f4f70e3387eed2bd5839ae923971/src/components/NodesTable.vue#L298
  async linkComputeResourceNode(crnHash: string): Promise<void> {
    if (!this.account) throw new Error('Invalid account')

    await post.Publish({
      account: this.account,
      postType,
      channel,
      ref: crnHash,
      content: {
        tags: ['link', ...tags],
        action: 'link',
      },
      storageEngine: ItemType.inline,
      APIServer: apiServer,
    })
  }

  // https://github.com/aleph-im/aleph-account/blob/8b920e34fab9f4f70e3387eed2bd5839ae923971/src/components/NodesTable.vue#L298
  async unlinkComputeResourceNode(crnHash: string): Promise<void> {
    if (!this.account) throw new Error('Invalid account')

    await post.Publish({
      account: this.account,
      postType,
      channel,
      ref: crnHash,
      content: {
        tags: ['unlink', ...tags],
        action: 'unlink',
      },
      storageEngine: ItemType.inline,
      APIServer: apiServer,
    })
  }

  protected async fetchAllNodes(): Promise<NodesResponse> {
    return fetchAndCache(
      `${apiServer}/api/v0/aggregates/0xa1B3bb7d2332383D96b7796B908fB7f7F3c2Be10.json?keys=corechannel&limit=100`,
      'nodes',
      1000 * 5,
      async (content: any) => {
        // const content = await res.json()
        const crns: CRN[] = content?.data?.corechannel?.resource_nodes
        const ccns: CCN[] = content?.data?.corechannel?.nodes

        const timestamp = 0

        return { ccns, crns, timestamp }
      },
    )
  }

  protected async updateNode<U extends UpdateAlephNode, N extends AlephNode>(
    { hash, ...details }: U,
    action: 'create-node' | 'create-resource-node',
  ): Promise<[string, Partial<N>]> {
    if (!this.account) throw new Error('Invalid account')
    if (!hash) throw new Error('Invalid node hash')

    if (!details.locked) {
      details.registration_url = ''
    }

    if (details.picture instanceof File) {
      details.picture = await this.fileManager.uploadFile(details.picture)
    }

    if (details.banner instanceof File) {
      details.banner = await this.fileManager.uploadFile(details.banner)
    }

    const res = await post.Publish({
      postType: 'amend',
      ref: hash,
      content: {
        tags: [action, ...tags],
        action,
        details,
      },
      channel,
      account: this.account,
      storageEngine: ItemType.inline,
      APIServer: apiServer,
    })

    return [
      res.item_hash,
      {
        hash,
        ...details,
        picture: details.picture as string,
        banner: details.banner as string,
      } as unknown as Partial<N>,
    ]
  }

  isCRN(node: AlephNode): node is CRN {
    return Object.hasOwn(node, 'parent')
  }

  isKYCRequired(node: CCN): boolean {
    return node.registration_url !== undefined && node.registration_url !== ''
  }

  isKYCCleared(node: CCN): boolean {
    if (!this.account) return false
    return node.authorized?.includes(this.account.address) || false
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
    return !!node.stakers[this.account.address]
  }

  isUserLinked(node: CRN, userNode?: CCN): boolean {
    if (!userNode) return false

    return (
      (this.isUserNode(userNode) && userNode.hash === node.parent) ||
      (this.isUserNode(node) && !!node.parent)
    )
  }

  isStakeable(node: CCN, balance: number): [boolean, string] {
    if (!this.account) return [false, 'Please login']

    if (balance < 10_000)
      return [false, 'You need at least 10000 ALEPH to stake']

    if (node.total_staked >= 750_000)
      return [false, 'Too many ALEPH staked on that node']

    if (this.isLocked(node)) return [false, 'This node is locked']

    if (this.isUserNode(node))
      return [false, "You can't stake while you operate a node"]

    if (this.isUserStake(node)) return [false, 'Already staking in this node']

    return [true, `Stake ${balance.toFixed(2)} ALEPH in this node`]
  }

  isLinkable(node: CRN, userNode?: CCN): [boolean, string] {
    if (!this.account) return [false, 'Please login']

    if (!userNode || !this.isUserNode(userNode))
      return [false, "The user doesn't own a core channel node"]

    if (node.locked) return [false, 'This node is locked']

    if (!!node.parent)
      return [false, `The node is already linked to ${node.parent} ccn`]

    if (userNode.resource_nodes.length >= 3)
      return [
        false,
        `The user node is already linked to ${userNode.resource_nodes.length} nodes`,
      ]

    return [true, `Link ${node.hash} to ${userNode.hash}`]
  }

  hasIssues(node: AlephNode, staking = false): string | undefined {
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

  protected parseResourceNodes(crns: CRN[]): CRN[] {
    return crns.map((crn) => {
      // @note: some nodes has {locked: ""}
      crn.locked = !!crn.locked
      return crn
    })
  }

  protected parseChildrenResourceNodes(ccns: CCN[], crns: CRN[]): CCN[] {
    const crnsMap = crns.reduce((ac, cu) => {
      if (!cu.parent) return ac

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
      if (!crn.parent) return crn

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
