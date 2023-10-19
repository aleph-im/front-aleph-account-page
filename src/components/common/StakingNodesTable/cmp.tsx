import { memo, useMemo } from 'react'
import { Button, TableColumn } from '@aleph-front/aleph-core'
import { CCN } from '@/domain/node'
import NodesTable from '@/components/common/NodesTable'
import NameCell from '@/components/common/NameCell'
import LinkedCell from '@/components/common/LinkedCell'
import ScoreCell from '@/components/common/ScoreCell'
import APYCell from '@/components/common/APYCell'
import StakedCell from '@/components/common/StakedCell'
import StakeButton from '@/components/common/StakeButton/cmp'
import { Account } from 'aleph-sdk-ts/dist/accounts/account'
import AmountCell from '@/components/common/AmountCell/cmp'

export type StakingNodesTableProps = {
  nodes: CCN[]
  filteredNodes: CCN[]
  stakeNodes: CCN[]
  account?: Account
  accountBalance?: number
  showStakedAmount?: boolean
  handleStake: (nodeHash: string) => void
  handleUnStake: (nodeHash: string) => void
}

export const StakingNodesTable = memo(
  ({
    nodes,
    stakeNodes,
    filteredNodes,
    account,
    accountBalance,
    showStakedAmount,
    handleStake: onStake,
    handleUnStake: onUnStake,
  }: StakingNodesTableProps) => {
    const columns = useMemo(() => {
      const cols = [
        {
          label: 'EST. APY',
          render: (row) => <APYCell node={row} nodes={nodes} />,
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
          label: 'LINKED',
          sortable: true,
          sortBy: (row) => row.resource_nodes.length,
          render: (row) => <LinkedCell nodes={row.crnsData} />,
        },
        {
          label: 'SCORE',
          sortable: true,
          sortBy: (row) => row.score,
          render: (row) => <ScoreCell score={row.score} />,
        },
        {
          label: '',
          align: 'right',
          render: (node) => (
            <div tw="flex gap-3 justify-end">
              <StakeButton
                {...{
                  node,
                  account,
                  accountBalance,
                  stakeNodes,
                  onStake,
                  onUnStake,
                }}
              />
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

      if (showStakedAmount && account) {
        cols.splice(cols.length - 1, 0, {
          label: 'AMOUNT',
          sortable: true,
          sortBy: (row) => row.stakers[account.address] || 0,
          render: (row) => (
            <AmountCell amount={row.stakers[account.address] || 0} />
          ),
        })
      }

      return cols.map((col, i) => {
        col.width = i === cols.length - 1 ? '100%' : `${70 / cols.length - 1}%`
        return col
      })
    }, [
      account,
      accountBalance,
      nodes,
      onStake,
      onUnStake,
      showStakedAmount,
      stakeNodes,
    ])

    return (
      <NodesTable
        columns={columns}
        data={filteredNodes}
        borderType="solid"
        oddRowNoise
      />
    )
  },
)
StakingNodesTable.displayName = 'StakingNodesTable'

export default StakingNodesTable
