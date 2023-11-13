import { useCallback, useMemo } from 'react'
import { CCN, CRN, NodeManager } from '@/domain/node'
import { useAppState } from '@/contexts/appState'

export type UseUserNodesProps<Node> = {
  nodes?: Node[]
}

export type UseUserNodesReturn<Node> = {
  userNodes?: Node[]
}

export function useUserNodes<Node extends CCN | CRN>({
  nodes,
}: UseUserNodesProps<Node>): UseUserNodesReturn<Node> {
  const [state] = useAppState()
  const { account } = state.account

  // @todo: Refactor this (use singleton)
  const nodeManager = useMemo(() => new NodeManager(account), [account])

  const filterUserNodes = useCallback(
    (nodes?: Node[]) => {
      if (!nodes) return
      return nodes.filter((node) => nodeManager.isUserNode(node))
    },
    [nodeManager],
  )

  const userNodes = useMemo(
    () => filterUserNodes(nodes),
    [filterUserNodes, nodes],
  )

  return { userNodes }
}
