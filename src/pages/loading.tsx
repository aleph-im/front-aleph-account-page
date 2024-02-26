import { memo } from 'react'
import SpinnerOverlay from '@/components/common/SpinnerOverlay'
import { useRouterLoadState } from '@/hooks/common/useRouterLoadState'

export function Loading() {
  const { loading } = useRouterLoadState()

  return <SpinnerOverlay show={loading} />
}
Loading.displayName = 'Loading'

export default memo(Loading)
