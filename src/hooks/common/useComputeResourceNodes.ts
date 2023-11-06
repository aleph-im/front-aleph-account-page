import { useAppState } from '@/contexts/appState'
import { CRN, NodeLastVersions, NodeManager } from '@/domain/node'
import { useRequest } from '@/hooks/common/useRequest'
import { useDebounceState } from '@aleph-front/aleph-core'
import { Account } from 'aleph-sdk-ts/dist/accounts/account'
import { ChangeEvent, useCallback, useMemo, useState } from 'react'

export type UseComputeResourceNodesProps = {
  nodes?: CRN[]
}

export type UseComputeResourceNodesReturn = {
  account?: Account
  accountBalance?: number
  nodes?: CRN[]
  filteredNodes?: CRN[]
  filter: string
  lastVersion?: NodeLastVersions
  handleFilterChange: (e: ChangeEvent<HTMLInputElement>) => void
  setLastUpdate: (now: number) => void
}

export function useComputeResourceNodes({
  nodes: prefetchNodes,
}: UseComputeResourceNodesProps): UseComputeResourceNodesReturn {
  const [{ account, accountBalance = 0 }] = useAppState()

  // @todo: Refactor this (use singleton)
  const nodeManager = useMemo(() => new NodeManager(account), [account])

  // -----------------------------

  const doRequest = useCallback(() => nodeManager.getCRNNodes(), [nodeManager])

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
    () => nodeManager.getLatestCRNVersion(),
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

  const filterNodes = useCallback(
    (query: string, nodes?: CRN[]): CRN[] | undefined => {
      if (!nodes) return
      if (!query) return nodes

      return nodes.filter(
        (node) =>
          node.name.toLowerCase().includes(query.toLowerCase()) ||
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
