import { useAppState } from '@/contexts/appState'
import { CCN, NodeManager } from '@/domain/node'
import { StakeManager } from '@/domain/stake'
import { useRequest } from '@/hooks/common/useRequest'
import { TabsProps, useDebounceState } from '@aleph-front/aleph-core'
import { Account } from 'aleph-sdk-ts/dist/accounts/account'
import { ChangeEvent, useCallback, useMemo, useState } from 'react'

export type UseStakingPageProps = {
  nodes?: CCN[]
}

export type UseStakingPageReturn = {
  account?: Account
  accountBalance?: number
  nodes: CCN[]
  stakeNodes: CCN[]
  filteredNodes: CCN[]
  filteredStakeNodes: CCN[]
  selectedTab: string
  tabs: TabsProps['tabs']
  filter: string
  stakeableOnly: boolean
  handleTabChange: (tab: string) => void
  handleFilterChange: (e: ChangeEvent<HTMLInputElement>) => void
  handleStake: (nodeHash: string) => void
  handleUnStake: (nodeHash: string) => void
  handleChangeStakeableOnly: (e: ChangeEvent<HTMLInputElement>) => void
}

export function useStakingPage({
  nodes: prefetchNodes,
}: UseStakingPageProps): UseStakingPageReturn {
  const [{ account, accountBalance = 0 }] = useAppState()

  // @todo: Refactor this (use singleton)
  const nodeManager = useMemo(() => new NodeManager(account), [account])

  const filterNodes = useCallback(
    (nodes: CCN[], query: string, stakeableOnly = false): CCN[] => {
      if (stakeableOnly) {
        nodes = nodes.filter(
          (node) =>
            nodeManager.isStakeable(node, accountBalance, [])[0] &&
            !nodeManager.isUserStake(node),
        )
      }

      if (!query) return nodes

      return nodes.filter((node) =>
        node.name.toLowerCase().includes(query.toLowerCase()),
      )
    },
    [accountBalance, nodeManager],
  )

  // -----------------------------

  const doRequest = useCallback(async () => {
    return await nodeManager.getCCNNodes()
  }, [nodeManager])

  // @note: Quick fix to refresh node list after staking/unstaking (@todo: Move nodes to app state && use ws feed)
  const [lastUpdate, setLastUpdate] = useState(Date.now())
  const debouncedLastUpdate = useDebounceState(lastUpdate, 1000 * 10)

  const { data } = useRequest({
    doRequest,
    triggerOnMount: true,
    triggerDeps: [debouncedLastUpdate],
    onSuccess: () => 'ignore',
  })

  // -----------------------------

  const [filter, setFilter] = useState('')

  const debouncedFilter = useDebounceState(filter, 200)

  const handleFilterChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const filter = e.target.value
    setFilter(filter)
  }, [])

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

  const nodes = useMemo(
    () => (prefetchNodes || data || []).sort((a, b) => b.score - a.score),
    [prefetchNodes, data],
  )

  const stakeNodes = useMemo(
    () => nodes.filter((node) => nodeManager.isUserStake(node)),
    [nodes, nodeManager],
  )

  const filteredNodes = useMemo(
    () => filterNodes(nodes, debouncedFilter, stakeableOnly),
    [filterNodes, debouncedFilter, nodes, stakeableOnly],
  )

  const filteredStakeNodes = useMemo(
    () => filterNodes(stakeNodes, debouncedFilter),
    [filterNodes, debouncedFilter, stakeNodes],
  )

  // -----------------------------

  const [tab, handleTabChange] = useState('stake')
  const selectedTab = stakeNodes.length ? tab : 'nodes'

  const tabs = useMemo(() => {
    const tabs = [
      { id: 'stake', name: 'My Stakes', disabled: !stakeNodes.length },
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
    [stakeManager],
  )

  const handleUnStake = useCallback(
    async (nodeHash: string) => {
      await stakeManager.unStake(nodeHash)
      setLastUpdate(Date.now())
    },
    [stakeManager],
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
    filter,
    stakeableOnly,
    handleTabChange,
    handleFilterChange,
    handleStake,
    handleUnStake,
    handleChangeStakeableOnly,
  }
}
