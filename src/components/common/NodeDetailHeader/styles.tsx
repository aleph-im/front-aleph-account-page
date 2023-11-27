import { addClasses } from '@aleph-front/aleph-core'
import styled, { css } from 'styled-components'
import tw from 'twin.macro'
import NodeAvatar from '../NodeAvatar'

export type StyledContainerProps = {
  $backgroundUrl: string
}

export const StyledContainer = styled.div<StyledContainerProps>`
  ${({ $backgroundUrl, theme }) => {
    const [c1, c2] = theme.gradient.main0.colors

    return css`
      ${tw`flex flex-col h-[12.5rem] justify-end`}
      background-image: url(${$backgroundUrl}), linear-gradient(90deg, ${c1}33 0%, ${c2}33 100%);
      background-position: center center;
      background-size: cover;

      &::after {
        content: '';
        ${tw``}
      }
    `
  }}
`

export const StyledTitle = styled.h1.attrs(addClasses('tp-h5'))`
  ${({ theme }) => {
    return css`
      ${tw`w-full text-ellipsis overflow-hidden whitespace-nowrap m-0 py-0.5 px-6`}
      color: ${theme.color.text};
      /* background-color: ${theme.color.base1}19; */
      background-color: ${theme.color.base1}E5;
    `
  }};
`

export const StyledDescription = styled.h2.attrs(addClasses('tp-body3'))`
  ${({ theme }) => {
    return css`
      ${tw`w-full text-ellipsis overflow-hidden whitespace-nowrap m-0 py-3 px-6`}
      color: ${theme.color.text};
    `
  }};
`

export const StyledNodeAvatar = styled(NodeAvatar).attrs((props) => {
  return {
    size: 'lg',
    ...props,
  }
})`
  ${tw`my-4 mx-6`}
`
