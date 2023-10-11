import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    router.replace('/earn/staking')
  })

  return <>Loading...</>
}
