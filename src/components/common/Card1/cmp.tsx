import { HTMLAttributes, ReactNode, memo } from 'react'
import { StyledContainer, StyledContent } from './styles'
import SpinnerOverlay from '../SpinnerOverlay'

export type Card1Props = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode
  disabled?: boolean
  loading?: boolean
}

export const Card1 = memo(
  ({ children, disabled, loading = false, ...rest }: Card1Props) => {
    return (
      <StyledContainer {...rest}>
        <SpinnerOverlay show={loading} center />
        <StyledContent $disabled={disabled}>{children}</StyledContent>
      </StyledContainer>
    )
  },
)
Card1.displayName = 'Card1'

export default Card1
