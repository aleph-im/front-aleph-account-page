import { useMemo } from 'react'
import { AlephNode } from '@/domain/node'

export type UseSortedByIssuesNodesProps<T> = {
  nodes?: T[]
  nodesIssues: Record<string, string>
}

export type UseSortedByIssuesNodesReturn<T> = {
  sortedNodes?: T[]
}

export function useSortedByIssuesNodes<T extends AlephNode>({
  nodes,
  nodesIssues,
}: UseSortedByIssuesNodesProps<T>): UseSortedByIssuesNodesReturn<T> {
  const sortedNodes = useMemo(() => {
    if (!nodes) return

    // @note: show the nodes with issues at top
    return nodes.sort((a, b) => {
      const aIssues = nodesIssues[a.hash] ? 1 : 0
      const bIssues = nodesIssues[b.hash] ? 1 : 0
      return bIssues - aIssues
    })
  }, [nodes, nodesIssues])

  return { sortedNodes }
}
