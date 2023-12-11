import { useAppState } from '@/contexts/appState'
import { CCN, NodeManager } from '@/domain/node'
import { StakeManager } from '@/domain/stake'
import {
  UseCoreChannelNodesReturn,
  useCoreChannelNodes,
} from '@/hooks/common/useCoreChannelNodes'
import { useFilterNodeIssues } from '@/hooks/common/useFilterNodeIssues'
import { useAccountRewards } from '@/hooks/common/useRewards'
import { useSortByIssuesNodes } from '@/hooks/common/useSortByIssuesNodes'
import { useFilterUserStakeNodes } from '@/hooks/common/useFilterUserStakeNodes'
import { NotificationBadge, TabsProps } from '@aleph-front/aleph-core'
import { ChangeEvent, useCallback, useMemo, useState } from 'react'
import { useStaking } from '@/hooks/common/useStake'

export type UseStakingPageProps = {
  nodes?: CCN[]
}

export type UseStakingPageReturn = UseCoreChannelNodesReturn & {
  filteredStakeNodes?: CCN[]
  selectedTab: string
  tabs: TabsProps['tabs']
  isStakeableOnly: boolean
  isStakeableOnlyDisabled: boolean
  userStake: number
  userRewards?: number
  lastDistribution?: number
  nodesIssues: Record<string, string>
  handleTabChange: (tab: string) => void
  handleStake: (nodeHash: string) => void
  handleUnstake: (nodeHash: string) => void
  handleStakeableOnlyChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export function useStakingPage(
  props: UseStakingPageProps,
): UseStakingPageReturn {
  const [state] = useAppState()
  const { account, balance: accountBalance = 0 } = state.account

  const {
    calculatedRewards: userRewards,
    distributionTimestamp: lastDistribution,
  } = useAccountRewards({
    address: account?.address || '',
  })

  // -----------------------------

  // @todo: Refactor this (use singleton)
  const nodeManager = useMemo(() => new NodeManager(account), [account])

  const {
    nodes,
    filteredNodes: baseFilteredNodes,
    ...rest
  } = useCoreChannelNodes(props)

  // -----------------------------

  const [stakeableOnly, setStakeableOnly] = useState<boolean>()

  const handleChangeStakeableOnly = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      const show = e.target.checked
      setStakeableOnly(show)
    },
    [],
  )

  // -----------------------------

  const { stakeNodes } = useFilterUserStakeNodes({ nodes })
  const { stakeNodes: baseFilteredStakeNodes } = useFilterUserStakeNodes({
    nodes: baseFilteredNodes,
  })

  // -----------------------------

  const { nodesIssues, warningFlag } = useFilterNodeIssues({
    nodes: baseFilteredStakeNodes,
    isStaking: true,
  })

  // -----------------------------

  const [tab, handleTabChange] = useState<string>()
  const selectedTab = tab || (stakeNodes?.length ? 'stake' : 'nodes')

  const tabs = useMemo(() => {
    const tabs: TabsProps['tabs'] = [
      {
        id: 'stake',
        name: 'My stakes',
        disabled: !stakeNodes?.length,
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
  }, [stakeNodes, warningFlag])

  // -----------------------------

  const stakeableNodes = useMemo(() => {
    if (!baseFilteredNodes) return
    return baseFilteredNodes.filter(
      (node) =>
        nodeManager.isStakeable(node, accountBalance)[0] &&
        !nodeManager.isUserStake(node),
    )
  }, [accountBalance, baseFilteredNodes, nodeManager])

  const isStakeableOnlyDisabled =
    !stakeableNodes?.length || selectedTab !== 'nodes'
  const isStakeableOnly = isStakeableOnlyDisabled
    ? false
    : stakeableOnly !== undefined
    ? stakeableOnly
    : !!account

  const filteredNodes = useMemo(() => {
    if (!isStakeableOnly) return baseFilteredNodes
    if (!account) return baseFilteredNodes
    return stakeableNodes
  }, [isStakeableOnly, baseFilteredNodes, account, stakeableNodes])

  const { sortedNodes: filteredStakeNodes } = useSortByIssuesNodes({
    nodesIssues,
    nodes: baseFilteredStakeNodes,
  })

  // -----------------------------

  const stakeManager = useMemo(() => new StakeManager(account), [account])

  const {
    userStake,
    handleStake: handleStakeBase,
    handleUnstake: handleUnstakeBase,
  } = useStaking()

  const handleStake = useCallback(
    async (nodeHash: string) => {
      const success = await handleStakeBase(nodeHash)
      if (!success) return

      handleTabChange('stake')
    },
    [handleStakeBase],
  )

  const handleUnstake = useCallback(
    async (nodeHash: string) => {
      const success = await handleUnstakeBase(nodeHash)
      if (!success) return

      if (!stakeNodes || stakeNodes.length <= 1) {
        handleTabChange('nodes')
      }
    },
    [handleUnstakeBase, stakeNodes],
  )

  // -----------------------------

  return {
    account,
    accountBalance,
    nodes,
    filteredNodes,
    filteredStakeNodes,
    selectedTab,
    tabs,
    isStakeableOnly,
    isStakeableOnlyDisabled,
    userStake,
    userRewards,
    lastDistribution,
    nodesIssues,
    ...rest,
    handleTabChange,
    handleStake,
    handleUnstake,
    handleStakeableOnlyChange: handleChangeStakeableOnly,
  }
}
