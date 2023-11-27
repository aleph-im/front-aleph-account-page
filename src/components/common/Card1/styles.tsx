import { addClasses } from '@aleph-front/aleph-core'
import styled, { css } from 'styled-components'
import tw from 'twin.macro'

export const StyledContainer = styled.div.attrs(addClasses('fx-dark-main0'))`
  ${tw`p-6 rounded-3xl relative`}
  background: #00000019 !important;
`

export const StyledContent = styled.div<{
  $disabled?: boolean
}>`
  ${({ $disabled }) =>
    $disabled &&
    css`
      opacity: 0.4;
      filter: grayscale(100%);
    `}
`
