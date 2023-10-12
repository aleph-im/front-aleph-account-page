import tw from 'twin.macro'
import styled, { css } from 'styled-components'

export const StyledLinkIcon = styled.div<{ $active: boolean }>(
  ({ theme, $active }) => {
    const color = $active ? theme.color.main1 : `${theme.color.base0}20`

    return [
      tw`h-3 w-2`,
      css`
        background-color: ${color};
      `,
    ]
  },
)
