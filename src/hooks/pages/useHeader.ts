import { useRouter } from 'next/router'
import { useCallback, useState, useRef, RefObject, useMemo } from 'react'
import { Account } from '@aleph-sdk/account'
import { useAppState } from '@/contexts/appState'
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
import { useConnection } from '../common/useConnection'
import { BlockchainId, ProviderId, blockchains } from '@/domain/connect/base'

export type UseAccountButtonProps = Pick<
  UseHeaderReturn,
  | 'rewards'
  | 'rewards'
  | 'networks'
  | 'selectedNetwork'
  | 'handleSwitchNetwork'
  | 'handleConnect'
  | 'handleDisconnect'
>

export type UseAccountButtonReturn = UseAccountButtonProps &
  Pick<
    UseHeaderReturn,
    'handleSwitchNetwork' | 'handleConnect' | 'handleDisconnect'
  > & {
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
  handleDisconnect: handleDisconnectProp,
  ...rest
}: UseAccountButtonProps): UseAccountButtonReturn {
  const [state] = useAppState()
  const { balance: accountBalance, account } = state.connection

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
    (wallet: WalletProps, network: NetworkProps['network']) => {
      handleConnectProp(wallet, network)
      setDisplayWalletPicker(false)
    },
    [handleConnectProp],
  )

  const handleDisconnect = useCallback(() => {
    handleDisconnectProp()
    setDisplayWalletPicker(false)
  }, [handleDisconnectProp])

  return {
    account,
    accountBalance,
    walletPickerOpen,
    displayWalletPicker: shouldMount,
    walletPickerRef: myRef,
    walletPickerTriggerRef: atRef,
    walletPosition: position,
    handleDisplayWalletPicker,
    handleConnect,
    handleDisconnect,
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
  handleConnect: (wallet: WalletProps, network: NetworkProps['network']) => void
  handleDisconnect: () => void
}

export function useHeader(): UseHeaderReturn {
  const [state] = useAppState()
  const { account, provider, blockchain } = state.connection

  const { handleConnect: connect, handleDisconnect: disconnect } =
    useConnection({ triggerOnMount: true })

  const { routes } = useRoutes()
  const router = useRouter()
  const { pathname } = router

  // --------------------

  const { names: breadcrumbNames } = useBreadcrumbNames()

  // --------------------

  const breakpoint = 'lg'

  // --------------------

  const [isOpen, setIsOpen] = useState(false)

  const handleToggle = useCallback((open: boolean) => setIsOpen(open), [])

  // --------------------

  const wallets: WalletProps[] = useMemo(
    () => [
      {
        id: ProviderId.Metamask,
        name: 'Metamask',
        icon: 'metamask',
        color: 'orange',
      },
      {
        id: ProviderId.WalletConnect,
        name: 'Wallet Connect',
        icon: 'walletConnect',
        color: 'main0',
      },
    ],
    [],
  )

  const networks: NetworkProps['network'][] = useMemo(
    () => [
      {
        id: BlockchainId.ETH,
        icon: 'ethereum',
        name: 'Ethereum',
        wallets,
      },
      {
        id: BlockchainId.AVAX,
        icon: 'avalanche',
        name: 'Avalanche',
        wallets,
      },
    ],
    [wallets],
  )

  // --------------------

  const handleConnect = useCallback(
    async (wallet: WalletProps, network: NetworkProps['network']) => {
      const provider = (wallet as any).id as ProviderId
      const blockchain = (network as any).id as BlockchainId
      connect({ provider, blockchain })
    },
    [connect],
  )

  const handleSwitchNetwork = useCallback(
    (network: NetworkProps['network']) => {
      const blockchain = (network as any).id as BlockchainId
      connect({ provider, blockchain })
    },
    [connect, provider],
  )

  const handleDisconnect = useCallback(async () => {
    disconnect()
  }, [disconnect])

  const selectedNetwork = useMemo(() => {
    if (!blockchain) return

    const name = blockchains[blockchain].name
    return networks.find((network) => network.name === name)
  }, [networks, blockchain])

  // -----------------------

  const {
    calculatedRewards: userRewards,
    distributionTimestamp: lastDistribution,
  } = useAccountRewards({
    address: account?.address || '',
  })

  const pendingDays = useMemo(() => {
    const distributionInterval = 10 * 24 * 60 * 60 * 1000 // 10 days

    if (lastDistribution === undefined) {
      const pendingDays = Math.ceil(
        distributionInterval / (1000 * 60 * 60 * 24),
      )
      return pendingDays
    }

    const elapsedFromLast = Date.now() - lastDistribution
    const timeTillNext = distributionInterval - elapsedFromLast

    const pendingTime = Math.max(Math.ceil(timeTillNext), 0)
    const pendingDays = Math.ceil(pendingTime / (1000 * 60 * 60 * 24))

    return pendingDays
  }, [lastDistribution])

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
  }
}
