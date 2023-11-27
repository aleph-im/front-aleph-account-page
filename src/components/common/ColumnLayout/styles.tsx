import styled from 'styled-components'
import tw from 'twin.macro'

export const StyledLayout = styled.div`
  ${tw`columns-xs gap-9`}

  & > * {
    ${tw`flex flex-col gap-9 mb-9 break-inside-avoid`}
  }
`
