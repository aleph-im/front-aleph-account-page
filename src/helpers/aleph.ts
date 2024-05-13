import { Blockchain } from '@aleph-sdk/core'

import { Account } from '@aleph-sdk/account'
import { getAccountFromProvider as getETHAccount } from '@aleph-sdk/ethereum'
import { getAccountFromProvider as getSOLAccount } from '@aleph-sdk/solana'

import { getERC20Balance, getSOLBalance } from './utils'
import Err from './errors'

/**
 * Connects to a web3 provider and returns an Aleph account object
 *
 * @param chain The chain to connect to
 * @param provider A web3 provider (ex: window.ethereum)
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const web3Connect = (
  chain: Blockchain,
  provider: any,
): Promise<Account> => {
  switch (chain) {
    case Blockchain.ETH:
      return getETHAccount(provider)

    case Blockchain.SOL:
      return getSOLAccount(provider)

    default:
      throw Err.ChainNotYetSupported
  }
}

/**
 * Returns the Aleph token balance of an account using the default RPC method for the chain
 *
 * @param account An Aleph account object
 * @returns The Aleph balance of the account
 */
export const getAccountBalance = async (account: Account): Promise<number> => {
  switch (account.getChain()) {
    case Blockchain.ETH:
      return getERC20Balance(account.address)

    case Blockchain.SOL:
      return getSOLBalance(account.address)

    default:
      throw Err.ChainNotYetSupported
  }
}
