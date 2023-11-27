import tw from 'twin.macro'
import styled, { css } from 'styled-components'

export const StyledDotIcon = styled.div<{ $score?: number }>(
  ({ theme, $score }) => {
    const color =
      $score === undefined
        ? `${theme.color.base0}20`
        : $score >= 0.8
        ? theme.color.main1
        : $score >= 0.5
        ? theme.color.main0
        : theme.color.error

    return [
      tw`h-3 w-2`,
      css`
        background-color: ${color};
      `,
    ]
  },
)
