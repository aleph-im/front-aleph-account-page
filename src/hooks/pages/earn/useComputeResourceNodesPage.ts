import { useCallback, useMemo, useState } from 'react'
import { TabsProps } from '@aleph-front/aleph-core'
import { useAppState } from '@/contexts/appState'
import { CRN, NodeManager } from '@/domain/node'
import {
  UseComputeResourceNodesReturn,
  useComputeResourceNodes,
} from '@/hooks/common/useComputeResourceNodes'

export type UseComputeResourceNodesPageProps = {
  nodes?: CRN[]
}

export type UseComputeResourceNodesPageReturn =
  UseComputeResourceNodesReturn & {
    userNodes?: CRN[]
    filteredUserNodes?: CRN[]
    selectedTab: string
    tabs: TabsProps['tabs']
    handleTabChange: (tab: string) => void
  }

export function useComputeResourceNodesPage(
  props: UseComputeResourceNodesPageProps,
): UseComputeResourceNodesPageReturn {
  const [{ account, accountBalance = 0 }] = useAppState()

  // @todo: Refactor this (use singleton)
  const nodeManager = useMemo(() => new NodeManager(account), [account])

  const { nodes, filteredNodes, ...rest } = useComputeResourceNodes(props)

  // -----------------------------

  const filterUserNodes = useCallback(
    (nodes?: CRN[]) => {
      if (!nodes) return
      return nodes.filter((node) => nodeManager.isUserNode(node))
    },
    [nodeManager],
  )

  const userNodes = useMemo(
    () => filterUserNodes(nodes),
    [filterUserNodes, nodes],
  )

  const filteredUserNodes = useMemo(
    () => filterUserNodes(filteredNodes),
    [filterUserNodes, filteredNodes],
  )

  // -----------------------------

  const [tab, handleTabChange] = useState('user')
  const selectedTab = userNodes?.length ? tab : 'nodes'

  const tabs = useMemo(() => {
    const tabs = [
      { id: 'user', name: 'My compute nodes', disabled: !userNodes?.length },
      { id: 'nodes', name: 'All compute nodes' },
    ]

    return tabs
  }, [userNodes])

  // -----------------------------

  return {
    account,
    accountBalance,
    nodes,
    filteredNodes,
    userNodes,
    filteredUserNodes,
    selectedTab,
    tabs,
    ...rest,
    handleTabChange,
  }
}
