import { memo, useMemo } from 'react'
import { TableColumn } from '@aleph-front/aleph-core'
import { CRN } from '@/domain/node'
import NodesTable from '@/components/common/NodesTable'
import NameCell from '@/components/common/NameCell'
import ScoreCell from '@/components/common/ScoreCell'
import VersionCell from '../VersionCell/cmp'
import DecentralizedCell from '../DecentralizedCell'
import CRNRewardsCell from '../CRNRewardsCell'

export type ComputeResourceNodesTableProps = {
  nodes: CRN[]
  filteredNodes: CRN[]
}

export const ComputeResourceNodesTable = memo(
  ({ nodes, filteredNodes }: ComputeResourceNodesTableProps) => {
    const columns = useMemo(() => {
      const cols = [
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
            <NameCell
              hash={row.parentData?.hash || '-'}
              name={row.parentData?.name || '-'}
              picture={row.parentData?.picture}
              locked={row.parentData?.locked}
            ></NameCell>
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
              locked={row.locked}
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
          render: (row) => <CRNRewardsCell node={row} />,
        },
        {
          label: 'VERSION',
          sortable: true,
          sortBy: (row) => row.metricsData?.version,
          render: (row) => <VersionCell node={row} nodes={nodes} />,
        },
      ] as TableColumn<CRN>[]

      return cols.map((col, i) => {
        col.width = i === cols.length - 1 ? '100%' : `${80 / cols.length - 1}%`
        return col
      })
    }, [nodes])

    return <NodesTable columns={columns} data={filteredNodes} />
  },
)
ComputeResourceNodesTable.displayName = 'ComputeResourceNodesTable'

export default ComputeResourceNodesTable
