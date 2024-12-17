import { Account } from '@aleph-sdk/account'
import { apiServer, channel, defaultAccountChannel } from '@/helpers/constants'
import { ItemType, MessageType, StoreMessage } from '@aleph-sdk/message'
import {
  AlephHttpClient,
  AuthenticatedAlephHttpClient,
} from '@aleph-sdk/client'

export type FileObject = {
  created: string
  file_hash: string
  item_hash: string
  size: number
  type: 'file'
}

export type FilesInfo<
  F extends StoreMessage | FileObject = StoreMessage | FileObject,
> = {
  files: F[]
  totalSize: number
}

export class FileManager {
  constructor(
    protected account?: Account,
    protected channel = defaultAccountChannel,
    protected sdkClient:
      | AlephHttpClient
      | AuthenticatedAlephHttpClient = !account
      ? new AlephHttpClient(apiServer)
      : new AuthenticatedAlephHttpClient(account, apiServer),
  ) {}

  async getFiles(): Promise<FilesInfo<StoreMessage> | undefined> {
    const [messages, objects] = await Promise.all([
      this.getFileMessages(),
      this.getFileObjects(),
    ])

    let totalSize = objects?.totalSize || messages?.totalSize
    if (totalSize === undefined) return

    const oFiles = objects?.files || []
    const entries = oFiles.map((file) => [file.item_hash, file]) as [
      string,
      FileObject,
    ][]
    const objsMap = new Map<string, FileObject>(entries)

    const mFiles = messages?.files || []
    const files = [...mFiles].map((file) => {
      const newFile = { ...file }
      newFile.content.size = objsMap.get(file.item_hash)?.size || 0
      return newFile
    }) as StoreMessage[]

    totalSize =
      files.reduce((ac, cv) => ac + (cv?.content?.size || 0), 0) / 1024 ** 2

    return {
      files,
      totalSize,
    }
  }

  protected async getFileMessages(): Promise<
    FilesInfo<StoreMessage> | undefined
  > {
    if (!this.account) return

    const { address } = this.account

    const items = await this.sdkClient.getMessages({
      messageTypes: [MessageType.store],
      addresses: [address],
      pagination: 1000,
    })

    const files = (items?.messages || []) as StoreMessage[]
    const totalSize = files.reduce((ac, cv) => ac + (cv?.content?.size || 0), 0)

    return {
      files,
      totalSize,
    }
  }

  protected async getFileObjects(): Promise<FilesInfo<FileObject> | undefined> {
    if (!this.account) return

    const { address } = this.account

    try {
      // Postgres API
      const res = await fetch(
        `${apiServer}/api/v0/addresses/${address}/files?pagination=1000`,
      )

      const content = await res.json()
      const totalSize = content.total_size / 1024 ** 2
      const files = content.files

      return { files, totalSize }
    } catch (error) {
      console.log('Files API is not yet implemented on the node')
    }
  }

  async uploadFile(
    fileObject: File,
  ): Promise<{ contentItemHash: string; messageItemHash: string }> {
    if (!(this.sdkClient instanceof AuthenticatedAlephHttpClient))
      throw new Error('Account needed to perform this action')

    // @note: Quick temporal fix to upload files
    const buffer = Buffer.from(await fileObject.arrayBuffer())

    const message = await this.sdkClient.createStore({
      channel,
      fileObject: buffer,
      storageEngine: ItemType.ipfs,
      metadata: {
        name: fileObject.name,
        format: fileObject.type,
      },
    })

    return {
      contentItemHash: message.content.item_hash,
      messageItemHash: message.item_hash,
    }
  }

  async downloadFile(fileHash: string): Promise<File> {
    const file = await this.sdkClient.downloadFile(fileHash)

    return new File([file], fileHash)
  }
}
