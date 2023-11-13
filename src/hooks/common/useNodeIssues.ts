import { useMemo } from 'react'
import { CCN, CRN, NodeManager } from '@/domain/node'
import { useAppState } from '@/contexts/appState'

export type UseNodeIssuesProps<T extends CCN | CRN> = {
  nodes?: T[]
  isStaking?: boolean
}

export type UseNodeIssuesReturn = {
  nodesIssues: Record<string, string>
  warningFlag: number
}

export function useNodeIssues<T extends CCN | CRN>({
  nodes,
  isStaking,
}: UseNodeIssuesProps<T>): UseNodeIssuesReturn {
  const [state] = useAppState()
  const { account } = state.account

  // @todo: Refactor this (use singleton)
  const nodeManager = useMemo(() => new NodeManager(account), [account])

  const nodesIssues = useMemo(() => {
    const issues: Record<string, string> = {}
    if (!nodes?.length) return issues

    return nodes.reduce((ac, node) => {
      const issue = nodeManager.hasIssues(node, isStaking)
      if (!issue) return ac

      ac[node.hash] = issue
      return ac
    }, issues)
  }, [isStaking, nodeManager, nodes])

  const warningFlag = useMemo(
    () => Object.values(nodesIssues).length,
    [nodesIssues],
  )

  return { nodesIssues, warningFlag }
}
