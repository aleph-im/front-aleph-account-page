import { ViewportProps } from './types'
import { StyledViewport } from './styles'
import { memo } from 'react'
import { useRequestCCNs } from '@/hooks/common/useRequestEntity/useRequestCCNs'
import { useRequestCRNs } from '@/hooks/common/useRequestEntity/useRequestCRNs'
import { useRequestRewards } from '@/hooks/common/useRequestEntity/useRequestRewards'
import { useRequestCCNsFeed } from '@/hooks/common/useRequestEntity/useRequestCCNsFeed'
import { useRequestRewardsFeed } from '@/hooks/common/useRequestEntity/useRequestRewardsFeed'

export const Viewport = ({ children }: ViewportProps) => {
  useRequestCCNs({})
  useRequestCRNs({})
  useRequestRewards({})

  useRequestCCNsFeed()
  useRequestRewardsFeed()

  return <StyledViewport>{children}</StyledViewport>
}
Viewport.displayName = 'Viewport'

export default memo(Viewport)
