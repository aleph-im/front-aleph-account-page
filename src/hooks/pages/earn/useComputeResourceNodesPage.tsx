import { ChangeEvent, useCallback, useMemo, useState } from 'react'
import { NotificationBadge, TabsProps } from '@aleph-front/core'
import { CCN, CRN, NodeManager } from '@/domain/node'
import {
  UseComputeResourceNodesReturn,
  useComputeResourceNodes,
} from '@/hooks/common/useComputeResourceNodes'
import { useFilterNodeIssues } from '@/hooks/common/useFilterNodeIssues'
import { useFilterUserNodes } from '@/hooks/common/useFilterUserNodes'
import { useSortByIssuesNodes } from '@/hooks/common/useSortByIssuesNodes'
import { useUserCoreChannelNode } from '@/hooks/common/useUserCoreChannelNode'
import { useLinking } from '@/hooks/common/useLinking'
import { useRouter } from 'next/router'
import { useRequestCRNSpecs } from '@/hooks/common/useRequestEntity/useRequestCRNSpecs'

export type UseComputeResourceNodesPageProps = {
  nodes?: CRN[]
}

export type UseComputeResourceNodesPageReturn =
  UseComputeResourceNodesReturn & {
    userNodes?: CRN[]
    filteredUserNodes?: CRN[]
    userNodesIssues: Record<string, string>
    userNode?: CCN
    selectedTab: string
    tabs: TabsProps['tabs']
    isLinkableOnly: boolean
    isLinkableOnlyDisabled: boolean
    totalResources?: {
      cpu: number
      ram: number
      hdd: number
      nodes: number
      total: number
    }
    handleLink: (nodeHash: string) => void
    handleUnlink: (nodeHash: string) => void
    handleTabChange: (tab: string) => void
    handleLinkableOnlyChange: (e: ChangeEvent<HTMLInputElement>) => void
  }

export function useComputeResourceNodesPage(
  props: UseComputeResourceNodesPageProps,
): UseComputeResourceNodesPageReturn {
  // ----------------------------- CRN NODES

  const {
    nodes,
    filteredNodes: baseFilteredNodes,
    ...rest
  } = useComputeResourceNodes(props)
  const { account } = rest

  // -----------------------------

  // @todo: Refactor this (use singleton)
  const nodeManager = useMemo(() => new NodeManager(account), [account])

  // ----------------------------- USER MAIN CC NODE

  const { userNode } = useUserCoreChannelNode({})

  // ----------------------------- READY TO LINK FILTER

  const [linkableOnly, setLinkableOnly] = useState<boolean>()

  const handleLinkableOnlyChange = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      const show = e.target.checked
      setLinkableOnly(show)
    },
    [],
  )

  // ----------------------------- USER NODES

  const { userNodes } = useFilterUserNodes({ nodes })
  const { userNodes: baseFilteredUserNodes } = useFilterUserNodes({
    nodes: baseFilteredNodes,
  })

  // ----------------------------- NODE ISSUES

  const { nodesIssues: userNodesIssues, warningFlag: userNodesWarningFlag } =
    useFilterNodeIssues({
      nodes: baseFilteredUserNodes,
    })

  const { sortedNodes: filteredUserNodes } = useSortByIssuesNodes({
    nodesIssues: userNodesIssues,
    nodes: baseFilteredUserNodes,
  })

  // ----------------------------- TABS

  const [tab, handleTabChange] = useState<string>()
  const selectedTab = tab || (!!userNodes?.length ? 'user' : 'nodes')

  const tabs = useMemo(() => {
    const tabs: TabsProps['tabs'] = [
      { id: 'nodes', name: 'All compute nodes' },
      {
        id: 'user',
        name: 'My compute nodes',
        label: userNodesWarningFlag
          ? {
              label: (
                <NotificationBadge>{userNodesWarningFlag}</NotificationBadge>
              ),
              position: 'top',
            }
          : undefined,
      },
    ]

    return tabs
  }, [userNodesWarningFlag])

  // ----------------------------- FILTERED NODES

  const linkableNodes = useMemo(() => {
    if (!baseFilteredNodes) return
    return baseFilteredNodes.filter(
      (node) =>
        nodeManager.isLinkable(node, userNode)[0] &&
        !nodeManager.isUserLinked(node, userNode),
    )
  }, [baseFilteredNodes, nodeManager, userNode])

  const isLinkableOnlyDisabled =
    !linkableNodes?.length || selectedTab !== 'nodes'
  const isLinkableOnly = isLinkableOnlyDisabled
    ? false
    : linkableOnly !== undefined
      ? linkableOnly
      : !!account

  const filteredNodes = useMemo(() => {
    if (!isLinkableOnly) return baseFilteredNodes
    if (!account) return baseFilteredNodes
    return linkableNodes
  }, [account, baseFilteredNodes, linkableNodes, isLinkableOnly])

  // ----------------------------- LINK CRN

  const router = useRouter()

  const { handleLink: handleLinkBase, handleUnlink: handleUnlinkBase } =
    useLinking()

  const handleLink = useCallback(
    async (nodeHash: string) => {
      const success = await handleLinkBase(nodeHash)
      if (!success) return
      if (!userNode?.hash) return

      router.replace(`/earn/ccn/${userNode.hash}`)
    },
    [handleLinkBase, router, userNode],
  )

  const handleUnlink = useCallback(
    async (nodeHash: string) => {
      const success = await handleUnlinkBase(nodeHash)
      if (!success) return
      if (!userNode?.hash) return

      router.replace(`/earn/ccn/${userNode.hash}`)
    },
    [handleUnlinkBase, router, userNode],
  )

  // ----------------------------- NETWORK RESOURCES CHART

  const { specs } = useRequestCRNSpecs({ nodes })

  const totalResources = useMemo(() => {
    const resources = Object.values(specs)
    return resources.reduce(
      (ac, cv) => {
        ac.cpu += cv.data?.cpu.count || 0
        ac.ram += (cv.data?.mem.total_kB || 0) / 1024
        ac.hdd += (cv.data?.disk.total_kB || 0) / 1024
        ac.nodes += cv.data ? 1 : 0
        ac.total += 1

        return ac
      },
      { cpu: 0, ram: 0, hdd: 0, nodes: 0, total: 0 },
    )
  }, [specs])

  // -----------------------------

  return {
    nodes,
    filteredNodes,
    userNodes,
    filteredUserNodes,
    userNodesIssues,
    userNode,
    selectedTab,
    tabs,
    isLinkableOnly,
    isLinkableOnlyDisabled,
    totalResources,
    handleLink,
    handleUnlink,
    handleTabChange,
    handleLinkableOnlyChange,
    ...rest,
  }
}
