import { memo } from 'react'
import { useRedirect } from '@/hooks/common/useRedirect'

export const HomePage = () => {
  useRedirect('/earn/staking')
  return null
}

export default memo(HomePage)
