import tw from 'twin.macro'
import styled, { css } from 'styled-components'

export const StyledVersionIcon = styled.div<{ $status: number }>(
  ({ theme, $status }) => {
    const color =
      $status >= 0.8
        ? theme.color.main1
        : $status >= 0.5
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
