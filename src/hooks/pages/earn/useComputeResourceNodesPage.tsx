import { ChangeEvent, useCallback, useMemo, useState } from 'react'
import {
  NotificationBadge,
  TabsProps,
  useNotification,
} from '@aleph-front/aleph-core'
import { CCN, CRN, NodeManager } from '@/domain/node'
import {
  UseComputeResourceNodesReturn,
  useComputeResourceNodes,
} from '@/hooks/common/useComputeResourceNodes'
import { useFilterNodeIssues } from '@/hooks/common/useFilterNodeIssues'
import { useLastRewards } from '@/hooks/common/useRewards'
import { useFilterUserNodes } from '@/hooks/common/useFilterUserNodes'
import { useSortByIssuesNodes } from '@/hooks/common/useSortByIssuesNodes'
import { useUserCoreChannelNode } from '@/hooks/common/useUserCoreChannelNode'

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
    userRewards?: number
    lastDistribution?: number
    handleLink: (nodeHash: string) => void
    handleUnlink: (nodeHash: string) => void
    handleTabChange: (tab: string) => void
    handleLinkableOnlyChange: (e: ChangeEvent<HTMLInputElement>) => void
  }

export function useComputeResourceNodesPage(
  props: UseComputeResourceNodesPageProps,
): UseComputeResourceNodesPageReturn {
  // ----------------------------- CR NODES

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
      {
        id: 'user',
        name: 'My compute nodes',
        disabled: !userNodes?.length,
        label: userNodesWarningFlag
          ? {
              label: (
                <NotificationBadge>{userNodesWarningFlag}</NotificationBadge>
              ),
              position: 'top',
            }
          : undefined,
      },
      { id: 'nodes', name: 'All compute nodes' },
    ]

    return tabs
  }, [userNodes, userNodesWarningFlag])

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

  // ----------------------------- REWARDS

  const { lastRewardsCalculation, lastRewardsDistribution } = useLastRewards()

  const userRewards = useMemo(
    () =>
      lastRewardsCalculation
        ? userNodes?.reduce((ac, cv) => {
            return ac + (lastRewardsCalculation.rewards[cv.reward] || 0)
          }, 0)
        : undefined,
    [lastRewardsCalculation, userNodes],
  )

  const lastDistribution = lastRewardsDistribution?.timestamp

  // ----------------------------- LINK CRN

  const noti = useNotification()

  const handleLink = useCallback(
    async (nodeHash: string) => {
      if (!noti) throw new Error('Notification not ready')

      try {
        await nodeManager.linkComputeResourceNode(nodeHash)

        noti.add({
          variant: 'success',
          title: 'Success',
          text: `Linked resource node "${nodeHash}" successfully.`,
        })
      } catch (e) {
        noti?.add({
          variant: 'error',
          title: 'Error',
          text: (e as Error).message,
        })
      }
    },
    [nodeManager, noti],
  )

  const handleUnlink = useCallback(
    async (nodeHash: string) => {
      if (!noti) throw new Error('Notification not ready')

      try {
        await nodeManager.unlinkComputeResourceNode(nodeHash)

        noti.add({
          variant: 'success',
          title: 'Success',
          text: `Unlinked resource node "${nodeHash}" successfully.`,
        })
      } catch (e) {
        noti?.add({
          variant: 'error',
          title: 'Error',
          text: (e as Error).message,
        })
      }
    },
    [nodeManager, noti],
  )

  // -----------------------------

  // console.log(filteredNodes)

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
    userRewards,
    lastDistribution,
    handleLink,
    handleUnlink,
    handleTabChange,
    handleLinkableOnlyChange,
    ...rest,
  }
}
