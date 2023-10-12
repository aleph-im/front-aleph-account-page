import { useRedirect } from '@/hooks/common/useRedirect'

export default function EarnHomePage() {
  useRedirect('/earn/staking')
  return <>Loading...</>
}
