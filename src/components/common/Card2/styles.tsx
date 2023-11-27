import { addClasses } from '@aleph-front/aleph-core'
import styled from 'styled-components'
import tw from 'twin.macro'

export const StyledContainer = styled.div`
  ${tw`p-6 rounded-2xl relative flex flex-col gap-6`}
  background-color: #00000033;
  border: 1px solid #ffffff19;
  box-shadow: 0px 4px 24px 0px rgba(135, 157, 202, 0.12);
  backdrop-filter: blur(50px);
`

export const StyledTitle = styled.div.attrs(addClasses('tp-info'))`
  ${tw`uppercase`}
`
