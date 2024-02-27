import styled from 'styled-components'
import tw from 'twin.macro'

export const StyledLayout = styled.div`
  ${tw`columns-xs gap-9 -mt-9`}

  & > * {
    ${tw`inline-flex w-full flex-col gap-9 mt-9 break-inside-avoid`}
  }
`
