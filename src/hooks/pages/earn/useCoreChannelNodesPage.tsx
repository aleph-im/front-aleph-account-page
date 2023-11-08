import { useCallback, useMemo, useState } from 'react'
import { NotificationBadge, TabsProps } from '@aleph-front/aleph-core'
import { useAppState } from '@/contexts/appState'
import { CCN, NodeManager } from '@/domain/node'
import {
  UseCoreChannelNodesReturn,
  useCoreChannelNodes,
} from '@/hooks/common/useCoreChannelNodes'
import { useNodeIssues } from '@/hooks/common/useNodeIssues'
import { useStakingRewards } from '@/hooks/common/useUserStakingRewards'

export type UseCoreChannelNodesPageProps = {
  nodes?: CCN[]
}

export type UseCoreChannelNodesPageReturn = UseCoreChannelNodesReturn & {
  userNodes?: CCN[]
  filteredUserNodes?: CCN[]
  selectedTab: string
  tabs: TabsProps['tabs']
  userRewards?: number
  nodesIssues: Record<string, string>
  handleTabChange: (tab: string) => void
}

export function useCoreChannelNodesPage(
  props: UseCoreChannelNodesPageProps,
): UseCoreChannelNodesPageReturn {
  const [{ account, accountBalance = 0 }] = useAppState()

  // @todo: Refactor this (use singleton)
  const nodeManager = useMemo(() => new NodeManager(account), [account])

  const { nodes, filteredNodes, ...rest } = useCoreChannelNodes(props)

  // -----------------------------

  const filterUserNodes = useCallback(
    (nodes?: CCN[]) => {
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

  const { rewards } = useStakingRewards()
  const userRewards = useMemo(
    () =>
      rewards
        ? userNodes?.reduce((ac, cv) => {
            return ac + (rewards[cv.reward] || 0)
          }, 0)
        : undefined,
    [rewards, userNodes],
  )

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
    nodesIssues,
    ...rest,
    handleTabChange,
  }
}
