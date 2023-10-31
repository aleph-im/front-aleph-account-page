import { Logo, addClasses } from '@aleph-front/aleph-core'
import Link from 'next/link'
import styled, { css } from 'styled-components'
import tw from 'twin.macro'

export const StyledSidebar = styled.aside<{ $open?: boolean }>`
  ${tw`flex items-stretch justify-start`}
  transition: all linear 0.25s 0s;

  ${({ $open }) =>
    $open
      ? css`
          width: 23.25rem;
        `
      : css`
          width: 4.875rem;
        `};
`

// -------------- NAV 1 -----------------

export const StyledLogo = styled(Logo).attrs((props) => {
  return {
    ...props,
    size: '1.5rem',
    text: '',
  }
})`
  ${tw`relative h-8 mt-8 mb-12`}
`

export const fadeInOutContentCss = css<{ $open?: boolean }>`
  ${({ $open }) => css`
    opacity: ${$open ? '1' : '0'};
    visibility: ${$open ? 'visible' : 'hidden'};
    transition: all linear 0.25s 0s;
  `}
`
export const StyledNav1 = styled.nav<{ $open?: boolean }>`
  ${tw`relative h-full flex flex-col items-center overflow-hidden`}

  background-color: #0000004c;
  transition: all linear 0.25s 0s;

  ${({ $open }) =>
    $open
      ? css`
          width: 4.5rem;
        `
      : css`
          width: 0.375rem;
        `};

  & ${StyledLogo} {
    ${fadeInOutContentCss}
  }
`

export const StyledNav1Link = styled(Link).attrs(addClasses('tp-nav'))<{
  $isActive?: boolean
  $open?: boolean
}>`
  ${({ theme, $isActive, $open }) => css`
    ${tw`relative w-full`}

    color: ${theme.color.main0};
    opacity: ${!$isActive ? '0.4' : '1'};
    background-color: ${$isActive && !$open
      ? theme.color.main0
      : 'transparent'};
    transition: all linear 0.25s 0s;
  `}
`

// -------------- NAV 2 -----------------

export const StyledNav2 = styled.nav<{ $open?: boolean }>`
  ${tw`flex flex-col h-full overflow-hidden`}

  background-color: #00000020;
  padding-top: 7rem;
  background-color: #00000020;
  transition: all linear 0.25s 0s;

  ${({ $open }) =>
    $open
      ? css`
          width: 18.75rem;
          /* backdrop-filter: blur(0px); */

          ${StyledNav2Title} {
            font-size: 1.125rem;
          }
        `
      : css`
          width: 4.5rem;
          /* backdrop-filter: blur(999px); */
          background-color: #100f20;

          ${StyledNav2Title} {
            ${tw`px-0 w-full`}
            font-size: 0.75rem;
          }
        `};
`

export const StyledNav2Title = styled.div.attrs(addClasses('tp-nav'))`
  ${tw`relative py-2 px-6 w-0 text-center`}
  transition: all linear 0.25s 0s;
`

export const StyledNav2LinkContainer = styled.div<{ $open?: boolean }>`
  ${tw`relative flex flex-col items-start`}
  transition: all linear 0.25s 0s;
`

export const StyledNav2Link = styled(Link).attrs(addClasses('tp-nav'))<{
  $isActive?: boolean
  $open?: boolean
}>`
  ${({ theme, $isActive }) => css`
    ${tw`relative w-full`}
    color: ${$isActive ? theme.color.main0 : theme.color.base0};
  `}
`

export const StyledLinkContent = styled.div<{ $open?: boolean }>`
  ${({ $open }) => css`
    ${tw`relative flex items-center justify-start gap-2.5 py-2 px-6 whitespace-nowrap w-full`}
    transition: all linear 0.25s 0s;

    ${!$open &&
    css`
      padding-left: 1.75rem;
    `}

    & > span {
      ${fadeInOutContentCss}
    }
  `}
`
