import { memo, useMemo } from 'react'
import tw from 'twin.macro'
import { Button, NotificationBadge, TableColumn } from '@aleph-front/aleph-core'
import { CCN, CRN, NodeLastVersions } from '@/domain/node'
import NodesTable from '@/components/common/NodesTable'
import NameCell from '@/components/common/NameCell'
import ScoreCell from '@/components/common/ScoreCell'
import VersionCell from '../VersionCell'
import DecentralizedCell from '../DecentralizedCell'
import CRNRewardsCell from '../CRNRewardsCell'
import LinkCRNButton from '../LinkCRNButton'
import { Account } from 'aleph-sdk-ts/dist/accounts/account'

export type ComputeResourceNodesTableProps = {
  nodes: CRN[]
  filteredNodes: CRN[]
  userNode?: CCN
  account?: Account
  lastVersion?: NodeLastVersions
  nodesIssues?: Record<string, string>
  handleLink: (nodeHash: string) => void
  handleUnlink: (nodeHash: string) => void
}

export const ComputeResourceNodesTable = memo(
  ({
    nodes,
    filteredNodes,
    userNode,
    account,
    lastVersion,
    nodesIssues,
    handleLink: onLink,
    handleUnlink: onUnlink,
  }: ComputeResourceNodesTableProps) => {
    const columns = useMemo(() => {
      return [
        {
          label: '',
          align: 'center',
          width: 0,
          cellProps: () => ({ css: tw`p-0!` }),
          hcellProps: () => ({ css: tw`p-0! border-0!` }),
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
        {
          label: '',
          align: 'right',
          render: (node) => (
            <div tw="flex gap-3 justify-end">
              <LinkCRNButton
                {...{
                  node,
                  userNode,
                  account,
                  onLink,
                  onUnlink,
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
      ] as TableColumn<CRN>[]
    }, [account, lastVersion, nodes, nodesIssues, onLink, onUnlink, userNode])

    return <NodesTable columns={columns} data={filteredNodes} />
  },
)
ComputeResourceNodesTable.displayName = 'ComputeResourceNodesTable'

export default ComputeResourceNodesTable
