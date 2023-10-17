import { Button, Navbar } from '@aleph-front/aleph-core'
import styled from 'styled-components'
import tw from 'twin.macro'

export const StyledHeader = styled.header`
  ${tw`sticky flex-initial shrink-0 m-0 px-16 w-full top-0 z-50 flex items-center justify-between`}
  height: 104px;
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
