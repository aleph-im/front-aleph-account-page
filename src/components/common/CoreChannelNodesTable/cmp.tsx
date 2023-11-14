import { memo, useMemo } from 'react'
import tw from 'twin.macro'
import { Button, NotificationBadge, TableColumn } from '@aleph-front/aleph-core'
import { CCN, NodeLastVersions } from '@/domain/node'
import NodesTable from '@/components/common/NodesTable'
import NameCell from '@/components/common/NameCell'
import LinkedCell from '@/components/common/LinkedCell'
import ScoreCell from '@/components/common/ScoreCell'
import APYCell from '@/components/common/APYCell'
import StakedCell from '@/components/common/StakedCell'
import VersionCell from '../VersionCell'

export type CoreChannelNodesTableProps = {
  nodes: CCN[]
  filteredNodes: CCN[]
  lastVersion?: NodeLastVersions
  nodesIssues?: Record<string, string>
}

export const CoreChannelNodesTable = memo(
  ({
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
          hcellProps: () => ({ css: tw`p-0!` }),
          render: (row) =>
            nodesIssues?.[row.hash] ? (
              <NotificationBadge tw="flex! mx-auto!">&nbsp;</NotificationBadge>
            ) : null,
        },
        {
          label: 'SCORE',
          sortable: true,
          sortBy: (row) => row.score,
          render: (row) => <ScoreCell score={row.score} />,
        },
        {
          label: 'LINKED',
          sortable: true,
          sortBy: (row) => row.resource_nodes.length,
          render: (row) => <LinkedCell nodes={row.crnsData} />,
        },
        {
          label: 'NAME',
          sortable: true,
          sortBy: (row) => row.name,
          render: (row) => (
            <NameCell
              hash={row.hash}
              name={row.name}
              picture={row.picture}
            ></NameCell>
          ),
        },
        {
          label: 'STAKED',
          sortable: true,
          width: '100%',
          sortBy: (row) => row.total_staked,
          render: (row) => (
            <StakedCell
              staked={row.total_staked}
              status={row.status}
              locked={row.locked}
            />
          ),
        },
        {
          label: 'EST. APY',
          render: (row) => <APYCell node={row} nodes={nodes} />,
        },
        {
          label: 'VERSION',
          sortable: true,
          sortBy: (row) => row.metricsData?.version,
          render: (row) => (
            <VersionCell node={row} nodes={nodes} lastVersion={lastVersion} />
          ),
        },
        {
          label: '',
          align: 'right',
          render: () => (
            <div tw="inline-flex gap-3 justify-end">
              <Button
                kind="neon"
                size="regular"
                variant="secondary"
                color="main0"
              >
                Info
              </Button>
            </div>
          ),
        },
      ] as TableColumn<CCN>[]
    }, [lastVersion, nodes, nodesIssues])

    return <NodesTable columns={columns} data={filteredNodes} />
  },
)
CoreChannelNodesTable.displayName = 'CoreChannelNodesTable'

export default CoreChannelNodesTable
