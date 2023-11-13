import { ViewportProps } from './types'
import { StyledViewport } from './styles'
import { memo } from 'react'
import { useRequestCCNs } from '@/hooks/common/useRequestEntity/useRequestCCNs'
import { useRequestCRNs } from '@/hooks/common/useRequestEntity/useRequestCRNs'
import { useRequestRewards } from '@/hooks/common/useRequestEntity/useRequestRewards'

export const Viewport = memo(({ children }: ViewportProps) => {
  useRequestCCNs({})
  useRequestCRNs({})
  useRequestRewards({})

  return <StyledViewport>{children}</StyledViewport>
})
Viewport.displayName = 'Viewport'

export default Viewport
