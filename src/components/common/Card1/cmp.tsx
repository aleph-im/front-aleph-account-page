import { ReactNode, memo } from 'react'
import { StyledContainer } from './styles'

export type Card1Props = {
  children?: ReactNode
}

export const Card1 = memo(({ children }: Card1Props) => {
  return <StyledContainer>{children}</StyledContainer>
})
Card1.displayName = 'Card1'

export default Card1
