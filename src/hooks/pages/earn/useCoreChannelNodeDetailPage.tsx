import { useCallback, useMemo } from 'react'
import { useAppState } from '@/contexts/appState'
import { CCN, NodeManager } from '@/domain/node'
import { useRouter } from 'next/router'
import { useCoreChannelNode } from '@/hooks/common/useCoreChannelNode'
import { useAccountRewards } from '@/hooks/common/useRewards'
import {
  UseNodeDetailReturn,
  useNodeDetail,
} from '@/hooks/common/useNodeDetail'
import {
  UseEditCoreChannelNodeFormReturn,
  useEditCoreChannelNodeForm,
} from '@/hooks/form/useEditCoreChannelNodeForm'

export type UseCoreChannelNodeDetailPageProps = {
  nodes?: CCN[]
}

export type UseCoreChannelNodeDetailPageReturn = UseNodeDetailReturn<CCN> &
  UseEditCoreChannelNodeFormReturn & {
    nodes?: CCN[]
    node?: CCN
    aggregateLatency?: string
    fileDownloadLatency?: string
    metricsLatency?: string
    relativeETHHeightPercent?: number
    calculatedRewards?: number
    locked?: boolean
    handleUnlink: (hash: string) => void
  }

export function useCoreChannelNodeDetailPage(): UseCoreChannelNodeDetailPageReturn {
  const router = useRouter()
  const { hash } = router.query

  const [state] = useAppState()
  const { account } = state.account
  const { entities: nodes } = state.ccns

  const { node } = useCoreChannelNode({ hash })

  // @todo: Refactor this (use singleton)
  const nodeManager = useMemo(() => new NodeManager(account), [account])

  // @todo: Remove the fixed value and fetch it from the store / rpc node
  const ethLastBlockHeight = 18643103

  // -----------------------------

  const details = useNodeDetail({ node, nodes })

  const { calculatedRewards } = useAccountRewards({
    address: node?.reward || '',
  })

  // -----------------------------

  const {
    aggregate_latency,
    file_download_latency,
    metrics_latency,
    eth_height_remaining,
  } = node?.metricsData || {}

  const aggregateLatency = useMemo(
    () =>
      aggregate_latency
        ? `${Number((aggregate_latency || 0) * 100).toFixed(2)} %`
        : undefined,
    [aggregate_latency],
  )

  const fileDownloadLatency = useMemo(
    () =>
      file_download_latency
        ? `${Number((file_download_latency || 0) * 100).toFixed(2)} %`
        : undefined,
    [file_download_latency],
  )

  const metricsLatency = useMemo(
    () =>
      metrics_latency
        ? `${Number((metrics_latency || 0) * 100).toFixed(2)} %`
        : undefined,
    [metrics_latency],
  )

  const relativeETHHeightPercent = useMemo(() => {
    if (eth_height_remaining === undefined) return
    if (eth_height_remaining === 0) return 0

    return (
      Math.trunc(
        ((ethLastBlockHeight - eth_height_remaining) / ethLastBlockHeight) * 10,
      ) / 10
    )
  }, [eth_height_remaining])

  // -----------------------------

  const handleUnlink = useCallback(
    async (hash: string) => {
      if (!node) return

      const crn = node?.crnsData.find((crn) => crn.hash === hash)

      if (!crn) return
      if (!nodeManager.isUserLinked(crn, node)) return

      await nodeManager.unlinkComputeResourceNode(hash)
    },
    [node, nodeManager],
  )

  // -----------------------------

  const formProps = useEditCoreChannelNodeForm({
    defaultValues: {
      hash: node?.hash,
      name: node?.name,
      picture: node?.picture,
      banner: node?.banner,
      description: node?.description,
      reward: node?.reward,
      authorized: node?.authorized,
      locked: node?.locked,
      registration_url: node?.registration_url,
      manager: node?.manager,
      multiaddress: node?.multiaddress,
    },
  })

  return {
    aggregateLatency,
    fileDownloadLatency,
    metricsLatency,
    relativeETHHeightPercent,
    calculatedRewards,
    handleUnlink,
    ...formProps,
    ...details,
  }
}
