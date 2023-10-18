import { memo, useMemo } from 'react'
import { Button, TableColumn } from '@aleph-front/aleph-core'
import { CCN } from '@/domain/node'
import NodesTable from '@/components/common/NodesTable'
import NameCell from '@/components/common/NameCell'
import LinkedCell from '@/components/common/LinkedCell'
import ScoreCell from '@/components/common/ScoreCell'
import APYCell from '@/components/common/APYCell'
import StakedCell from '@/components/common/StakedCell'
import VersionCell from '../VersionCell/cmp'

export type CoreChannelNodesTableProps = {
  nodes: CCN[]
  filteredNodes: CCN[]
}

export const CoreChannelNodesTable = memo(
  ({ nodes, filteredNodes }: CoreChannelNodesTableProps) => {
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
              locked={row.locked}
            ></NameCell>
          ),
        },
        {
          label: 'STAKED',
          sortable: true,
          sortBy: (row) => row.total_staked,
          render: (row) => (
            <StakedCell staked={row.total_staked} status={row.status} />
          ),
        },
        {
          label: 'EST. APY',
          render: (row) => <APYCell node={row} nodes={nodes} />,
        },
        {
          label: 'VERSION',
          sortable: true,
          width: '20%',
          sortBy: (row) => row.metricsData?.version,
          render: (row) => <VersionCell node={row} nodes={nodes} />,
        },
        {
          label: '',
          align: 'right',
          render: () => (
            <div tw="flex gap-3 justify-end">
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

      return cols.map((col, i) => {
        col.width = i === cols.length - 1 ? '100%' : `${80 / cols.length - 2}%`
        return col
      })
    }, [nodes])

    return <NodesTable columns={columns} data={filteredNodes} />
  },
)
CoreChannelNodesTable.displayName = 'CoreChannelNodesTable'

export default CoreChannelNodesTable
