import styled from 'styled-components'
import tw from 'twin.macro'

type StyleProps = React.HTMLAttributes<HTMLDivElement> & {
  noValidate: true
}
export const StyledForm = styled.form<StyleProps>`
  ${tw`flex flex-col flex-1 gap-8`}
`
