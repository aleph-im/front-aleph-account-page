import { BaseConnectionProviderManager, ProviderId } from './base'
import { MetamaskConnectionProviderManager } from './metamask'
import { WalletConnectConnectionProviderManager } from './walletConnect'

export class ConnectionProviderManager {
  constructor(
    private providers: Record<string, BaseConnectionProviderManager> = {
      [ProviderId.Metamask]: new MetamaskConnectionProviderManager(),
      [ProviderId.WalletConnect]: new WalletConnectConnectionProviderManager(),
    },
  ) {}

  public of(providerId: ProviderId): BaseConnectionProviderManager {
    return this.providers[providerId]
  }
}

// @todo: move to global state
export const connectionProviderManager = new ConnectionProviderManager()
