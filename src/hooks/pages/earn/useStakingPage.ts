import { useAppState } from '@/contexts/appState'
import { CCN, NodeManager } from '@/domain/node'
import { StakeManager } from '@/domain/stake'
import {
  UseCoreChannelNodesReturn,
  useCoreChannelNodes,
} from '@/hooks/common/useCoreChannelNodes'
import { TabsProps } from '@aleph-front/aleph-core'
import { ChangeEvent, useCallback, useMemo, useState } from 'react'

export type UseStakingPageProps = {
  nodes?: CCN[]
}

export type UseStakingPageReturn = UseCoreChannelNodesReturn & {
  stakeNodes: CCN[]
  filteredStakeNodes: CCN[]
  selectedTab: string
  tabs: TabsProps['tabs']
  stakeableOnly: boolean
  handleTabChange: (tab: string) => void
  handleStake: (nodeHash: string) => void
  handleUnStake: (nodeHash: string) => void
  handleChangeStakeableOnly: (e: ChangeEvent<HTMLInputElement>) => void
}

export function useStakingPage(
  props: UseStakingPageProps,
): UseStakingPageReturn {
  const [{ account, accountBalance = 0 }] = useAppState()

  // @todo: Refactor this (use singleton)
  const nodeManager = useMemo(() => new NodeManager(account), [account])

  const {
    nodes,
    filteredNodes: baseFilteredNodes,
    setLastUpdate,
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

  const filterStakeNodes = useCallback(
    (nodes: CCN[]) => nodes.filter((node) => nodeManager.isUserStake(node)),
    [nodeManager],
  )

  const stakeNodes = useMemo(
    () => filterStakeNodes(nodes),
    [filterStakeNodes, nodes],
  )

  const filteredStakeNodes = useMemo(
    () => filterStakeNodes(baseFilteredNodes),
    [filterStakeNodes, baseFilteredNodes],
  )

  const filteredNodes = useMemo(() => {
    if (!stakeableOnly) return baseFilteredNodes
    if (!account) return baseFilteredNodes

    return baseFilteredNodes.filter(
      (node) =>
        nodeManager.isStakeable(node, accountBalance, [])[0] &&
        !nodeManager.isUserStake(node),
    )
  }, [stakeableOnly, baseFilteredNodes, account, nodeManager, accountBalance])

  // -----------------------------

  const [tab, handleTabChange] = useState('stake')
  const selectedTab = stakeNodes.length ? tab : 'nodes'

  const tabs = useMemo(() => {
    const tabs = [
      { id: 'stake', name: 'My stakes', disabled: !stakeNodes.length },
      { id: 'nodes', name: 'All core nodes' },
    ]

    return tabs
  }, [stakeNodes])

  // -----------------------------

  const stakeManager = useMemo(() => new StakeManager(account), [account])

  const handleStake = useCallback(
    async (nodeHash: string) => {
      await stakeManager.stake(nodeHash)
      setLastUpdate(Date.now())
    },
    [setLastUpdate, stakeManager],
  )

  const handleUnStake = useCallback(
    async (nodeHash: string) => {
      await stakeManager.unStake(nodeHash)
      setLastUpdate(Date.now())
    },
    [setLastUpdate, stakeManager],
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
    ...rest,
    handleTabChange,
    handleStake,
    handleUnStake,
    handleChangeStakeableOnly,
    setLastUpdate,
  }
}