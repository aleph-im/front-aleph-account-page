import { useAppState } from '@/contexts/appState'
import { CRN, NodeLastVersions } from '@/domain/node'
import { useDebounceState, usePaginatedList } from '@aleph-front/core'
import { Account } from 'aleph-sdk-ts/dist/accounts/account'
import { ChangeEvent, useCallback, useMemo, useState } from 'react'
import { UseSortedListReturn, useSortedList } from './useSortedList'

export type UseComputeResourceNodesProps = {
  nodes?: CRN[]
}

export type UseComputeResourceNodesReturn = {
  account?: Account
  accountBalance?: number
  nodes?: CRN[]
  filteredNodes?: CRN[]
  paginatedSortedFilteredNodes?: CRN[]
  filter: string
  lastVersion?: NodeLastVersions
  loadItemsDisabled: boolean
  handleSortItems: UseSortedListReturn<CRN>['handleSortItems']
  handleFilterChange: (e: ChangeEvent<HTMLInputElement>) => void
  handleLoadItems: () => Promise<void>
}

export function useComputeResourceNodes({
  nodes: prefetchNodes,
}: UseComputeResourceNodesProps): UseComputeResourceNodesReturn {
  const [state] = useAppState()
  const { account, balance: accountBalance = 0 } = state.account
  const { data: lastVersion } = state.lastCRNVersion
  const { entities: data } = state.crns

  // -----------------------------

  const [filter, setFilter] = useState('')

  const debouncedFilter = useDebounceState(filter, 200)

  const handleFilterChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const filter = e.target.value
    setFilter(filter)
  }, [])

  // -----------------------------

  const filterNodes = useCallback(
    (query: string, nodes?: CRN[]): CRN[] | undefined => {
      if (!nodes) return
      if (!query) return nodes

      return nodes.filter(
        (node) =>
          node.name?.toLowerCase().includes(query.toLowerCase()) ||
          (node.parentData?.name || '')
            .toLowerCase()
            .includes(query.toLowerCase()),
      )
    },
    [],
  )

  const nodes = useMemo(() => {
    const nodes = prefetchNodes || data
    if (!nodes) return

    return nodes.sort((a, b) => b.score - a.score)
  }, [prefetchNodes, data])

  const filteredNodes = useMemo(
    () => filterNodes(debouncedFilter, nodes),
    [filterNodes, debouncedFilter, nodes],
  )

  // -----------------------------

  const { list: sortedFilteredNodes, handleSortItems } = useSortedList({
    list: filteredNodes,
  })

  const {
    list: paginatedSortedFilteredNodes,
    loadItemsDisabled,
    handleLoadItems,
  } = usePaginatedList({
    list: sortedFilteredNodes,
  })

  // -----------------------------

  return {
    account,
    accountBalance,
    nodes,
    filteredNodes,
    paginatedSortedFilteredNodes,
    filter,
    lastVersion,
    loadItemsDisabled,
    handleSortItems,
    handleFilterChange,
    handleLoadItems,
  }
}
