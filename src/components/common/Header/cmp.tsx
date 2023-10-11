import {
  Button,
  Icon,
  NavbarLink,
  NavbarLinkList,
  WalletPicker,
} from '@aleph-front/aleph-core'
import { StyledHeader, StyledButton } from './styles'
import { ellipseAddress } from '@/helpers/utils'
import { useHeader } from '@/hooks/pages/useHeader'
import { breadcrumbNames } from '@/helpers/constants'
import AutoBreadcrumb from '@/components/common/AutoBreadcrumb/cmp'

export const Header = () => {
  const {
    theme,
    account,
    displayWalletPicker,
    accountBalance,
    hasBreadcrumb,
    provider,
    divRef,
    handleConnect,
    handleDisplayWalletPicker,
  } = useHeader()

  return (
    <StyledHeader>
      {hasBreadcrumb && <AutoBreadcrumb names={breadcrumbNames} />}

      <NavbarLinkList onlyDesktop>
        <NavbarLink>
          <StyledButton key="link" forwardedAs="button" disabled>
            <Icon name="ethereum" />
          </StyledButton>
        </NavbarLink>
        <div tw="relative">
          <NavbarLink>
            {account ? (
              <Button
                as="button"
                variant="secondary"
                color="main1"
                kind="neon"
                size="regular"
                onClick={handleDisplayWalletPicker}
              >
                {ellipseAddress(account.address)}{' '}
                <Icon
                  name="meteor"
                  size="lg"
                  tw="ml-2.5"
                  color={theme.color.main1}
                />
              </Button>
            ) : (
              <Button
                as="button"
                variant="tertiary"
                color="main0"
                kind="neon"
                size="regular"
                onClick={handleDisplayWalletPicker}
              >
                Connect{' '}
                <Icon
                  name="meteor"
                  size="lg"
                  tw="ml-2.5"
                  color={theme.color.main0}
                />
              </Button>
            )}
            <div tw="absolute right-0 mt-10" ref={divRef}>
              {displayWalletPicker && (
                <WalletPicker
                  networks={[
                    {
                      icon: 'ethereum',
                      name: 'Ethereum',
                      wallets: [
                        {
                          color: 'orange',
                          icon: 'circle',
                          name: 'Metamask',
                          provider,
                        },
                      ],
                    },
                  ]}
                  onConnect={handleConnect}
                  onDisconnect={handleConnect}
                  address={account?.address}
                  addressHref={`https://etherscan.io/address/${account?.address}`}
                  balance={accountBalance}
                  size="regular"
                />
              )}
            </div>
          </NavbarLink>
        </div>
      </NavbarLinkList>
    </StyledHeader>
  )
}

export default Header
