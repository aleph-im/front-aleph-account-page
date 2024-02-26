import { useAppState } from '@/contexts/appState'
import {
  CCN,
  CRN,
  CRNBenchmark,
  CRNSpecs,
  NodeManager,
  StreamNotSupportedIssue,
} from '@/domain/node'
import { useRouter } from 'next/router'
import { useComputeResourceNode } from '@/hooks/common/useComputeResourceNode'
import { useAccountRewards } from '@/hooks/common/useRewards'
import { useCallback, useMemo } from 'react'
import {
  UseNodeDetailReturn,
  useNodeDetail,
} from '@/hooks/common/useNodeDetail'
import { useUserCoreChannelNode } from '@/hooks/common/useUserCoreChannelNode'
import {
  UseEditComputeResourceNodeFormReturn,
  useEditComputeResourceNodeForm,
} from '@/hooks/form/useEditComputeResourceNodeForm'
import { useLinking } from '@/hooks/common/useLinking'
import {
  UseHostingProviderTopItem,
  useHostingProviderTop,
} from '@/hooks/common/useHostingProviderTop'
import { useRequestCRNSpecs } from '@/hooks/common/useRequestEntity/useRequestCRNSpecs'
import { consoleNewInstanceUrl } from '@/helpers/constants'
import { convertByteUnits } from '@/helpers/utils'
import { useRequestCRNIps } from '@/hooks/common/useRequestEntity/useRequestCRNIps'
// import { useRequestCRNBenchmark } from '@/hooks/common/useRequestEntity/useRequestCRNBenchmark'

export type UseComputeResourceNodeDetailPageProps = {
  nodes?: CRN[]
}

export type UseComputeResourceNodeDetailPageReturn = UseNodeDetailReturn<CRN> &
  UseEditComputeResourceNodeFormReturn & {
    nodes?: CRN[]
    node?: CRN
    userNode?: CCN
    calculatedRewards?: number
    isUserLinked?: boolean
    isLinkable?: boolean
    asnTier?: UseHostingProviderTopItem
    nodeSpecs?: CRNSpecs
    nodeIssue?: StreamNotSupportedIssue
    createInstanceUrl?: string
    nodeBenchmark?: CRNBenchmark
    handleRemove: () => void
    handleLink: () => void
    handleUnlink: () => void
  }

export function useComputeResourceNodeDetailPage(): UseComputeResourceNodeDetailPageReturn {
  const router = useRouter()
  const { hash } = router.query

  const [state] = useAppState()
  const { account } = state.account
  const { entities: nodes } = state.crns

  const { node } = useComputeResourceNode({ hash })

  const { userNode } = useUserCoreChannelNode({})

  // @todo: Refactor this (use singleton)
  const nodeManager = useMemo(() => new NodeManager(account), [account])
  nodeManager.isUserLinked
  // -----------------------------

  const { calculatedRewards } = useAccountRewards({
    address: node?.reward || '',
  })

  // -----------------------------

  const details = useNodeDetail({ node, nodes })

  // -----------------------------

  const isUserLinked = useMemo(() => {
    if (!node) return
    return nodeManager.isUserLinked(node, userNode)
  }, [node, nodeManager, userNode])

  const isLinkable = useMemo(() => {
    if (!node) return
    return nodeManager.isLinkable(node, userNode)[0]
  }, [node, nodeManager, userNode])

  const { handleLink: handleLinkBase, handleUnlink: handleUnlinkBase } =
    useLinking()

  const handleLink = useCallback(async () => {
    if (!node) return

    const success = await handleLinkBase(node.hash)
    if (!success) return

    if (!userNode) return
    router.replace(`/earn/ccn/${userNode.hash}`)
  }, [handleLinkBase, router, node, userNode])

  const handleUnlink = useCallback(async () => {
    if (!node) return

    const success = await handleUnlinkBase(node.hash)
    if (!success) return

    if (!userNode) return
    router.replace(`/earn/ccn/${userNode?.hash}`)
  }, [handleUnlinkBase, router, node, userNode])

  // -----------------------------

  const { top } = useHostingProviderTop({ nodes })
  const asnTier = top.find(
    (topAsn) => topAsn.name === node?.metricsData?.as_name,
  )

  // -----------------------------

  const nodeArray = useMemo(() => {
    if (!node) return
    return [node]
  }, [node])

  const { specs } = useRequestCRNSpecs({ nodes: nodeArray })
  const { ips } = useRequestCRNIps({ nodes: nodeArray })

  // @note: hardcoded here, find a way to share them between console / account pages (new npm lib domain package maybe or API)
  const minSpecs = useMemo(() => {
    return {
      cpu: 1,
      ram: convertByteUnits(2, { from: 'GiB', to: 'MiB' }),
      storage: convertByteUnits(2 * 10, { from: 'GiB', to: 'MiB' }),
    }
  }, [])

  const nodesIssues = useMemo(() => {
    if (!nodeArray) return

    return nodeArray.reduce((ac, node) => {
      const issue = nodeManager.isStreamPaymentNotSupported(node)

      if (issue) {
        ac[node.hash] = issue
        return ac
      }

      const nodeSpecs = specs[node.hash]?.data

      if (nodeSpecs) {
        const validSpecs = nodeManager.validateMinNodeSpecs(minSpecs, nodeSpecs)

        if (!validSpecs) {
          ac[node.hash] = StreamNotSupportedIssue.MinSpecs
          return ac
        }
      }

      const nodeIps = ips[node.hash]?.data

      if (nodeIps) {
        const validIp = !!nodeIps.vm

        if (!validIp) {
          ac[node.hash] = StreamNotSupportedIssue.IPV6
          return ac
        }
      }

      if (nodeSpecs && nodeIps) {
        ac[node.hash] = StreamNotSupportedIssue.Valid
      }

      return ac
    }, {} as Record<string, StreamNotSupportedIssue>)
  }, [nodeArray, nodeManager, specs, ips, minSpecs])

  const nodeSpecs = useMemo(() => {
    if (!node) return
    return specs[node.hash]?.data
  }, [specs, node])

  const nodeIssue = useMemo(() => {
    if (!node) return
    return nodesIssues?.[node.hash]
  }, [nodesIssues, node])

  const createInstanceUrl = useMemo(() => {
    if (!node) return

    const isLoading = nodeIssue === undefined
    return !isLoading && !nodeIssue
      ? `${consoleNewInstanceUrl}/${node.hash}`
      : undefined
  }, [node, nodeIssue])

  // -----------------------------

  // const { benchmark } = useRequestCRNBenchmark({ nodes: nodeArray })

  // const nodeBenchmark = useMemo(() => {
  //   if (!node) return
  //   return benchmark[node.hash]?.data
  // }, [benchmark, node])

  // -----------------------------

  const defaultValues = useMemo(() => {
    return {
      hash: node?.hash,
      name: node?.name,
      description: node?.description,
      reward: node?.reward,
      stream_reward: node?.stream_reward,
      authorized: node?.authorized,
      locked: node?.locked,
      registration_url: node?.registration_url,
      picture: node?.picture,
      banner: node?.banner,
      address: node?.address,
    }
  }, [node])

  const formProps = useEditComputeResourceNodeForm({ defaultValues })

  return {
    nodes,
    node,
    userNode,
    calculatedRewards,
    isUserLinked,
    isLinkable,
    asnTier,
    nodeSpecs,
    nodeIssue,
    createInstanceUrl,
    // nodeBenchmark,
    handleLink,
    handleUnlink,
    ...formProps,
    ...details,
  }
}
