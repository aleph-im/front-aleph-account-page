import { Button, Navbar } from '@aleph-front/aleph-core'
import styled from 'styled-components'

export const StyledHeader = styled.header`
  height: 104px;
  width: 100%;
  position: sticky;
  display: flex;
  align-items: center;
  justify-content: space-between;
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
