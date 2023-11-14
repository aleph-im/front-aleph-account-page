import { memo, useMemo } from 'react'
import tw from 'twin.macro'
import { NotificationBadge, TableColumn } from '@aleph-front/aleph-core'
import { CRN, NodeLastVersions } from '@/domain/node'
import NodesTable from '@/components/common/NodesTable'
import NameCell from '@/components/common/NameCell'
import ScoreCell from '@/components/common/ScoreCell'
import VersionCell from '../VersionCell'
import DecentralizedCell from '../DecentralizedCell'
import CRNRewardsCell from '../CRNRewardsCell'

export type ComputeResourceNodesTableProps = {
  nodes: CRN[]
  filteredNodes: CRN[]
  lastVersion?: NodeLastVersions
  nodesIssues?: Record<string, string>
}

export const ComputeResourceNodesTable = memo(
  ({
    nodes,
    filteredNodes,
    lastVersion,
    nodesIssues,
  }: ComputeResourceNodesTableProps) => {
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
          sortBy: (row) => row.parentData?.name,
          render: (row) => (
            <>
              {row.parentData ? (
                <NameCell
                  hash={row.parentData.hash}
                  name={row.parentData.name}
                  picture={row.parentData.picture}
                ></NameCell>
              ) : (
                '-'
              )}
            </>
          ),
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
          label: 'DECENTRALIZED',
          sortable: true,
          sortBy: (row) => row.decentralization,
          render: (row) => (
            <DecentralizedCell decentralization={row.decentralization} />
          ),
        },
        {
          label: 'EST. REWARDS',
          align: 'right',
          render: (row) => <CRNRewardsCell node={row} />,
        },
        {
          label: 'VERSION',
          sortable: true,
          align: 'right',
          width: '100%',
          sortBy: (row) => row.metricsData?.version,
          render: (row) => (
            <VersionCell node={row} nodes={nodes} lastVersion={lastVersion} />
          ),
        },
      ] as TableColumn<CRN>[]
    }, [lastVersion, nodes, nodesIssues])

    return <NodesTable columns={columns} data={filteredNodes} />
  },
)
ComputeResourceNodesTable.displayName = 'ComputeResourceNodesTable'

export default ComputeResourceNodesTable
