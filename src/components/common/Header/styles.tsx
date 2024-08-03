import { BreakpointId, RouterNavbar, getResponsiveCss } from '@aleph-front/core'
import { ReactNode } from 'react'
import styled, { css } from 'styled-components'
import tw from 'twin.macro'

export type StyledNavbarDesktopProps = {
  $breakpoint?: BreakpointId
  children?: ReactNode
}

export const StyledNavbarDesktop = styled.div<StyledNavbarDesktopProps>`
  ${({ $breakpoint }) => css`
    ${tw`hidden relative flex-initial shrink-0 m-0 px-16 w-full top-0 z-10 items-center justify-between`}
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

// --------------------------------------------

export type StyledNavbarMobileProps = {
  $breakpoint?: BreakpointId
}

export const StyledNavbarMobile = styled(RouterNavbar)<StyledNavbarMobileProps>`
  ${({ breakpoint }) => css`
    ${tw`relative block z-10`}

    /* MOBILE LAYOUT */
    ${getResponsiveCss(
      breakpoint,
      css`
        ${tw`hidden`}
      `,
    )}
  `}
`

// --------------------------------------------

export type StyledHeaderProps = {
  $breakpoint?: BreakpointId
  children?: ReactNode
}

export const StyledHeader = styled.header<StyledHeaderProps>`
  ${({ $breakpoint }) => css`
    ${tw`fixed top-0 left-0 m-0 z-10 w-full`}
    font-size: inherit;
    line-height: inherit;
    box-sizing: border-box;
    /* background-color: #141327CC; */

    /* MOBILE LAYOUT */
    ${getResponsiveCss(
      $breakpoint,
      css`
        ${tw`sticky`}
      `,
    )};
  `}
`
