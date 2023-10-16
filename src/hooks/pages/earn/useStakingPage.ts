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
  handleTabChange: (tab: string) => void
  handleFilterChange: (e: ChangeEvent<HTMLInputElement>) => void
  handleStake: (nodeHash: string) => void
  handleUnStake: (nodeHash: string) => void
}

function filterNodes(nodes: CCN[], filter: string): CCN[] {
  return nodes.filter((node) =>
    node.name.toLowerCase().includes(filter.toLowerCase()),
  )
}

export function useStakingPage({
  nodes: prefetchNodes,
}: UseStakingPageProps): UseStakingPageReturn {
  const [{ account, accountBalance }] = useAppState()

  const [filter, setFilter] = useState('')
  const debouncedFilter = useDebounceState(filter, 200)
  const handleFilterChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const filter = e.target.value
    setFilter(filter)
  }, [])

  async function doRequest(): Promise<CCN[]> {
    const manager = new NodeManager({} as any)
    return await manager.getCCNNodes()
  }

  // @note: Quick fix to refresh node list after staking/unstaking (@todo: Move nodes to app state && use ws feed)
  const [lastUpdate, setLastUpdate] = useState(Date.now())
  const debouncedLastUpdate = useDebounceState(lastUpdate, 1000 * 10)

  const { data } = useRequest({
    doRequest,
    triggerOnMount: true,
    triggerDeps: [debouncedLastUpdate],
    onSuccess: () => 'ignore',
  })

  const nodes = useMemo(
    () => (prefetchNodes || data || []).sort((a, b) => b.score - a.score),
    [prefetchNodes, data],
  )

  const filteredNodes = useMemo(() => {
    if (!debouncedFilter) return nodes
    return filterNodes(nodes, debouncedFilter)
  }, [nodes, debouncedFilter])

  const stakeNodes = useMemo(() => {
    if (!account) return []
    return nodes.filter((node) => node.stakers[account.address] !== undefined)
  }, [account, nodes])

  const filteredStakeNodes = useMemo(() => {
    if (!debouncedFilter) return stakeNodes
    return filterNodes(stakeNodes, debouncedFilter)
  }, [stakeNodes, debouncedFilter])

  const [tab, handleTabChange] = useState('stake')
  const selectedTab = stakeNodes.length ? tab : 'nodes'

  const tabs = useMemo(() => {
    const tabs = [
      { id: 'stake', name: 'My Stakes' },
      { id: 'nodes', name: 'All core nodes' },
    ]

    if (!stakeNodes.length) {
      tabs.shift()
    }

    return tabs
  }, [stakeNodes])

  const stakeManager = useMemo(
    () => new StakeManager(account as any),
    [account],
  )

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
    handleTabChange,
    handleFilterChange,
    handleStake,
    handleUnStake,
  }
}
