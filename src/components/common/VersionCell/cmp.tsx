import { memo, useCallback, useMemo } from 'react'
import { StyledVersionIcon } from './styles'
import { AlephNode, NodeManager } from '@/domain/node'
import { Tooltip } from '@aleph-front/aleph-core'
import { useRequest } from '@/hooks/common/useRequest'

// https://github.com/aleph-im/aleph-account/blob/main/src/components/NodesTable.vue#L200
export const VersionCell = memo(
  ({ node }: { node: AlephNode; nodes: AlephNode[] }) => {
    const nodeManager = useMemo(() => new NodeManager(), [])

    const doRequest = useCallback(
      () => nodeManager.getLatestVersion(node),
      [node, nodeManager],
    )

    const { data: lastVersion } = useRequest({
      doRequest,
      triggerOnMount: true,
      onSuccess: () => null,
    })

    const versionStatus = useMemo(() => {
      if (!lastVersion) return 0

      return nodeManager.isNodeUptodate(node, lastVersion) &&
        !nodeManager.isNodeExperimental(node, lastVersion)
        ? 1
        : nodeManager.isNodeOutdated(node, lastVersion) ||
          nodeManager.isNodeExperimental(node, lastVersion)
        ? 0.5
        : 0
    }, [node, lastVersion, nodeManager])

    const versionLabel = useMemo(() => {
      if (!lastVersion) return ''

      return nodeManager.isNodeLatest(node, lastVersion)
        ? 'latest'
        : nodeManager.isNodePrerelease(node, lastVersion)
        ? 'prerelease'
        : nodeManager.isNodeExperimental(node, lastVersion)
        ? 'experimental'
        : nodeManager.isNodeOutdated(node, lastVersion)
        ? 'outdated'
        : 'obsolete'
    }, [node, lastVersion, nodeManager])

    return (
      <>
        <Tooltip
          my="top-center"
          at="bottom-center"
          content={<div className="fs-sm">({versionLabel})</div>}
          header="Staking performance"
        >
          <div tw="flex gap-3 items-center whitespace-nowrap">
            <StyledVersionIcon $status={versionStatus} />
            {node.metricsData?.version || '-'}
          </div>
        </Tooltip>
      </>
    )
  },
)
VersionCell.displayName = 'VersionCell'

export default VersionCell
