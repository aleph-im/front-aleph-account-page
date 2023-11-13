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
import { Icon, IconName, NotificationBadge } from '@aleph-front/aleph-core'
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
} from './styles'
import { useUserStoreAllowance } from '@/hooks/common/useUserStoreAllowance'
import { useNodeIssues } from '@/hooks/common/useNodeIssues'
import { useUserStakeNodes } from '@/hooks/common/useUserStakeNodes'
import { useAppState } from '@/contexts/appState'
import { useUserNodes } from '@/hooks/common/useUserNodes'

export type Route = {
  name?: string
  path: string
  icon?: IconName
  flag?: number
  children?: Route[]
}

export type SidebarLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string
  icon?: IconName
  flag?: number
  isOpen?: boolean
  children?: ReactNode
}

const SidebarLink = memo(
  ({ href, icon, children, isOpen, flag, ...rest }: SidebarLinkProps) => {
    const router = useRouter()
    const isActive = router.pathname.indexOf(href) >= 0

    const props = { href, $isActive: isActive, $isOpen: isOpen, ...rest }

    const iconCmp = useMemo(
      () =>
        icon && (
          <Icon tw="p-1" {...{ name: icon, size: 'lg', prefix: 'custom' }} />
        ),
      [icon],
    )

    return !children ? (
      <StyledNav1Link {...props}>{iconCmp}</StyledNav1Link>
    ) : (
      <StyledNav2Link {...props}>
        {iconCmp}
        <span>{children}</span>
        {flag && <NotificationBadge>{flag}</NotificationBadge>}
      </StyledNav2Link>
    )
  },
)
SidebarLink.displayName = 'SidebarLink'

const Sidebar = memo(() => {
  const [state] = useAppState()
  const { entities: nodes } = state.ccns
  const { entities: crns } = state.crns

  const { stakeNodes } = useUserStakeNodes({ nodes })
  const { userNodes: userCCNs } = useUserNodes({ nodes })
  const { userNodes: userCRNs } = useUserNodes({ nodes: crns })

  const { warningFlag: stakeNodesWarningFlag } = useNodeIssues({
    nodes: stakeNodes,
  })

  const { warningFlag: userCCNsWarningFlag } = useNodeIssues({
    nodes: userCCNs,
  })

  const { warningFlag: userCRNsWarningFlag } = useNodeIssues({
    nodes: userCRNs,
  })

  // -------------------------------------------

  const [open, setOpen] = useState<boolean | undefined>(undefined)

  const handleToggle = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation()
      const tagName = e.currentTarget.tagName

      setOpen((prev) => {
        const isOpen = prev === undefined || !!prev
        if (isOpen && tagName.toLowerCase() !== 'svg') return prev
        return !isOpen
      })
    },
    [setOpen],
  )

  const handlePreventToggle = useCallback((e: MouseEvent) => {
    e.stopPropagation()
  }, [])

  // -----------------------------------

  const routes: Route[] = useMemo(() => {
    return [
      {
        name: 'EARN',
        path: '/earn',
        icon: 'earn',
        children: [
          {
            name: 'Staking',
            path: '/earn/staking',
            icon: 'earn',
            flag: stakeNodesWarningFlag,
          },
          {
            name: 'Core nodes',
            path: '/earn/ccn',
            icon: 'ccn',
            flag: userCCNsWarningFlag,
          },
          {
            name: 'Compute nodes',
            path: '/earn/crn',
            icon: 'crn',
            flag: userCRNsWarningFlag,
          },
        ],
      },
      {
        name: 'PROFILE',
        path: '/profile',
        icon: 'profile',
        children: [
          {
            name: 'My profile',
            path: '/profile',
            icon: 'profile',
          },
          {
            name: 'Notification center',
            path: '/notification',
            icon: 'notification',
          },
        ],
      },
    ]
  }, [stakeNodesWarningFlag, userCCNsWarningFlag, userCRNsWarningFlag])

  const router = useRouter()

  const currentRoute = useMemo(
    () => routes.find((route) => router.pathname.indexOf(route.path) === 0),
    [router, routes],
  )

  // --------------------------------------------

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
        <SidebarLink
          icon="console"
          href="https://console.aleph.im/"
          target="_blank"
        />
        <SidebarLink
          icon="explore"
          href="https://explorer.aleph.im/"
          target="_blank"
        />
        <SidebarLink
          icon="swap"
          href="https://swap.aleph.im/"
          target="_blank"
        />
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
                  flag={child?.flag || currentRoute?.flag}
                >
                  {child.name}
                </SidebarLink>
              ))}
            </>
          )}
        </StyledNav2LinkContainer>
        <div tw="flex-1" />
        <div tw="py-12 flex flex-col justify-between h-[14.9375rem]">
          <div tw="px-6">
            <StyledToggleButton onClick={handleToggle} />
          </div>
          <StyledStorageContainer onClick={handlePreventToggle}>
            <div tw="mb-4 flex gap-1 flex-wrap">
              <span tw="whitespace-nowrap">{consumedSize.toFixed(3)} GB</span>
              <span tw="opacity-60 font-normal whitespace-nowrap">
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
