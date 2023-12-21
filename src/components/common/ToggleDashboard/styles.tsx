import { ToggleContainer } from '@aleph-front/aleph-core'
import styled, { css } from 'styled-components'
import tw from 'twin.macro'

export const StyledContainer = styled.div<{
  $isOpen: boolean
  $duration: number
}>`
  ${({ $isOpen, $duration = 500 }) => css`
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows ${$duration}ms ease-in-out;

    ${$isOpen &&
    css`
      grid-template-rows: 1fr;
    `}
  `}
`

export const StyledToggleContainer = styled(ToggleContainer)`
  ${tw`relative p-0 m-0 -top-4`}
  transition-property: opacity, visibility, top;

  ${({ open }) =>
    open &&
    css`
      ${tw`p-16 -m-16 top-0`}
    `}
`

export type StyledButtonsContainerProps = {
  $open: boolean
}

export const StyledButtonsContainer = styled.div<StyledButtonsContainerProps>`
  ${({ $open }) => css`
    ${tw`flex flex-col gap-5 !absolute top-0`}
    opacity: ${$open ? 1 : 0};
    transition: opacity ease-in-out 300ms ${$open ? 400 : 0}ms,
      visibility linear 0ms ${$open ? 400 : 0}ms;
  `}
`
