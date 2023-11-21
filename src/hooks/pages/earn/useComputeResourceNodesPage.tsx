import { useCallback, useMemo, useState } from 'react'
import { NotificationBadge, TabsProps } from '@aleph-front/aleph-core'
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
import { useFilterUserLinkedNodes } from '@/hooks/common/useFilterUserLinkedNodes'

export type UseComputeResourceNodesPageProps = {
  nodes?: CRN[]
}

export type UseComputeResourceNodesPageReturn =
  UseComputeResourceNodesReturn & {
    userNodes?: CRN[]
    filteredUserNodes?: CRN[]
    userNodesIssues: Record<string, string>
    userLinkedNodes?: CRN[]
    filteredUserLinkedNodes?: CRN[]
    userLinkedNodesIssues: Record<string, string>
    userNode?: CCN
    selectedTab: string
    tabs: TabsProps['tabs']
    userRewards?: number
    lastDistribution?: number
    handleLink: (nodeHash: string) => void
    handleUnlink: (nodeHash: string) => void
    handleTabChange: (tab: string) => void
  }

export function useComputeResourceNodesPage(
  props: UseComputeResourceNodesPageProps,
): UseComputeResourceNodesPageReturn {
  // ----------------------------- CR NODES

  const { nodes, filteredNodes, ...rest } = useComputeResourceNodes(props)
  const { account } = rest

  // -----------------------------

  // @todo: Refactor this (use singleton)
  const nodeManager = useMemo(() => new NodeManager(account), [account])

  // ----------------------------- USER NODES

  const { userNodes } = useFilterUserNodes({ nodes })
  const { userNodes: baseFilteredUserNodes } = useFilterUserNodes({
    nodes: filteredNodes,
  })

  // ----------------------------- LINKED NODES

  const { userLinkedNodes } = useFilterUserLinkedNodes({ nodes })
  const { userLinkedNodes: baseFilteredUserLinkedNodes } =
    useFilterUserLinkedNodes({
      nodes: filteredNodes,
    })

  // ----------------------------- NODE ISSUES

  const { nodesIssues: userNodesIssues, warningFlag: userNodesWarningFlag } =
    useFilterNodeIssues({
      nodes: baseFilteredUserNodes,
    })

  const {
    nodesIssues: userLinkedNodesIssues,
    warningFlag: userLinkedNodesWarningFlag,
  } = useFilterNodeIssues({
    nodes: baseFilteredUserLinkedNodes,
  })

  const { sortedNodes: filteredUserNodes } = useSortByIssuesNodes({
    nodesIssues: userNodesIssues,
    nodes: baseFilteredUserNodes,
  })

  const { sortedNodes: filteredUserLinkedNodes } = useSortByIssuesNodes({
    nodesIssues: userLinkedNodesIssues,
    nodes: baseFilteredUserLinkedNodes,
  })

  // ----------------------------- TABS

  const [tab, handleTabChange] = useState()
  const selectedTab =
    tab ||
    (!!userNodes?.length
      ? 'user'
      : !!userLinkedNodes?.length
      ? 'linked'
      : 'nodes')

  const tabs = useMemo(() => {
    const tabs: TabsProps['tabs'] = [
      {
        id: 'user',
        name: 'My compute nodes',
        disabled: !userNodes?.length,
        label: userNodesWarningFlag
          ? {
              label: (
                <NotificationBadge>{userNodesWarningFlag}</NotificationBadge>
              ),
              position: 'top',
            }
          : undefined,
      },
      {
        id: 'linked',
        name: 'Linked compute nodes',
        disabled: !userLinkedNodes?.length,
        label: userLinkedNodesWarningFlag
          ? {
              label: (
                <NotificationBadge>
                  {userLinkedNodesWarningFlag}
                </NotificationBadge>
              ),
              position: 'top',
            }
          : undefined,
      },
      { id: 'nodes', name: 'All compute nodes' },
    ]

    return tabs
  }, [
    userLinkedNodes,
    userLinkedNodesWarningFlag,
    userNodes,
    userNodesWarningFlag,
  ])

  // ----------------------------- REWARDS

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

  // ----------------------------- LINK CRN

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
    nodes,
    filteredNodes,
    userNodes,
    filteredUserNodes,
    userNodesIssues,
    userLinkedNodes,
    filteredUserLinkedNodes,
    userLinkedNodesIssues,
    userNode,
    selectedTab,
    tabs,
    userRewards,
    lastDistribution,
    handleLink,
    handleUnlink,
    handleTabChange,
    ...rest,
  }
}
