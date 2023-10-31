import { HTMLAttributes, ReactNode, memo } from 'react'
import { StyledContainer, StyledContent } from './styles'

export type Card1Props = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode
  disabled?: boolean
}

export const Card1 = memo(({ children, disabled, ...rest }: Card1Props) => {
  return (
    <StyledContainer {...rest}>
      <StyledContent $disabled={disabled}>{children}</StyledContent>
    </StyledContainer>
  )
})
Card1.displayName = 'Card1'

export default Card1
