import { memo, useMemo } from 'react'
import tw from 'twin.macro'
import { NotificationBadge, TableColumn } from '@aleph-front/aleph-core'
import { CCN, NodeLastVersions } from '@/domain/node'
import NodesTable from '@/components/common/NodesTable'
import NodeLinkedNodes from '@/components/common/NodeLinkedNodes'
import APYCell from '@/components/common/NodeAPY'
import NodeStaked from '@/components/common/NodeStaked'
import ButtonLink from '../ButtonLink'

export type CoreChannelNodesTableProps = {
  nodes: CCN[]
  filteredNodes: CCN[]
  lastVersion?: NodeLastVersions
  nodesIssues?: Record<string, string>
}

export const CoreChannelNodesTable = ({
  nodes,
  filteredNodes,
  lastVersion,
  nodesIssues,
}: CoreChannelNodesTableProps) => {
  const columns = useMemo(() => {
    return [
      {
        label: '',
        align: 'center',
        width: 0,
        cellProps: () => ({ css: tw`p-0!` }),
        hcellProps: () => ({ css: tw`p-0! border-0!` }),
        render: (node) =>
          nodesIssues?.[node.hash] ? (
            <NotificationBadge tw="flex! mx-auto!">&nbsp;</NotificationBadge>
          ) : null,
      },
      {
        label: 'SCORE',
        sortable: true,
        sortBy: (node) => node.score,
        render: (node) => <NodeScore score={node.score} />,
      },
      {
        label: 'LINKED',
        sortable: true,
        sortBy: (node) => node.resource_nodes.length,
        render: (node) => <NodeLinkedNodes nodes={node.crnsData} />,
      },
      {
        label: 'NAME',
        sortable: true,
        sortBy: (node) => node.name,
        render: (node) => (
          <NodeName hash={node.hash} name={node.name} picture={node.picture} />
        ),
      },
      {
        label: 'STAKED',
        sortable: true,
        width: '100%',
        sortBy: (node) => node.total_staked,
        render: (node) => (
          <NodeStaked
            staked={node.total_staked}
            status={node.status}
            locked={node.locked}
          />
        ),
      },
      {
        label: 'EST. APY',
        render: (node) => <APYCell node={node} nodes={nodes} />,
      },
      {
        label: 'VERSION',
        sortable: true,
        sortBy: (node) => node.metricsData?.version,
        render: (node) => (
          <NodeVersion node={node} nodes={nodes} lastVersion={lastVersion} />
        ),
      },
      {
        label: '',
        align: 'right',
        render: (node) => (
          <div tw="inline-flex gap-3 justify-end">
            <ButtonLink
              kind="neon"
              size="regular"
              variant="secondary"
              color="main0"
              href={`/earn/ccn/${node.hash}`}
            >
              Info
            </ButtonLink>
          </div>
        ),
      },
    ] as TableColumn<CCN>[]
  }, [lastVersion, nodes, nodesIssues])

  return <NodesTable columns={columns} data={filteredNodes} />
}
CoreChannelNodesTable.displayName = 'CoreChannelNodesTable'

export default memo(CoreChannelNodesTable)
