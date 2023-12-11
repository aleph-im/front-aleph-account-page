import { useAppState } from '@/contexts/appState'
import { CCN, CRN, NodeManager } from '@/domain/node'
import { EntityAddAction } from '@/store/entity'
import { useNotification } from '@aleph-front/aleph-core'
import { useCallback, useMemo } from 'react'
import { useUserCoreChannelNode } from './useUserCoreChannelNode'

export type UseLinkingReturn = {
  handleLink: (nodeHash: string) => Promise<boolean>
  handleUnlink: (nodeHash: string) => Promise<boolean>
}

function calculateVirtualNodesLink(userNode: CCN, linkNode: CRN): [CCN, CRN] {
  const newLinkedNode: CRN = { ...linkNode, virtual: Date.now() }
  const newUserNode: CCN = { ...userNode, virtual: Date.now() }

  newLinkedNode.parent = newUserNode.hash
  newLinkedNode.parentData = newUserNode

  const crnsMap = newUserNode.crnsData.reduce((ac, cv) => {
    ac[cv.hash] = cv
    return ac
  }, {} as Record<string, CRN>)

  crnsMap[newLinkedNode.hash] = newLinkedNode

  newUserNode.crnsData = Object.values(crnsMap)
  newUserNode.resource_nodes = Object.keys(crnsMap)

  return [newUserNode, newLinkedNode]
}

function calculateVirtualNodesUnlink(
  userNode: CCN,
  unlinkNode: CRN,
): [CCN, CRN] {
  const newUnlinkedNode: CRN = { ...unlinkNode, virtual: Date.now() }
  const newUserNode: CCN = { ...userNode, virtual: Date.now() }

  newUnlinkedNode.parent = ''
  newUnlinkedNode.parentData = undefined

  const crns = newUserNode.crnsData.filter(
    (node) => node.hash !== newUnlinkedNode.hash,
  )

  newUserNode.crnsData = crns
  newUserNode.resource_nodes = crns.map((node) => node.hash)

  return [newUserNode, newUnlinkedNode]
}

export function useLinking(): UseLinkingReturn {
  const [state, dispatch] = useAppState()
  const { account } = state.account
  const { entities: nodes } = state.crns

  const nodeManager = useMemo(() => new NodeManager(account), [account])

  const noti = useNotification()

  const { userNode } = useUserCoreChannelNode({})

  const handleLink = useCallback(
    async (nodeHash: string) => {
      try {
        if (!noti) throw new Error('Notification not ready')
        if (!account) throw new Error('Invalid account')
        if (!userNode) throw new Error('Invalid user node')

        const targetNode = nodes?.find((node) => node.hash === nodeHash)
        if (!targetNode) throw new Error('Invalid staking node')

        if (
          !nodeManager.isLinkable(targetNode, userNode) ||
          nodeManager.isUserLinked(targetNode, userNode)
        )
          throw new Error('Not linkable node')

        await nodeManager.linkComputeResourceNode(nodeHash)

        noti.add({
          variant: 'success',
          title: 'Success',
          text: `Linked resource node "${nodeHash}" successfully.`,
        })

        const [ccn, crn] = calculateVirtualNodesLink(userNode, targetNode)

        dispatch(
          new EntityAddAction<CCN>({
            name: 'ccns',
            entities: [ccn],
          }),
        )

        dispatch(
          new EntityAddAction<CRN>({
            name: 'crns',
            entities: [crn],
          }),
        )

        return true
      } catch (e) {
        noti?.add({
          variant: 'error',
          title: 'Error',
          text: (e as Error).message,
        })
      }

      return false
    },
    [account, dispatch, nodeManager, nodes, noti, userNode],
  )

  const handleUnlink = useCallback(
    async (nodeHash: string) => {
      try {
        if (!noti) throw new Error('Notification not ready')
        if (!account) throw new Error('Invalid account')
        if (!userNode) throw new Error('Invalid user node')

        const targetNode = nodes?.find((node) => node.hash === nodeHash)
        if (!targetNode) throw new Error('Invalid staking node')

        if (!nodeManager.isUserLinked(targetNode, userNode))
          throw new Error('Not linkable node')

        await nodeManager.unlinkComputeResourceNode(nodeHash)

        noti.add({
          variant: 'success',
          title: 'Success',
          text: `Unlinked resource node "${nodeHash}" successfully.`,
        })

        const [ccn, crn] = calculateVirtualNodesUnlink(userNode, targetNode)

        dispatch(
          new EntityAddAction<CCN>({
            name: 'ccns',
            entities: [ccn],
          }),
        )

        dispatch(
          new EntityAddAction<CRN>({
            name: 'crns',
            entities: [crn],
          }),
        )

        return true
      } catch (e) {
        noti?.add({
          variant: 'error',
          title: 'Error',
          text: (e as Error).message,
        })
      }

      return false
    },
    [account, dispatch, nodeManager, nodes, noti, userNode],
  )

  return {
    handleLink,
    handleUnlink,
  }
}
