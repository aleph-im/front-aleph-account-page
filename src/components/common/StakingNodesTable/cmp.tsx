import { memo, useMemo } from 'react'
import { NotificationBadge, TableColumn } from '@aleph-front/aleph-core'
import { CCN } from '@/domain/node'
import NodesTable from '@/components/common/NodesTable'
import NodeLinkedNodes from '@/components/common/NodeLinkedNodes'
import APYCell from '@/components/common/NodeAPY'
import NodeStaked from '@/components/common/NodeStaked'
import StakeButton from '@/components/common/StakeButton'
import { Account } from 'aleph-sdk-ts/dist/accounts/account'
import NodeAmount from '@/components/common/NodeAmount'
import tw from 'twin.macro'
import ButtonLink from '../ButtonLink'

export type StakingNodesTableProps = {
  nodes: CCN[]
  filteredNodes: CCN[]
  account?: Account
  accountBalance?: number
  showStakedAmount?: boolean
  nodesIssues?: Record<string, string>
  handleStake: (nodeHash: string) => void
  handleUnstake: (nodeHash: string) => void
}

export const StakingNodesTable = ({
  nodes,
  filteredNodes,
  account,
  accountBalance,
  showStakedAmount,
  nodesIssues,
  handleStake: onStake,
  handleUnstake: onUnstake,
}: StakingNodesTableProps) => {
  const columns = useMemo(() => {
    const cols = [
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
        label: 'EST. APY',
        render: (node) => <APYCell node={node} nodes={nodes} />,
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
        label: 'LINKED',
        sortable: true,
        sortBy: (node) => node.resource_nodes.length,
        render: (node) => <NodeLinkedNodes nodes={node.crnsData} />,
      },
      {
        label: 'SCORE',
        sortable: true,
        sortBy: (node) => node.score,
        render: (node) => <NodeScore score={node.score} />,
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
                onStake,
                onUnstake,
              }}
            />
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

    if (showStakedAmount && account) {
      cols.splice(cols.length - 1, 0, {
        label: 'AMOUNT',
        sortable: true,
        sortBy: (node) => node.stakers[account.address] || 0,
        render: (node) => (
          <NodeAmount amount={node.stakers[account.address] || 0} />
        ),
      })
    }

    return cols
  }, [
    account,
    accountBalance,
    nodes,
    nodesIssues,
    onStake,
    onUnstake,
    showStakedAmount,
  ])

  return <NodesTable columns={columns} data={filteredNodes} />
}
StakingNodesTable.displayName = 'StakingNodesTable'

export default memo(StakingNodesTable)
