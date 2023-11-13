import { useCallback, useMemo, useState } from 'react'
import { NotificationBadge, TabsProps } from '@aleph-front/aleph-core'
import { useAppState } from '@/contexts/appState'
import { CRN, NodeManager } from '@/domain/node'
import {
  UseComputeResourceNodesReturn,
  useComputeResourceNodes,
} from '@/hooks/common/useComputeResourceNodes'
import { useNodeIssues } from '@/hooks/common/useNodeIssues'
import { useLastRewards } from '@/hooks/common/useRewards'

export type UseComputeResourceNodesPageProps = {
  nodes?: CRN[]
}

export type UseComputeResourceNodesPageReturn =
  UseComputeResourceNodesReturn & {
    userNodes?: CRN[]
    filteredUserNodes?: CRN[]
    selectedTab: string
    tabs: TabsProps['tabs']
    userRewards?: number
    lastDistribution?: number
    nodesIssues: Record<string, string>
    handleTabChange: (tab: string) => void
  }

export function useComputeResourceNodesPage(
  props: UseComputeResourceNodesPageProps,
): UseComputeResourceNodesPageReturn {
  const [state] = useAppState()
  const { account, balance: accountBalance = 0 } = state.account

  // -----------------------------

  // @todo: Refactor this (use singleton)
  const nodeManager = useMemo(() => new NodeManager(account), [account])

  const { nodes, filteredNodes, ...rest } = useComputeResourceNodes(props)

  // -----------------------------

  const filterUserNodes = useCallback(
    (nodes?: CRN[]) => {
      if (!nodes) return
      return nodes.filter((node) => nodeManager.isUserNode(node))
    },
    [nodeManager],
  )

  const userNodes = useMemo(
    () => filterUserNodes(nodes),
    [filterUserNodes, nodes],
  )

  const filteredUserNodes = useMemo(
    () => filterUserNodes(filteredNodes),
    [filterUserNodes, filteredNodes],
  )

  // -----------------------------

  const { nodesIssues, warningFlag } = useNodeIssues({ nodes: userNodes })

  // -----------------------------

  const [tab, handleTabChange] = useState('user')
  const selectedTab = userNodes?.length ? tab : 'nodes'

  const tabs = useMemo(() => {
    const tabs: TabsProps['tabs'] = [
      {
        id: 'user',
        name: 'My compute nodes',
        disabled: !userNodes?.length,
        label: warningFlag
          ? {
              label: <NotificationBadge>{warningFlag}</NotificationBadge>,
              position: 'top',
            }
          : undefined,
      },
      { id: 'nodes', name: 'All compute nodes' },
    ]

    return tabs
  }, [userNodes, warningFlag])

  // -----------------------------

  const { lastRewardsCalculation, lastRewardsDistribution } = useLastRewards()

  const userRewards = useMemo(
    () =>
      lastRewardsCalculation
        ? userNodes?.reduce((ac, cv) => {
            return ac + (lastRewardsCalculation.rewards[cv.reward] || 0)
          }, 0)
        : undefined,
    [lastRewardsCalculation, userNodes],
  )

  const lastDistribution = lastRewardsDistribution?.timestamp

  // -----------------------------

  return {
    account,
    accountBalance,
    nodes,
    filteredNodes,
    userNodes,
    filteredUserNodes,
    selectedTab,
    tabs,
    userRewards,
    lastDistribution,
    nodesIssues,
    ...rest,
    handleTabChange,
  }
}
