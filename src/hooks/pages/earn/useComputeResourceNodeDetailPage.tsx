import { useAppState } from '@/contexts/appState'
import { CCN, CRN, NodeManager } from '@/domain/node'
import { useRouter } from 'next/router'
import { useComputeResourceNode } from '@/hooks/common/useComputeResourceNode'
import { useAccountRewards } from '@/hooks/common/useRewards'
import { useCallback, useMemo } from 'react'
import {
  UseNodeDetailReturn,
  useNodeDetail,
} from '@/hooks/common/useNodeDetail'
import { useUserCoreChannelNode } from '@/hooks/common/useUserCoreChannelNode'

export type UseComputeResourceNodeDetailPageProps = {
  nodes?: CRN[]
}

export type UseComputeResourceNodeDetailPageReturn =
  UseNodeDetailReturn<CRN> & {
    nodes?: CRN[]
    node?: CRN
    userNode?: CCN
    calculatedRewards?: number
    isUserLinked?: boolean
    isLinkable?: boolean
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

  const handleLink = useCallback(async () => {
    if (!node) return
    if (nodeManager.isUserLinked(node, userNode)) return

    const { hash } = node
    await nodeManager.linkComputeResourceNode(hash)
  }, [node, nodeManager, userNode])

  const handleUnlink = useCallback(async () => {
    if (!node) return
    if (!nodeManager.isUserLinked(node, userNode)) return

    const { hash } = node
    await nodeManager.unlinkComputeResourceNode(hash)
  }, [node, nodeManager, userNode])

  // -----------------------------

  return {
    nodes,
    node,
    userNode,
    calculatedRewards,
    isUserLinked,
    isLinkable,
    handleLink,
    handleUnlink,
    ...details,
  }
}
