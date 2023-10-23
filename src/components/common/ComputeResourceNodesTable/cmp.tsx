import { memo, useMemo } from 'react'
import { TableColumn } from '@aleph-front/aleph-core'
import { CRN, NodeLastVersions } from '@/domain/node'
import NodesTable from '@/components/common/NodesTable'
import NameCell from '@/components/common/NameCell'
import ScoreCell from '@/components/common/ScoreCell'
import VersionCell from '../VersionCell/cmp'
import DecentralizedCell from '../DecentralizedCell'
import CRNRewardsCell from '../CRNRewardsCell'

export type ComputeResourceNodesTableProps = {
  nodes: CRN[]
  filteredNodes: CRN[]
  lastVersion?: NodeLastVersions
}

export const ComputeResourceNodesTable = memo(
  ({ nodes, filteredNodes, lastVersion }: ComputeResourceNodesTableProps) => {
    const columns = useMemo(() => {
      return [
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
    }, [lastVersion, nodes])

    return <NodesTable columns={columns} data={filteredNodes} />
  },
)
ComputeResourceNodesTable.displayName = 'ComputeResourceNodesTable'

export default ComputeResourceNodesTable
