import { memo } from 'react'
import { StyledLinkIcon } from './styles'

// https://github.com/aleph-im/aleph-account/blob/main/src/components/NodesTable.vue#L163
export const LinkedCell = memo(
  ({ nodes, max = 3 }: { nodes: string[]; max?: number }) => {
    return (
      <div tw="flex items-center gap-3">
        <div tw="flex items-stretch gap-0.5">
          {Array.from({ length: max }).map((_, i) => (
            <StyledLinkIcon key={i} $active={!!nodes[i]} />
          ))}
        </div>
        <div tw="whitespace-nowrap leading-4" className="fs-xs">
          {nodes.length} <span tw="opacity-20">of {max}</span>
        </div>
      </div>
    )
  },
)
LinkedCell.displayName = 'LinkedCell'

export default LinkedCell
