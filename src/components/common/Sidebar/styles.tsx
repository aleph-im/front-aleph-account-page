import { addClasses } from '@aleph-front/aleph-core'
import Link from 'next/link'
import styled from 'styled-components'
import tw from 'twin.macro'

export const StyledSidebar = styled.aside`
  display: flex;
  align-items: stretch;
`

export const StyledNav1 = styled.nav`
  background-color: #0000004c;

  height: 100%;
  width: 4.5rem;

  display: flex;
  flex-direction: column;
  align-items: center;
`

export const StyledNav2 = styled.nav<{ $open?: boolean }>`
  background-color: #00000020;
  height: 100%;
  width: ${({ $open }) => ($open ? '18rem' : '0')};
  transition: all ease-in-out 0.5s 0s;
  padding-top: 7rem;
  overflow: hidden;
`

export const StyledLink = styled(Link).attrs(addClasses('tp-nav'))<{
  $isActive?: boolean
  $hasText?: boolean
}>`
  ${tw`flex items-center gap-1.5 py-2 px-6 w-full whitespace-nowrap`}
  color: ${({ theme, $isActive, $hasText }) =>
    $isActive || !$hasText ? theme.color.main0 : theme.color.base0};
  opacity: ${({ $hasText, $isActive }) =>
    !$isActive && !$hasText ? '0.4' : '1'};
  justify-content: ${({ $hasText }) => (!$hasText ? 'center' : 'flex-start')};
`
