import { Icon, Logo, addClasses } from '@aleph-front/aleph-core'
import Link from 'next/link'
import styled, { css, keyframes } from 'styled-components'
import tw from 'twin.macro'

export const StyledLinkContentCss = css`
  ${tw`flex items-center justify-start gap-2.5 py-2 px-6 whitespace-nowrap w-full`}
`

export const StyledNav1 = styled.nav`
  ${tw`h-full w-full`}
  background-color: #0000004c;
`

export const StyledNav1Link = styled(Link).attrs(addClasses('tp-nav'))<{
  $isActive?: boolean
}>`
  ${({ theme, $isActive }) => css`
    ${StyledLinkContentCss}
    ${tw`relative justify-center`}

    color: ${theme.color.main0}${$isActive ? 'ff' : '66'};

    ${$isActive &&
    css`
      &::after {
        ${tw`absolute -top-2 left-0 h-full opacity-0`}
        content: '';
        width: 0.375rem;
        background-color: ${theme.color.main0};
      }
    `}
  `}
`

export const StyledNav2 = styled.nav`
  ${tw`flex flex-col h-full overflow-hidden z-10`}
  padding-top: 7rem;
  background-color: #00000020;

  padding-left: 0;
  box-shadow: 0px 0px 0px 0px #00000020;

  &:hover {
    cursor: pointer;
  }
`

export const StyledNav2Title = styled.div.attrs(addClasses('tp-nav'))`
  ${tw`py-2 px-6 w-auto`}
`

export const StyledNav2LinkContainer = styled.div`
  ${tw`flex flex-col items-start cursor-auto`}
`

export const StyledNav2Link = styled(Link).attrs(addClasses('tp-nav'))<{
  $isActive?: boolean
  $open?: boolean
}>`
  ${({ theme, $isActive }) => css`
    ${StyledLinkContentCss}
    color: ${$isActive ? theme.color.main0 : theme.color.base0};

    & > span {
      ${tw`overflow-hidden`}
    }
  `}
`

export const StyledLogo = styled(Logo).attrs((props) => {
  return {
    ...props,
    size: '1.5rem',
    text: '',
  }
})(() => [tw`flex items-center justify-center h-8 mt-8 mb-12`])

export const StyledToggleButton = styled(Icon).attrs((props) => {
  return {
    ...props,
    name: 'angle-right', //props.$open ? 'angle-left' : 'angle-right',
  }
})`
  ${({ theme }) => css`
    ${tw`!w-4 !h-4 p-0.5 !box-border cursor-pointer origin-center`}
    color: ${theme.color.base1};
    background-color: ${theme.color.base0};
  `}
`

export const StyledStorageContainer = styled.div.attrs(
  addClasses('tp-body3 fs-12'),
)`
  ${tw`w-[10.5rem] max-w-full mx-auto px-1 cursor-auto`}
`

// https://github.com/aleph-im/aleph-account/blob/8b920e34fab9f4f70e3387eed2bd5839ae923971/src/layouts/MainLayout.vue#L131C14-L131C14
export const StyledProgressBar = styled.div<{ $percent: number }>(
  ({ theme, $percent }) => {
    // @note: add a min width on the bar if percent is gt 0
    $percent = $percent > 0 ? Math.max($percent, 0.05) : $percent

    const color = theme.gradient.main0.fn
    const bgColor = `${theme.color.base0}20`

    return [
      tw`relative w-full`,
      css`
        height: 0.3125rem;
        background-color: ${bgColor};
        border-radius: 1rem;

        &:after {
          ${tw`absolute top-0 left-0 w-full h-full`}
          content: '';
          border-radius: 1rem;
          background-image: ${color};
          clip-path: ${`inset(0 ${100 - $percent * 100}% 0 0);`};
        }
      `,
    ]
  },
)

const fadeOutIn1 = keyframes` 
  0%, 15%, 90%, 100%  {
    opacity: 1;
  }

  45% {
    opacity: 0;
  }
`

// @note: https://stackoverflow.com/a/43575547
const fadeOutIn1Reverse = keyframes` 
  0%, 10%, 80%, 100% {
    opacity: 1;
  }

  50% {
    opacity: 0;
  }
`

const fadeOutIn2 = keyframes` 
  0%, 6%, 80%, 100%  {
    opacity: 1;
  }

  46%, 60% {
    opacity: 0;
  }
`

const fadeOutIn2Reverse = keyframes` 
  0%, 10%, 70%, 100% {
    opacity: 1;
  }

  30% {
    opacity: 0;
  }
`

