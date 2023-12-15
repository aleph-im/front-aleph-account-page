import {
  BreakpointId,
  Button,
  FloatPosition,
  Navbar,
  WalletPicker,
  getResponsiveCss,
} from '@aleph-front/aleph-core'
import styled, { css } from 'styled-components'
import tw from 'twin.macro'

export type StyledHeaderProps = {
  $breakpoint?: BreakpointId
}

export const StyledHeader = styled.header<StyledHeaderProps>`
  ${({ $breakpoint }) => css`
    ${tw`hidden sticky flex-initial shrink-0 m-0 px-16 w-full top-0 z-10 items-center justify-between`}
    height: 6.5rem;
    backdrop-filter: blur(50px);

    /* MOBILE LAYOUT */
    ${getResponsiveCss(
      $breakpoint,
      css`
        ${tw`flex`}
      `,
    )}
  `}
`

export const StyledButton = styled(Button).attrs((props) => {
  return {
    ...props,
    color: 'main0',
    kind: 'neon',
    size: 'regular',
    variant: 'tertiary',
  }
})`
  display: block;

  &:last-child {
    margin-bottom: 0;
  }
`

export const StyledWalletPicker = styled(WalletPicker)<{
  $position: FloatPosition
  $isOpen: boolean
}>`
  ${({ $position: { x, y }, $isOpen }) => {
    return css`
      ${tw`fixed z-20 mt-4 top-0 left-0`}
      transform: ${`translate3d(${x}px, ${y}px, 0)`};
      opacity: ${$isOpen ? 1 : 0};
      will-change: opacity transform;
      transition: opacity ease-in-out 0.25s 0s;
    `
  }}
`

export type StyledNavbarProps = {
  $breakpoint?: BreakpointId
}

export const StyledNavbar = styled(Navbar).attrs<StyledNavbarProps>(
  ({ $breakpoint, ...rest }) => {
    return {
      ...rest,
      breakpoint: $breakpoint,
    }
  },
)<StyledNavbarProps>`
  ${({ $breakpoint }) => css`
    ${tw`block z-10`}

    /* MOBILE LAYOUT */
    ${getResponsiveCss(
      $breakpoint,
      css`
        ${tw`hidden`}
      `,
    )}
  `}
`
