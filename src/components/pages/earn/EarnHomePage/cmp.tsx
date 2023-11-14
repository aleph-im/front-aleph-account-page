import { SpinnerOverlay } from '@/components/common/SpinnerOverlay/cmp'
import { useRedirect } from '@/hooks/common/useRedirect'

export default function EarnHomePage() {
  useRedirect('/earn/staking')
  return <SpinnerOverlay show fullScreen center />
}
