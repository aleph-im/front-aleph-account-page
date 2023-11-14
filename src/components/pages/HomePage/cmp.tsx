import SpinnerOverlay from '@/components/common/SpinnerOverlay'
import { useRedirect } from '@/hooks/common/useRedirect'

export default function HomePage() {
  useRedirect('/earn/staking')
  return <SpinnerOverlay show fullScreen center />
}
