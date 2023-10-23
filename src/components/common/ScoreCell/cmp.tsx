import { memo } from 'react'
import { StyledScoreIcon } from './styles'

// https://github.com/aleph-im/aleph-account/blob/main/src/components/NodesTable.vue#L586
export const ScoreCell = memo(
  ({
    score,
    showPercentage = true,
  }: {
    score: number
    showPercentage?: boolean
  }) => {
    const num = Number(score * 100).toFixed(2)

    return (
      <div tw="inline-flex gap-3 items-center">
        <StyledScoreIcon $score={score} />
        {showPercentage && <>{num}%</>}
      </div>
    )
  },
)
ScoreCell.displayName = 'ScoreCell'

export default ScoreCell
