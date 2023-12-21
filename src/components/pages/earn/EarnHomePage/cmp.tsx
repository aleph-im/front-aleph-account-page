import { memo } from 'react'
import { useRedirect } from '@/hooks/common/useRedirect'

export const EarnHomePage = () => {
  useRedirect('/earn/staking')
  return null
}

export default memo(EarnHomePage)
