import { Account } from '@aleph-sdk/account'
import {
  AlephHttpClient,
  AuthenticatedAlephHttpClient,
} from '@aleph-sdk/client'
import Err from '../helpers/errors'
import { apiServer, defaultAccountChannel } from '@/helpers/constants'

export class MessageManager {
  constructor(
    protected account: Account,
    protected channel = defaultAccountChannel,
    protected sdkClient:
      | AlephHttpClient
      | AuthenticatedAlephHttpClient = !account
      ? new AlephHttpClient(apiServer)
      : new AuthenticatedAlephHttpClient(account, apiServer),
  ) {}

  /**
   * Returns an aleph program message for a given hash
   */
  async get(hash: string) {
    try {
      const msg = await this.sdkClient.getMessage(hash)

      return msg
    } catch (error) {
      throw Err.RequestFailed(error)
    }
  }

  /**
   * Deletes a VM using a forget message
   */
  async del(message: any) {
    try {
      if (!(this.sdkClient instanceof AuthenticatedAlephHttpClient))
        throw Err.InvalidAccount

      const msg = await this.sdkClient.forget({
        hashes: [message.item_hash],
        channel: message.channel,
      })

      return msg
    } catch (err) {
      throw Err.RequestFailed(err)
    }
  }
}