export const StyledSidebar = styled.aside<{
  $isOpen?: boolean
  $speed?: number
}>`
  ${tw`flex items-stretch justify-start`}

  ${({ $isOpen, $speed = 1 }) =>
    $isOpen || $isOpen === undefined
      ? css`
          & ${StyledNav1} {
            width: 4.5rem;
            transition: width ease-in-out ${0.35 / $speed}s ${0.4 / $speed}s;
          }

          & ${StyledNav1Link} > svg,
          & ${StyledLogo} {
            opacity: 1;
            visibility: visible;

            transition: opacity ease-in-out ${0.2 / $speed}s ${0.45 / $speed}s,
              visibility linear ${0.2 / $speed}s ${0.45 / $speed}s;
          }

          & ${StyledNav1Link}::after {
            ${tw`-top-2 opacity-0`}
            transition: opacity ease-in-out ${0.7 / $speed}s ${0.2 / $speed}s,
              top ease-in-out ${0.7 / $speed}s ${0.1 / $speed}s;
          }

          & ${StyledNav2} {
            width: 18.75rem;

            transition: width ease-in-out ${0.5 / $speed}s ${0.1 / $speed}s,
              padding-left ease-in-out ${0.4 / $speed}s 0s,
              box-shadow ease-in-out ${0.4 / $speed}s 0s;
          }

          & ${StyledNav2LinkContainer} {
            width: 100%;
            transition: width linear 0s ${0.5 / $speed}s;
            animation: ${1 / $speed}s ease-in-out 0s ${fadeOutIn1Reverse};
          }

          & ${StyledNav2Title}, & ${StyledNav2Link} > svg {
            ${tw`relative left-0 translate-x-0`}
            transition: all linear 0s ${0.5 / $speed}s;
          }

          & ${StyledNav2Title} {
            font-size: 1.125rem;
          }

          & ${StyledNav2Link} > span {
            max-width: 100%;
            transition: max-width linear 0s ${0.5 / $speed}s;
          }

          & ${StyledToggleButton} {
            transform: rotateZ(-180deg);
            transition: transform ease-in-out ${0.6 / $speed}s ${0.4 / $speed}s;
          }

          & ${StyledStorageContainer} {
            animation: ${1 / $speed}s ease-in-out 0s ${fadeOutIn2Reverse};
          }
        `
      : css`
          & ${StyledNav1} {
            width: 0.375rem;
            transition: width ease-in-out ${0.2 / $speed}s ${0.15 / $speed}s;
          }

          & ${StyledNav1Link} > svg,
          & ${StyledLogo} {
            opacity: 0;
            visibility: hidden;

            transition: opacity ease-in-out ${0.2 / $speed}s 0s,
              visibility linear ${0.2 / $speed}s 0s;
          }

          & ${StyledNav1Link}::after {
            ${tw`top-0 opacity-100`}
            transition: opacity ease-in-out ${0.7 / $speed}s ${0.2 / $speed}s,
              top ease-in-out ${0.7 / $speed}s ${0.3 / $speed}s;
          }

          & ${StyledNav2} {
            width: 4.5rem;

            transition: width ease-in-out ${0.4 / $speed}s ${0.25 / $speed}s,
              padding-left ease-in-out ${0.4 / $speed}s 0s,
              box-shadow ease-in-out ${0.4 / $speed}s 0s;

            &:hover {
              padding-left: 0.375rem;
              box-shadow: 0.375rem 0px 0px 0px #00000020;
            }
          }

          & ${StyledNav2LinkContainer} {
            width: 4.5rem;
            transition: width linear 0s ${0.45 / $speed}s;
            animation: ${1 / $speed}s ease-in-out 0s ${fadeOutIn1};
          }

          & ${StyledNav2Title}, & ${StyledNav2Link} > svg {
            ${tw`relative left-1/2 -translate-x-1/2`}
            transition: all linear 0s ${0.45 / $speed}s;
          }

          & ${StyledNav2Title} {
            font-size: 0.75rem;
          }

          & ${StyledNav2Link} > span {
            max-width: 0;
            transition: max-width linear 0s ${0.45 / $speed}s;
          }

          & ${StyledToggleButton} {
            transform: rotateZ(0deg);
            transition: transform ease-in-out ${0.6 / $speed}s ${0.25 / $speed}s;
          }

          & ${StyledStorageContainer} {
            animation: ${1 / $speed}s ease-in-out 0s ${fadeOutIn2};
          }
        `};

  ${({ $isOpen }) =>
    $isOpen === undefined &&
    css`
      & * {
        animation: none !important;
        transition: none !important;
      }
    `}
`
