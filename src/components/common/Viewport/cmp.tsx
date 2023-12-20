import { ViewportProps } from './types'
import { StyledViewport } from './styles'
import { memo } from 'react'
import { useRequestRewards } from '@/hooks/common/useRequestEntity/useRequestRewards'
import { useRequestCCNsFeed } from '@/hooks/common/useRequestEntity/useRequestCCNsFeed'
import { useRequestRewardsFeed } from '@/hooks/common/useRequestEntity/useRequestRewardsFeed'
import { useRequestAlephNodes } from '@/hooks/common/useRequestEntity/useRequestAlephNodes'

export const Viewport = ({ children }: ViewportProps) => {
  useRequestAlephNodes({})
  useRequestRewards({})

  useRequestCCNsFeed()
  useRequestRewardsFeed()

  return <StyledViewport>{children}</StyledViewport>
}
Viewport.displayName = 'Viewport'

export default memo(Viewport)
