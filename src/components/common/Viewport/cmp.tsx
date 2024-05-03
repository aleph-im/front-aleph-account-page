import { memo } from 'react'
import { ViewportProps } from './types'
import { StyledViewport } from './styles'
import { useRequestCCNsFeed } from '@/hooks/common/useRequestEntity/useRequestCCNsFeed'
import { useRequestRewardsFeed } from '@/hooks/common/useRequestEntity/useRequestRewardsFeed'
import { useFilters } from '@/hooks/common/useFilters'

export const Viewport = ({ children }: ViewportProps) => {
  useFilters({ syncUrl: true })

  // @note: First state is received by websocket
  // useRequestAlephNodes({})
  // useRequestRewards({})

  useRequestCCNsFeed()
  useRequestRewardsFeed()

  return <StyledViewport>{children}</StyledViewport>
}
Viewport.displayName = 'Viewport'

export default memo(Viewport)
