import { memo } from 'react'
import { AlephNode } from '@/domain/node'
import NodeStatus from '../NodeStatus'

export type NodeDetailStatusProps = {
  status?: AlephNode['status']
}

export const NodeDetailStatus = memo(
  ({ status, ...rest }: NodeDetailStatusProps) => {
    return (
      <div tw="px-3 py-1.5 bg-[#00000033]" {...rest}>
        <div className="tp-body fs-10">STATUS</div>
        <NodeStatus status={status || 'waiting'} />
      </div>
    )
  },
)
NodeDetailStatus.displayName = 'NodeDetailStatus'

export default NodeDetailStatus
