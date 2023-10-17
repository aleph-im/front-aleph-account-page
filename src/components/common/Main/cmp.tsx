import { MainProps } from './types'
import { StyledMain } from './styles'
import { memo } from 'react'

export const Main = memo(({ children }: MainProps) => {
  return <StyledMain>{children}</StyledMain>
})
Main.displayName = 'Main'

export default Main
