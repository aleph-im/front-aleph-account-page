import { useRouter } from 'next/router'
import {
  useCallback,
  useState,
  useEffect,
  useRef,
  RefObject,
  useMemo,
} from 'react'
import { DefaultTheme, useTheme } from 'styled-components'
import { Account } from 'aleph-sdk-ts/dist/accounts/account'
import { useAppState } from '@/contexts/appState'
import { ProviderEnum, useConnect } from '../common/useConnect'
import {
  BreakpointId,
  NetworkProps,
  useClickOutside,
  useFloatPosition,
  useTransition,
  useWindowScroll,
  useWindowSize,
  WalletPickerProps,
  WalletProps,
} from '@aleph-front/core'
import {
  UseBreadcrumbNamesReturn,
  useBreadcrumbNames,
} from '../common/useBreadcrumbNames'
import { UseRoutesReturn, useRoutes } from '../common/useRoutes'
import { useAccountRewards } from '../common/useRewards'
import { Chain } from 'aleph-sdk-ts/dist/messages/types'
import { useWalletConnect } from '@/contexts/walletConnect'

export function chainNameToEnum(chainName?: string): Chain {
  switch (chainName) {
    case 'Ethereum':
      return Chain.ETH
    case 'Avalanche':
      return Chain.AVAX
    case 'Solana':
      return Chain.SOL
    default:
      return Chain.ETH
  }
}

export function chainEnumToName(chain: Chain): string {
  switch (chain) {
    case Chain.ETH:
      return 'Ethereum'
    case Chain.AVAX:
      return 'Avalanche'
    case Chain.SOL:
      return 'Solana'
    default:
      return 'Ethereum'
  }
}

export type UseAccountButtonProps = {
  rewards?: WalletPickerProps['rewards']
  networks: NetworkProps['network'][]
  selectedNetwork: WalletPickerProps['selectedNetwork']
  handleSwitchNetwork: WalletPickerProps['onSwitchNetwork']
  handleConnect: (
    wallet?: WalletProps,
    network?: NetworkProps['network'],
  ) => Promise<void>
  handleDisconnect: () => void
}

export type UseAccountButtonReturn = UseAccountButtonProps & {
  theme: DefaultTheme
  account: Account | undefined
  accountBalance?: number
  displayWalletPicker: boolean
  walletPickerOpen: boolean
  walletPickerRef: RefObject<HTMLDivElement>
  walletPickerTriggerRef: RefObject<HTMLButtonElement>
  walletPosition: { x: number; y: number }
  handleDisplayWalletPicker: () => void
}

export function useAccountButton({
  handleConnect: handleConnectProp,
  ...rest
}: UseAccountButtonProps): UseAccountButtonReturn {
  const { account } = useConnect()
  const theme = useTheme()
  const [appState] = useAppState()

  const { balance: accountBalance } = appState.account

  const [displayWalletPicker, setDisplayWalletPicker] = useState(false)

  // --------------------

  const walletPickerRef = useRef<HTMLDivElement>(null)
  const walletPickerTriggerRef = useRef<HTMLButtonElement>(null)

  useClickOutside(() => {
    if (displayWalletPicker) setDisplayWalletPicker(false)
  }, [walletPickerRef, walletPickerTriggerRef])

  const handleDisplayWalletPicker = () => {
    setDisplayWalletPicker(!displayWalletPicker)
  }

  const windowSize = useWindowSize(0)
  const windowScroll = useWindowScroll(0)

  const { shouldMount, stage } = useTransition(displayWalletPicker, 250)

  const { myRef, atRef, position } = useFloatPosition({
    my: 'top-right',
    at: 'bottom-right',
    myRef: walletPickerRef,
    atRef: walletPickerTriggerRef,
    deps: [account, windowSize, windowScroll, shouldMount],
  })

  const walletPickerOpen = stage === 'enter'

  const handleConnect = useCallback(
    async (wallet?: WalletProps, network?: NetworkProps['network']) => {
      await handleConnectProp(wallet, network)
      setDisplayWalletPicker(false)
    },
    [handleConnectProp],
  )

  return {
    theme,
    account,
    accountBalance,
    walletPickerOpen,
    displayWalletPicker: shouldMount,
    walletPickerRef: myRef,
    walletPickerTriggerRef: atRef,
    walletPosition: position,
    handleDisplayWalletPicker,
    handleConnect,
    ...rest,
  }
}

// -----------------------------

