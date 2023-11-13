import { useAppState } from '@/contexts/appState'
import { CCN, NodeManager } from '@/domain/node'
import { StakeManager } from '@/domain/stake'
import {
  UseCoreChannelNodesReturn,
  useCoreChannelNodes,
} from '@/hooks/common/useCoreChannelNodes'
import { useNodeIssues } from '@/hooks/common/useNodeIssues'
import { useAccountRewards } from '@/hooks/common/useRewards'
import { useUserStakeNodes } from '@/hooks/common/useUserStakeNodes'
import { NotificationBadge, TabsProps } from '@aleph-front/aleph-core'
import { ChangeEvent, useCallback, useMemo, useState } from 'react'

export type UseStakingPageProps = {
  nodes?: CCN[]
}

export type UseStakingPageReturn = UseCoreChannelNodesReturn & {
  stakeNodes?: CCN[]
  filteredStakeNodes?: CCN[]
  selectedTab: string
  tabs: TabsProps['tabs']
  stakeableOnly: boolean
  userStake: number
  userRewards?: number
  lastDistribution?: number
  nodesIssues: Record<string, string>
  handleTabChange: (tab: string) => void
  handleStake: (nodeHash: string) => void
  handleUnStake: (nodeHash: string) => void
  handleChangeStakeableOnly: (e: ChangeEvent<HTMLInputElement>) => void
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

  const [stakeableOnly, setstakeableOnly] = useState(true)

  const handleChangeStakeableOnly = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      const show = e.target.checked
      setstakeableOnly(show)
    },
    [],
  )

  // -----------------------------

  const { stakeNodes } = useUserStakeNodes({ nodes })
  const { stakeNodes: filteredStakeNodes } = useUserStakeNodes({
    nodes: baseFilteredNodes,
  })

  const filteredNodes = useMemo(() => {
    if (!baseFilteredNodes) return
    if (!stakeableOnly) return baseFilteredNodes
    if (!account) return baseFilteredNodes

    return baseFilteredNodes.filter(
      (node) =>
        nodeManager.isStakeable(node, accountBalance, [])[0] &&
        !nodeManager.isUserStake(node),
    )
  }, [stakeableOnly, baseFilteredNodes, account, nodeManager, accountBalance])

  // -----------------------------

  const { nodesIssues, warningFlag } = useNodeIssues({
    nodes: stakeNodes,
    isStaking: true,
  })

  // -----------------------------

  const [tab, handleTabChange] = useState('stake')
  const selectedTab = stakeNodes?.length ? tab : 'nodes'

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

  const stakeManager = useMemo(() => new StakeManager(account), [account])

  const handleStake = useCallback(
    async (nodeHash: string) => {
      await stakeManager.stake(nodeHash)
    },
    [stakeManager],
  )

  const handleUnStake = useCallback(
    async (nodeHash: string) => {
      await stakeManager.unStake(nodeHash)
    },
    [stakeManager],
  )

  const userStake = useMemo(
    () => stakeManager.totalStakedByUser(nodes || []),
    [nodes, stakeManager],
  )

  // -----------------------------

  return {
    account,
    accountBalance,
    nodes,
    stakeNodes,
    filteredNodes,
    filteredStakeNodes,
    selectedTab,
    tabs,
    stakeableOnly,
    userStake,
    userRewards,
    lastDistribution,
    nodesIssues,
    ...rest,
    handleTabChange,
    handleStake,
    handleUnStake,
    handleChangeStakeableOnly,
  }
}
