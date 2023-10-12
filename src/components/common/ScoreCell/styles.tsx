import tw from 'twin.macro'
import styled, { css } from 'styled-components'

export const StyledScoreIcon = styled.div<{ $score: number }>(
  ({ theme, $score }) => {
    const color =
      $score >= 0.8
        ? theme.color.main1
        : $score >= 0.5
        ? theme.color.main0
        : theme.color.error

    return [
      tw`h-4 w-4 rounded-full`,
      css`
        background-color: ${color};
      `,
    ]
  },
)
