import { IconName } from '@fortawesome/fontawesome-svg-core'
import { Icon } from '@aleph-front/aleph-core'
import {
  StyledLogo,
  StyledNav1,
  StyledNav1Link,
  StyledNav2,
  StyledNav2Link,
  StyledNav2LinkContainer,
  StyledNav2Title,
  StyledProgressBar,
  StyledSidebar,
  StyledStorageContainer,
  StyledToggleButton,
  StyledToggleButtonContainer,
} from './styles'
import {
  AnchorHTMLAttributes,
  ReactNode,
  memo,
  useCallback,
  useMemo,
  useState,
  MouseEvent,
} from 'react'
import { useRouter } from 'next/router'
import { useUserStoreAllowance } from '@/hooks/common/useUserStoreAllowance'

export type Route = {
  name?: string
  path: string
  icon?: IconName
  children?: Route[]
}

const routes: Route[] = [
  {
    name: 'EARN',
    path: '/earn',
    icon: 'circle-nodes',
    children: [
      {
        name: 'Staking',
        path: '/earn/staking',
      },
      {
        name: 'Core nodes',
        path: '/earn/ccn',
      },
      {
        name: 'Compute nodes',
        path: '/earn/crn',
      },
    ],
  },
  {
    name: 'PROFILE',
    path: '/profile',
    icon: 'user',
    children: [
      {
        name: 'My profile',
        path: '/profile',
      },
      {
        name: 'Notification center',
        path: '/notification',
      },
    ],
  },
]

export type SidebarLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string
  icon?: IconName
  isOpen?: boolean
  children?: ReactNode
}

export const SidebarLink = memo(
  ({ href, icon, children, isOpen }: SidebarLinkProps) => {
    const router = useRouter()
    const isActive = router.pathname.indexOf(href) >= 0

    const props = { href, $isActive: isActive, $isOpen: isOpen }

    const iconCmp = icon && (
      <Icon tw="p-1" {...{ name: icon as IconName, size: 'lg' }} />
    )

    return !children ? (
      <StyledNav1Link {...props}>{iconCmp}</StyledNav1Link>
    ) : (
      <StyledNav2Link {...props}>
        {iconCmp}
        <span>{children}</span>
      </StyledNav2Link>
    )
  },
)
SidebarLink.displayName = 'SidebarLink'

export const Sidebar = memo(() => {
  const [open, setOpen] = useState<boolean | undefined>(undefined)

  const handleToggle = useCallback(() => {
    setOpen((open) => (open === undefined ? false : !open))
  }, [setOpen])

  const handlePreventToggle = useCallback((e: MouseEvent) => {
    e.stopPropagation()
  }, [])

  const router = useRouter()

  const currentRoute = useMemo(
    () => routes.find((route) => router.pathname.indexOf(route.path) === 0),
    [router],
  )

  const allowanceInfo = useUserStoreAllowance()
  const consumedSize = (allowanceInfo.consumedSize || 0) / 1024
  const allowedSize = (allowanceInfo.allowedSize || 0) / 1024
  const storePercent = allowedSize ? consumedSize / allowedSize : 0

  return (
    <StyledSidebar $isOpen={open}>
      <StyledNav1>
        <StyledLogo />
        {routes.map((child) => (
          <SidebarLink
            key={child.path}
            {...{
              href: child.path,
              icon: child.icon,
              isOpen: open,
            }}
          />
        ))}
        <SidebarLink href="/earn/bookmark" icon="bookmark"></SidebarLink>
        <SidebarLink href="/earn/dropbox" icon="dropbox"></SidebarLink>
      </StyledNav1>
      <StyledNav2 onClick={handleToggle}>
        <StyledNav2LinkContainer onClick={handlePreventToggle}>
          {currentRoute?.children && (
            <>
              {currentRoute?.name && (
                <StyledNav2Title>{currentRoute?.name}</StyledNav2Title>
              )}
              {currentRoute?.children.map((child) => (
                <SidebarLink
                  key={child.path}
                  href={child.path}
                  icon={child?.icon || currentRoute?.icon}
                >
                  {child.name}
                </SidebarLink>
              ))}
            </>
          )}
        </StyledNav2LinkContainer>
        <div tw="flex-1" />
        <div tw="py-12">
          <StyledToggleButtonContainer>
            <StyledToggleButton />
          </StyledToggleButtonContainer>
          <StyledStorageContainer onClick={handlePreventToggle}>
            <div tw="mb-4 flex gap-1 flex-wrap">
              {consumedSize.toFixed(3)} GB
              <span tw="opacity-60 font-normal">
                of {allowedSize.toFixed(3)}
              </span>
            </div>
            <StyledProgressBar $percent={storePercent} />
          </StyledStorageContainer>
        </div>
      </StyledNav2>
    </StyledSidebar>
  )
})
Sidebar.displayName = 'Sidebar'

export default Sidebar
