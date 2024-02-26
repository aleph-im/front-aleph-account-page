import { memo } from 'react'
import { useSPARedirect } from '@/hooks/common/useSPARedirect'

export const HomePage = () => {
  useSPARedirect('/earn/staking')
  return null
}

export default memo(HomePage)