export type UseHeaderReturn = UseRoutesReturn & {
  networks: NetworkProps['network'][]
  pathname: string
  breadcrumbNames: UseBreadcrumbNamesReturn['names']
  breakpoint: BreakpointId
  isOpen: boolean
  rewards?: WalletPickerProps['rewards']
  selectedNetwork: WalletPickerProps['selectedNetwork']
  handleSwitchNetwork: WalletPickerProps['onSwitchNetwork']
  handleToggle: (isOpen: boolean) => void
  handleConnect: (
    wallet?: WalletProps,
    network?: NetworkProps['network'],
  ) => Promise<void>
  handleDisconnect: () => void
  provider: () => void
}

export function useHeader(): UseHeaderReturn {
  const {
    connect,
    onSessionConnect,
    account,
    disconnect,
    isConnected,
    selectedNetwork: selectedNetworkChain,
    switchNetwork: switchNetworkChain,
    currentProvider
  } = useConnect()
  const walletConnect = useWalletConnect()
  
  const { routes } = useRoutes()
  const router = useRouter()
  const { pathname } = router

  // @note: wait till account is connected and redirect
  const handleConnect = useCallback(
    async (wallet?: WalletProps, network?: NetworkProps['network']) => {
      console.log('handleConnect', wallet, network)
      if (!isConnected && (wallet || network)) {
        const provider =
          wallet && wallet.provider ? wallet.provider() : window.ethereum
        const acc = await connect(chainNameToEnum(network?.name), provider)
        if (!acc) return
        // router.push('/')
      } else {
        await disconnect()
        router.push('/')
      }
    },
    [connect, disconnect, isConnected, router],
  )

  const provider = useCallback(() => {
    ;(window.ethereum as any)?.on('accountsChanged', function () {
      connect()
    })

    return window.ethereum
  }, [connect])

  // auto-login metamask

  const enableConnection = useCallback(async () => {
    if (currentProvider === ProviderEnum.Metamask && !account && !isConnected) {
      await onSessionConnect(selectedNetworkChain, window.ethereum)
    }
  }, [currentProvider, onSessionConnect, isConnected, account])

  useEffect(() => {
    provider()
    enableConnection()
    return () => {
      ;(window.ethereum as any)?.removeListener('accountsChanged', () => {
        disconnect()
      })
    }
  }, [])

  // --------------------

  const { names: breadcrumbNames } = useBreadcrumbNames()

  // --------------------

  const breakpoint = 'lg'

  // --------------------

  const [isOpen, setIsOpen] = useState(false)
  const handleToggle = useCallback((open: boolean) => setIsOpen(open), [])
  const handleDisconnect = useCallback(() => null, [])

  // --------------------

  const networks: NetworkProps['network'][] = useMemo(
    () => [
      {
        icon: 'ethereum',
        name: 'Ethereum',
        wallets: [
          {
            color: 'orange',
            icon: 'metamask',
            name: 'Metamask',
            provider,
          },
          {
            color: 'blue',
            icon: 'walletConnect',
            name: 'Wallet Connect',
            provider: () => walletConnect,
          },
        ],
      },
    ],
    [provider, walletConnect],
  )

  const handleSwitchNetwork = useCallback(
    (network: NetworkProps['network']) => {
      const chain = chainNameToEnum(network.name)
      switchNetworkChain(chain)
    },
    [switchNetworkChain],
  )

  const selectedNetwork = useMemo(() => {
    const name = chainEnumToName(selectedNetworkChain)
    return networks.find((network) => network.name === name)
  }, [networks, selectedNetworkChain])

  // -----------------------

  const {
    calculatedRewards: userRewards,
    distributionTimestamp: lastDistribution,
  } = useAccountRewards({
    address: account?.address || '',
  })

  const distributionInterval = 10 * 24 * 60 * 60 * 1000 // 10 days

  const pendingDays = useMemo(() => {
    if (lastDistribution === undefined) return distributionInterval

    const elapsedFromLast = Date.now() - lastDistribution
    const timeTillNext = distributionInterval - elapsedFromLast

    const pendingTime = Math.max(Math.ceil(timeTillNext), 0)
    const pendingDays = Math.ceil(pendingTime / (1000 * 60 * 60 * 24))

    return pendingDays
  }, [lastDistribution, distributionInterval])

  const rewards = useMemo(() => {
    if (!userRewards) return

    return {
      amount: userRewards,
      days: pendingDays,
    }
  }, [pendingDays, userRewards])

  return {
    networks,
    pathname,
    routes,
    breadcrumbNames,
    breakpoint,
    isOpen,
    rewards,
    selectedNetwork,
    handleSwitchNetwork,
    handleToggle,
    handleConnect,
    handleDisconnect,
    provider,
  }
}
