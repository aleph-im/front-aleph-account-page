import tw from 'twin.macro'
import styled, { css } from 'styled-components'

export const StyledAPYIcon = styled.div<{ $performance: number }>(
  ({ theme, $performance }) => {
    const color =
      $performance >= 0.8
        ? theme.color.main1
        : $performance >= 0.5
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
