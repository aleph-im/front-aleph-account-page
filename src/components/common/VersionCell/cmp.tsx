import { memo, useMemo } from 'react'
import { StyledVersionIcon } from './styles'
import { AlephNode, NodeLastVersions, NodeManager } from '@/domain/node'
import { Icon, Tooltip } from '@aleph-front/aleph-core'

// https://github.com/aleph-im/aleph-account/blob/main/src/components/NodesTable.vue#L200
export const VersionCell = memo(
  ({
    node,
    lastVersion,
  }: {
    node: AlephNode
    nodes: AlephNode[]
    lastVersion?: NodeLastVersions
  }) => {
    const nodeManager = useMemo(() => new NodeManager(), [])

    const versionStatus = useMemo(() => {
      if (!lastVersion) return -1

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

    const data = (
      <div tw="flex gap-3 items-center whitespace-nowrap">
        <StyledVersionIcon $status={versionStatus} />
        {node.metricsData?.version || '-'}
      </div>
    )

    return (
      <>
        {versionStatus < 1 ? (
          <Tooltip
            my="top-center"
            at="bottom-center"
            header="Version"
            offset={{ x: 0, y: 10 }}
            content={versionLabel}
          >
            <div tw="flex items-center gap-2">
              {data} <Icon name="info-circle" size="sm" />
            </div>
          </Tooltip>
        ) : (
          data
        )}
      </>
    )
  },
)
VersionCell.displayName = 'VersionCell'

export default VersionCell
