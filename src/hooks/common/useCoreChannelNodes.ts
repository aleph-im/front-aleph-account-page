import { useAppState } from '@/contexts/appState'
import { CCN, NodeLastVersions } from '@/domain/node'
import { useDebounceState } from '@aleph-front/core'
import { Account } from 'aleph-sdk-ts/dist/accounts/account'
import { ChangeEvent, useCallback, useMemo, useState } from 'react'

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
  handleFilterChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export function useCoreChannelNodes({
  nodes: prefetchNodes,
}: UseCoreChannelNodesProps): UseCoreChannelNodesReturn {
  const [state] = useAppState()
  const { account, balance: accountBalance = 0 } = state.account
  const { data: lastVersion } = state.lastCCNVersion
  const { entities: data } = state.ccns

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

  return {
    account,
    accountBalance,
    nodes,
    filteredNodes,
    filter,
    lastVersion,
    handleFilterChange,
  }
}
