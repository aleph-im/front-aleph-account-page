import { memo } from 'react'
import Link from 'next/link'
import { AccountPicker, RenderLinkProps } from '@aleph-front/core'
import { StyledNavbarDesktop, StyledNavbarMobile, StyledHeader } from './styles'
import { useHeader } from '@/hooks/pages/useHeader'
import AutoBreadcrumb from '@/components/common/AutoBreadcrumb'
import { blockchains } from '@/domain/connect/base'
import { useEnsNameLookup } from '@/hooks/common/useENSLookup'

const CustomLink = (props: RenderLinkProps) => {
  return props.route.children ? <span {...props} /> : <Link {...props} />
}

// ----------------------------

export const Header = () => {
  const {
    pathname,
    routes,
    breadcrumbNames,
    isOpen,
    breakpoint,
    networks,
    accountAddress,
    accountBalance,
    rewards,
    selectedNetwork,
    handleToggle,
    handleConnect,
    handleDisconnect,
    handleSwitchNetwork,
  } = useHeader()

  const ensName = useEnsNameLookup(accountAddress)

  return (
    <>
      <StyledHeader $breakpoint={breakpoint}>
        <StyledNavbarMobile
          {...{
            routes,
            pathname,
            open: isOpen,
            onToggle: handleToggle,
            Link: CustomLinkMemo,
            height: '6.5rem',
            breakpoint: 'lg',
            mobileTopContent: (
              <AccountPicker
                isMobile
                accountAddress={accountAddress}
                accountBalance={accountBalance}
                blockchains={blockchains}
                networks={networks}
                selectedNetwork={selectedNetwork}
                rewards={rewards}
                ensName={ensName}
                handleConnect={handleConnect}
                handleDisconnect={handleDisconnect}
                handleSwitchNetwork={handleSwitchNetwork}
              />
            ),
          }}
        />
        <StyledNavbarDesktop $breakpoint={breakpoint}>
          <AutoBreadcrumb names={breadcrumbNames} />
          <AccountPicker
            accountAddress={accountAddress}
            accountBalance={accountBalance}
            blockchains={blockchains}
            networks={networks}
            selectedNetwork={selectedNetwork}
            rewards={rewards}
            ensName={ensName}
            handleConnect={handleConnect}
            handleDisconnect={handleDisconnect}
            handleSwitchNetwork={handleSwitchNetwork}
          />
        </StyledNavbarDesktop>
      </StyledHeader>
      <div tw="block flex-auto grow-0 shrink-0 h-[6.5rem] lg:hidden"></div>
      <div tw="block lg:hidden my-6 px-5 md:px-16">
        <AutoBreadcrumb names={breadcrumbNames} />
      </div>
    </>
  )
}
Header.displayName = 'Header'

export const CustomLinkMemo = memo(CustomLink)
export default memo(Header)
