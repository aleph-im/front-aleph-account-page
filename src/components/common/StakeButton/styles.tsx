import tw from 'twin.macro'
import styled, { css } from 'styled-components'

export const StyledProgressBar = styled.div<{ $percent: number }>(
  ({ theme, $percent }) => {
    const color = $percent >= 1 ? theme.color.main1 : theme.color.main0
    const bgColor = `${theme.color.base0}20`

    return [
      tw`relative h-0.5 w-full`,
      css`
        background-color: ${bgColor};

        &:after {
          ${tw`absolute top-0 left-0 h-full`}
          content: '';
          background-color: ${color};
          width: ${$percent * 100}%;
        }
      `,
    ]
  },
)
