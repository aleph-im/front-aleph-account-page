import { Account } from 'aleph-sdk-ts/dist/accounts/account'
import { messages } from 'aleph-sdk-ts'
import { MessageType, StoreMessage } from 'aleph-sdk-ts/dist/messages/types'
import { apiServer, channel, defaultAccountChannel } from '@/helpers/constants'
import { store } from 'aleph-sdk-ts/dist/messages'

const { any } = messages

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
    })

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

    const items = await any.GetMessages({
      messageType: MessageType.store,
      addresses: [address],
      pagination: 1000,
      APIServer: apiServer,
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

  async uploadFile(fileObject: File): Promise<string> {
    if (!this.account) throw new Error('Invalid account')

    // @note: Quick temporal fix to upload files
    const buffer = Buffer.from(await fileObject.arrayBuffer())

    const message = await store.Publish({
      account: this.account,
      channel,
      APIServer: apiServer,
      fileObject: buffer,
    })

    return message.content.item_hash
  }
}
