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
import {
  UseEditComputeResourceNodeFormReturn,
  useEditComputeResourceNodeForm,
} from '@/hooks/form/useEditComputeResourceNodeForm'
import { useNotification } from '@aleph-front/aleph-core'

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
    handleRemove: () => void
    handleLink: () => void
    handleUnlink: () => void
  }

export function useComputeResourceNodeDetailPage(): UseComputeResourceNodeDetailPageReturn {
  const noti = useNotification()
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
    if (!noti) throw new Error('Notification not ready')

    if (!node) return
    if (nodeManager.isUserLinked(node, userNode)) return
    const { hash } = node

    try {
      await nodeManager.linkComputeResourceNode(hash)

      noti.add({
        variant: 'success',
        title: 'Success',
        text: `Linked resource node "${hash}" successfully.`,
      })
    } catch (e) {
      noti?.add({
        variant: 'error',
        title: 'Error',
        text: (e as Error).message,
      })
    }
  }, [node, nodeManager, noti, userNode])

  const handleUnlink = useCallback(async () => {
    if (!noti) throw new Error('Notification not ready')

    if (!node) return
    if (!nodeManager.isUserLinked(node, userNode)) return
    const { hash } = node

    try {
      await nodeManager.unlinkComputeResourceNode(hash)

      noti.add({
        variant: 'success',
        title: 'Success',
        text: `Unlinked resource node "${hash}" successfully.`,
      })
    } catch (e) {
      noti?.add({
        variant: 'error',
        title: 'Error',
        text: (e as Error).message,
      })
    }
  }, [node, nodeManager, noti, userNode])

  // -----------------------------

  const formProps = useEditComputeResourceNodeForm({
    defaultValues: {
      hash: node?.hash,
      name: node?.name,
      description: node?.description,
      reward: node?.reward,
      authorized: node?.authorized,
      locked: node?.locked,
      registration_url: node?.registration_url,
      manager: node?.manager,
      picture: node?.picture,
      banner: node?.banner,
      address: node?.address,
    },
  })

  return {
    nodes,
    node,
    userNode,
    calculatedRewards,
    isUserLinked,
    isLinkable,
    handleLink,
    handleUnlink,
    ...formProps,
    ...details,
  }
}
