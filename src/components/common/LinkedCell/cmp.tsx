import { memo } from 'react'
import { StyledDotIcon } from './styles'
import { CRN } from '@/domain/node'
import { Tooltip } from '@aleph-front/aleph-core'
import NameCell from '../NameCell'
import ScoreCell from '../ScoreCell'

// https://github.com/aleph-im/aleph-account/blob/main/src/components/NodesTable.vue#L163
export const LinkedCell = memo(
  ({ nodes, max = 3 }: { nodes: CRN[]; max?: number }) => {
    return (
      <div tw="flex items-center gap-3">
        <Tooltip
          my="top-center"
          at="bottom-center"
          header="Linked nodes"
          offset={{ x: 0, y: 10 }}
          content={
            <div tw="flex flex-col gap-4 mt-4">
              {nodes.map((node) => (
                <div key={node.hash} tw="flex gap-4">
                  <ScoreCell {...node} showPercentage={false} />
                  <NameCell {...node} />
                </div>
              ))}
            </div>
          }
        >
          <div tw="flex items-stretch gap-0.5">
            {Array.from({ length: max }).map((_, i) => (
              <StyledDotIcon key={i} $score={nodes[i]?.score} />
            ))}
          </div>
        </Tooltip>
        <div tw="whitespace-nowrap leading-4" className="fs-10">
          {nodes.length} <span tw="opacity-20">of {max}</span>
        </div>
      </div>
    )
  },
)
LinkedCell.displayName = 'LinkedCell'

export default LinkedCell
