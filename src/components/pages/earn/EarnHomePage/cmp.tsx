import { memo } from 'react'
import SpinnerOverlay from '@/components/common/SpinnerOverlay'
import { useRedirect } from '@/hooks/common/useRedirect'

export const EarnHomePage = () => {
  useRedirect('/earn/staking')
  return <SpinnerOverlay show fullScreen center />
}

export default memo(EarnHomePage)
