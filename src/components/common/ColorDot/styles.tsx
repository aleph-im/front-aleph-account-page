import tw from 'twin.macro'
import styled, { css } from 'styled-components'

export type StyledDotProps = {
  $color?: string
  $gradient?: string
  $size?: string
}

export const StyledDot = styled.div<StyledDotProps>(
  ({ theme, $color = 'main0', $gradient, $size = '1rem' }) => {
    const gradient = $gradient ? theme.gradient[$gradient]?.fn : undefined
    const color = gradient || theme.color[$color] || $color

    return [
      tw`rounded-full shrink-0`,
      css`
        background: ${color};
        width: ${$size};
        height: ${$size};
      `,
    ]
  },
)
