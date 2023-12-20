import { AnchorHTMLAttributes, ReactNode, memo, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { IconName, LinkComponent, RouterSidebar } from '@aleph-front/aleph-core'
import { useUserStoreAllowance } from '@/hooks/common/useUserStoreAllowance'
import { useRoutes } from '@/hooks/common/useRoutes'

export type SidebarLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string
  icon?: IconName
  flag?: number
  isOpen?: boolean
  children?: ReactNode
}

const Sidebar = memo(() => {
  const { routes } = useRoutes()
  const { pathname } = useRouter()
  const [open, setOpen] = useState<boolean>()

  // --------------------------------------------

  const userStoreAllowance = useUserStoreAllowance()

  const allowanceInfo = useMemo(() => {
    if (!userStoreAllowance) return
    const consumedSize = (userStoreAllowance.consumedSize || 0) / 1024
    const allowedSize = (userStoreAllowance.allowedSize || 0) / 1024

    return {
      consumedSize,
      allowedSize,
    }
  }, [userStoreAllowance])

  const breakpoint = 'lg'

  return (
    <RouterSidebar
      {...{
        breakpoint,
        routes,
        pathname,
        Link: Link as LinkComponent,
        allowanceInfo,
        open,
        onToggle: setOpen,
      }}
    />
  )
})
Sidebar.displayName = 'Sidebar'

export default Sidebar
