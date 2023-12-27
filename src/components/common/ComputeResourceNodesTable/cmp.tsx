import { memo, useMemo } from 'react'
import tw from 'twin.macro'
import { NotificationBadge, TableColumn } from '@aleph-front/aleph-core'
import { Account } from 'aleph-sdk-ts/dist/accounts/account'
import { CCN, CRN, NodeLastVersions } from '@/domain/node'
import NodesTable from '@/components/common/NodesTable'
import NodeName from '@/components/common/NodeName'
import NodeScore from '@/components/common/NodeScore'
import NodeVersion from '@/components/common/NodeVersion'
import NodeDecentralization from '../NodeDecentralization'
import CRNRewardsCell from '../CRNRewardsCell'
import LinkCRNButton from '../LinkCRNButton'
import ButtonLink from '../ButtonLink'

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

export const ComputeResourceNodesTable = ({
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
        sortBy: (node) => node.parentData?.name,
        render: (node) => (
          <>
            {node.parentData ? (
              <NodeName
                hash={node.parentData.hash}
                name={node.parentData.name}
                picture={node.parentData.picture}
              />
            ) : (
              '-'
            )}
          </>
        ),
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
        label: 'DECENTRALIZED',
        sortable: true,
        sortBy: (node) => node.decentralization,
        render: (node) => (
          <NodeDecentralization decentralization={node.decentralization} />
        ),
      },
      {
        label: 'EST. REWARDS',
        align: 'right',
        render: (node) => <CRNRewardsCell node={node} />,
      },
      {
        label: 'VERSION',
        sortable: true,
        align: 'right',
        width: '100%',
        sortBy: (node) => node.metricsData?.version,
        render: (node) => (
          <NodeVersion node={node} nodes={nodes} lastVersion={lastVersion} />
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
            <ButtonLink
              kind="neon"
              size="regular"
              variant="secondary"
              color="main0"
              href={`/earn/crn/${node.hash}`}
            >
              Info
            </ButtonLink>
          </div>
        ),
      },
    ] as TableColumn<CRN>[]
  }, [account, lastVersion, nodes, nodesIssues, onLink, onUnlink, userNode])

  return <NodesTable columns={columns} data={filteredNodes} />
}
ComputeResourceNodesTable.displayName = 'ComputeResourceNodesTable'

export default memo(ComputeResourceNodesTable)
