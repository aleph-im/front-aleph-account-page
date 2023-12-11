import { useCallback, useMemo } from 'react'
import { useRouter } from 'next/router'
import { useNotification } from '@aleph-front/aleph-core'
import { AlephNode, NodeManager } from '@/domain/node'
import { useAppState } from '@/contexts/appState'
import { EntityDelAction } from '@/store/entity'

export type UseNodeDetailProps<N> = {
  node?: N
  nodes?: N[]
}

export type UseNodeDetailReturn<N> = {
  node?: N
  nodes?: N[]
  nodesOnSameASN?: number
  baseLatency?: string
  lastMetricsCheck?: string
  creationDate?: string
  isOwner?: boolean
  handleRemove: () => void
}

export function useNodeDetail<N extends AlephNode>({
  node,
  nodes,
}: UseNodeDetailProps<N>): UseNodeDetailReturn<N> {
  const router = useRouter()
  const noti = useNotification()

  const [state, dispatch] = useAppState()
  const { account } = state.account

  // @todo: Refactor this (use singleton)
  const nodeManager = useMemo(() => new NodeManager(account), [account])

  const isCRN = useMemo(
    () => (node ? nodeManager.isCRN(node) : undefined),
    [nodeManager, node],
  )

  const handleRemove = useCallback(async () => {
    if (!node) return
    if (!noti) throw new Error('Notification not ready')

    try {
      const nodeHash = node?.hash
      await nodeManager.removeNode(nodeHash)

      noti.add({
        variant: 'success',
        title: 'Success',
        text: `Your node "${node.hash}" was deleted successfully.`,
      })

      dispatch(
        new EntityDelAction({
          name: isCRN ? 'crns' : 'ccns',
          keys: [nodeHash],
        }),
      )

      router.replace(`/earn/${isCRN ? 'crn' : 'ccn'}`)
    } catch (e) {
      noti?.add({
        variant: 'error',
        title: 'Error',
        text: (e as Error).message,
      })
    }
  }, [dispatch, isCRN, node, nodeManager, noti, router])

  const { nodes_with_identical_asn: nodesOnSameASN } =
    node?.scoreData?.measurements || {}

  const { base_latency, measured_at } = node?.metricsData || {}

  const baseLatency = useMemo(
    () =>
      base_latency
        ? `${Number((base_latency || 0) * 100).toFixed(2)} %`
        : undefined,
    [base_latency],
  )

  const lastMetricsCheck = useMemo(() => {
    if (!measured_at) return

    const date = new Date(measured_at * 1000)
    return `${date.toLocaleDateString()} (${date.toLocaleTimeString()})`
  }, [measured_at])

  // -----------------------------

  const creationDate = useMemo(() => {
    if (!node) return

    const date = new Date(node?.time * 1000)
    return `${date.toLocaleDateString()}`
  }, [node])

  const isOwner = useMemo(
    () => node?.owner === account?.address,
    [account, node],
  )

  // -----------------------------

  return {
    node,
    nodesOnSameASN,
    baseLatency,
    lastMetricsCheck,
    creationDate,
    isOwner,
    handleRemove,
  }
}
