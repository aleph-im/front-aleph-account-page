import { useAppState } from '@/contexts/appState'
import { CCN, NodeLastVersions } from '@/domain/node'
import { useDebounceState } from '@aleph-front/core'
import { Account } from 'aleph-sdk-ts/dist/accounts/account'
import { ChangeEvent, useCallback, useMemo, useState } from 'react'
import { UseSortedListReturn, useSortedList } from './useSortedList'

export type UseCoreChannelNodesProps = {
  nodes?: CCN[]
}

export type UseCoreChannelNodesReturn = {
  account?: Account
  accountBalance?: number
  nodes?: CCN[]
  filteredNodes?: CCN[]
  filter: string
  lastVersion?: NodeLastVersions
  handleSortItems: UseSortedListReturn<CCN>['handleSortItems']
  handleFilterChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export function useCoreChannelNodes({
  nodes: prefetchNodes,
}: UseCoreChannelNodesProps): UseCoreChannelNodesReturn {
  const [state] = useAppState()
  const { account, balance: accountBalance = 0 } = state.account
  const { data: lastVersion } = state.lastCCNVersion
  const { entities: data } = state.ccns

  const nodes = prefetchNodes || data

  // -----------------------------

  const [filter, setFilter] = useState('')

  const debouncedFilter = useDebounceState(filter, 200)

  const handleFilterChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const filter = e.target.value
    setFilter(filter)
  }, [])

  // -----------------------------

  const filterNodes = useCallback(
    (query: string, nodes?: CCN[]): CCN[] | undefined => {
      if (!nodes) return
      if (!query) return nodes

      return nodes.filter((node) =>
        node.name?.toLowerCase().includes(query.toLowerCase()),
      )
    },
    [],
  )

  const filteredNodes = useMemo(
    () => filterNodes(debouncedFilter, nodes),
    [filterNodes, debouncedFilter, nodes],
  )

  const presortedFilteredNodes = useMemo(() => {
    if (!filteredNodes) return
    return filteredNodes.sort((a, b) => b.score - a.score)
  }, [filteredNodes])

  // -----------------------------

  const { list: sortedFilteredNodes, handleSortItems } = useSortedList({
    list: presortedFilteredNodes,
  })

  // -----------------------------

  return {
    account,
    accountBalance,
    nodes,
    filteredNodes: sortedFilteredNodes,
    filter,
    lastVersion,
    handleSortItems,
    handleFilterChange,
  }
}
