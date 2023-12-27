import styled from 'styled-components'
import ColorDot from '../ColorDot'

export type StyledScoreIconProps = { $score: number }

export const StyledScoreIcon = styled(ColorDot).attrs<StyledScoreIconProps>(
  ({ $score, ...rest }) => {
    const $color = $score >= 0.8 ? 'main1' : $score >= 0.5 ? 'main0' : 'error'

    return {
      $color,
      ...rest,
    }
  },
)<StyledScoreIconProps>``
