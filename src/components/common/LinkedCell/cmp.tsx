import { memo } from 'react'
import { StyledDotIcon } from './styles'
import { CRN } from '@/domain/node'

// https://github.com/aleph-im/aleph-account/blob/main/src/components/NodesTable.vue#L163
export const LinkedCell = memo(
  ({ nodes, max = 3 }: { nodes: CRN[]; max?: number }) => {
    return (
      <div tw="inline-flex items-center gap-3">
        <div tw="flex items-stretch gap-0.5">
          {Array.from({ length: max }).map((_, i) => (
            <StyledDotIcon key={i} $score={nodes[i]?.score} />
          ))}
        </div>
        <div tw="whitespace-nowrap leading-4" className="fs-10">
          {nodes.length} <span tw="opacity-20">of {max}</span>
        </div>
      </div>
    )
  },
)
LinkedCell.displayName = 'LinkedCell'

export default LinkedCell
