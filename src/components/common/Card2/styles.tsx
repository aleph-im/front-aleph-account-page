import { addClasses, NoisyContainer } from '@aleph-front/core'
import { ReactNode } from 'react'
import styled, { css } from 'styled-components'
import tw from 'twin.macro'

export const StyledContainer = styled(NoisyContainer).attrs({
  type: 'grain-2',
})`
  ${({ theme }) => css`
    ${tw`p-6 rounded-2xl! relative flex flex-col gap-6`}
    border: 1px solid ${theme.color.background}90;
    box-shadow: 0px 4px 24px 0px ${theme.color.main0}20;
    backdrop-filter: blur(50px);
  `}
`

export const StyledTitle = styled.div.attrs(addClasses('tp-info'))<{
  children?: ReactNode
}>`
  ${tw`uppercase`}
`
