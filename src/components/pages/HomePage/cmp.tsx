import { useRedirect } from '@/hooks/common/useRedirect'

export default function HomePage() {
  useRedirect('/earn/staking')
  return <>Loading...</>
}