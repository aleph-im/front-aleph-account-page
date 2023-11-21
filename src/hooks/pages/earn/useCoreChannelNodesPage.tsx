import { useMemo, useState } from 'react'
import { NotificationBadge, TabsProps } from '@aleph-front/aleph-core'
import { useAppState } from '@/contexts/appState'
import { CCN } from '@/domain/node'
import {
  UseCoreChannelNodesReturn,
  useCoreChannelNodes,
} from '@/hooks/common/useCoreChannelNodes'
import { useFilterNodeIssues } from '@/hooks/common/useFilterNodeIssues'
import { useLastRewards } from '@/hooks/common/useRewards'
import { useFilterUserNodes } from '@/hooks/common/useFilterUserNodes'
import { useSortByIssuesNodes } from '@/hooks/common/useSortByIssuesNodes'

export type UseCoreChannelNodesPageProps = {
  nodes?: CCN[]
}

export type UseCoreChannelNodesPageReturn = UseCoreChannelNodesReturn & {
  userNodes?: CCN[]
  filteredUserNodes?: CCN[]
  selectedTab: string
  tabs: TabsProps['tabs']
  userRewards?: number
  lastDistribution?: number
  nodesIssues: Record<string, string>
  handleTabChange: (tab: string) => void
}

export function useCoreChannelNodesPage(
  props: UseCoreChannelNodesPageProps,
): UseCoreChannelNodesPageReturn {
  const [state] = useAppState()
  const { account, balance: accountBalance = 0 } = state.account

  const { nodes, filteredNodes, ...rest } = useCoreChannelNodes(props)

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
        name: 'My core nodes',
        disabled: !userNodes?.length,
        label: warningFlag
          ? {
              label: <NotificationBadge>{warningFlag}</NotificationBadge>,
              position: 'top',
            }
          : undefined,
      },
      { id: 'nodes', name: 'All core nodes' },
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

  // console.log(filteredNodes)

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
