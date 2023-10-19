import { useAppState } from '@/contexts/appState'
import { CCN, NodeLastVersions, NodeManager } from '@/domain/node'
import { useRequest } from '@/hooks/common/useRequest'
import { useDebounceState } from '@aleph-front/aleph-core'
import { Account } from 'aleph-sdk-ts/dist/accounts/account'
import { ChangeEvent, useCallback, useMemo, useState } from 'react'

export type UseCoreChannelNodesProps = {
  nodes?: CCN[]
}

export type UseCoreChannelNodesReturn = {
  account?: Account
  accountBalance?: number
  nodes: CCN[]
  filteredNodes: CCN[]
  filter: string
  lastVersion?: NodeLastVersions
  handleFilterChange: (e: ChangeEvent<HTMLInputElement>) => void
  setLastUpdate: (now: number) => void
}

export function useCoreChannelNodes({
  nodes: prefetchNodes,
}: UseCoreChannelNodesProps): UseCoreChannelNodesReturn {
  const [{ account, accountBalance = 0 }] = useAppState()

  // @todo: Refactor this (use singleton)
  const nodeManager = useMemo(() => new NodeManager(account), [account])

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
    onSuccess: () => null,
  })

  // -----------------------------

  const doVersionRequest = useCallback(
    () => nodeManager.getLatestCCNVersion(),
    [nodeManager],
  )

  const { data: lastVersion } = useRequest({
    doRequest: doVersionRequest,
    triggerOnMount: true,
    onSuccess: () => null,
    onError: () => null,
  })

  // -----------------------------

  const [filter, setFilter] = useState('')

  const debouncedFilter = useDebounceState(filter, 200)

  const handleFilterChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const filter = e.target.value
    setFilter(filter)
  }, [])

  // -----------------------------

  const filterNodes = useCallback((nodes: CCN[], query: string): CCN[] => {
    if (!query) return nodes
    return nodes.filter((node) =>
      node.name.toLowerCase().includes(query.toLowerCase()),
    )
  }, [])

  const nodes = useMemo(
    () => (prefetchNodes || data || []).sort((a, b) => b.score - a.score),
    [prefetchNodes, data],
  )

  const filteredNodes = useMemo(
    () => filterNodes(nodes, debouncedFilter),
    [filterNodes, debouncedFilter, nodes],
  )

  // -----------------------------

  return {
    account,
    accountBalance,
    nodes,
    filteredNodes,
    filter,
    lastVersion,
    handleFilterChange,
    setLastUpdate,
  }
}
