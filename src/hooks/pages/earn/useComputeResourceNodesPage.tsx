import { useCallback, useMemo, useState } from 'react'
import { NotificationBadge, TabsProps } from '@aleph-front/aleph-core'
import { useAppState } from '@/contexts/appState'
import { CCN, CRN, NodeManager } from '@/domain/node'
import {
  UseComputeResourceNodesReturn,
  useComputeResourceNodes,
} from '@/hooks/common/useComputeResourceNodes'
import { useFilterNodeIssues } from '@/hooks/common/useFilterNodeIssues'
import { useLastRewards } from '@/hooks/common/useRewards'
import { useFilterUserNodes } from '@/hooks/common/useFilterUserNodes'
import { useSortByIssuesNodes } from '@/hooks/common/useSortByIssuesNodes'
import { useUserCoreChannelNode } from '@/hooks/common/useUserCoreChannelNode'

export type UseComputeResourceNodesPageProps = {
  nodes?: CRN[]
}

export type UseComputeResourceNodesPageReturn =
  UseComputeResourceNodesReturn & {
    userNodes?: CRN[]
    userNode?: CCN
    filteredUserNodes?: CRN[]
    selectedTab: string
    tabs: TabsProps['tabs']
    userRewards?: number
    lastDistribution?: number
    nodesIssues: Record<string, string>
    handleLink: (nodeHash: string) => void
    handleUnlink: (nodeHash: string) => void
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

  // -----------------------------

  const { nodes, filteredNodes, ...rest } = useComputeResourceNodes(props)

  // -----------------------------

  const { userNodes } = useFilterUserNodes({ nodes })
  const { userNodes: baseFilteredUserNodes } = useFilterUserNodes({
    nodes: filteredNodes,
  })

  // -----------------------------

  const { nodesIssues, warningFlag } = useFilterNodeIssues({
    nodes: baseFilteredUserNodes,
  })

  // -----------------------------

  const { sortedNodes: filteredUserNodes } = useSortByIssuesNodes({
    nodesIssues,
    nodes: baseFilteredUserNodes,
  })

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

  const { userNode } = useUserCoreChannelNode({})

  const handleLink = useCallback(
    async (nodeHash: string) => {
      await nodeManager.linkComputeResourceNode(nodeHash)
    },
    [nodeManager],
  )

  const handleUnlink = useCallback(
    async (nodeHash: string) => {
      await nodeManager.unlinkComputeResourceNode(nodeHash)
    },
    [nodeManager],
  )

  // -----------------------------

  // console.log(filteredNodes)

  return {
    account,
    accountBalance,
    nodes,
    filteredNodes,
    userNodes,
    userNode,
    filteredUserNodes,
    selectedTab,
    tabs,
    userRewards,
    lastDistribution,
    nodesIssues,
    ...rest,
    handleLink,
    handleUnlink,
    handleTabChange,
  }
}
