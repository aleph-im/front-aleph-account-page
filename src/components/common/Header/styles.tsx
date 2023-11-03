import {
  Button,
  FloatPosition,
  Navbar,
  WalletPicker,
} from '@aleph-front/aleph-core'
import styled, { css } from 'styled-components'
import tw from 'twin.macro'

export const StyledHeader = styled.header`
  ${tw`sticky flex-initial shrink-0 m-0 px-16 w-full top-0 z-10 flex items-center justify-between`}
  height: 6.5rem;
  backdrop-filter: blur(50px);
`

export const StyledNavbar = styled(Navbar)`
  position: relative;
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
