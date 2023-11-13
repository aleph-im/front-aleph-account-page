import { useCallback, useMemo } from 'react'
import { CCN, NodeManager } from '@/domain/node'
import { useAppState } from '@/contexts/appState'

export type UseUserStakeNodesProps = {
  nodes?: CCN[]
}

export type UseUserStakeNodesReturn = {
  stakeNodes?: CCN[]
}

export function useUserStakeNodes({
  nodes,
}: UseUserStakeNodesProps): UseUserStakeNodesReturn {
  const [state] = useAppState()
  const { account } = state.account

  // @todo: Refactor this (use singleton)
  const nodeManager = useMemo(() => new NodeManager(account), [account])

  const filterStakeNodes = useCallback(
    (nodes?: CCN[]) => {
      if (!nodes) return
      return nodes.filter((node) => nodeManager.isUserStake(node))
    },
    [nodeManager],
  )

  const stakeNodes = useMemo(
    () => filterStakeNodes(nodes),
    [filterStakeNodes, nodes],
  )

  return { stakeNodes }
}
