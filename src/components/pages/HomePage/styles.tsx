import { Button } from '@aleph-front/aleph-core'
import styled from 'styled-components'
import tw from 'twin.macro'

export const StyledH1Button = styled(Button).attrs((props) => {
  return {
    ...props,
    variant: 'secondary',
    size: 'big',
    kind: 'neon',
    color: 'main0',
  }
})``

export const StyledLinkItem = styled.li<{ last?: boolean }>`
  ${({ last }) => (last ? tw`mt-6` : tw`my-6`)}
  ${tw`p-0`}
  line-height: 0;
`

export const StyledLink = styled(Button).attrs((props) => {
  return {
    ...props,
    forwardedAs: 'a',
    kind: 'neon',
    variant: 'text-only',
    size: 'regular',
    color: 'main0',
  }
})``
