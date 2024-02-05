import { apiServer } from './constants'
import E_ from './errors'
import { BaseMessage, MessageType } from 'aleph-sdk-ts/dist/messages/types'

/**
 * Takes a string and returns a shortened version of it, with the first 6 and last 4 characters separated by '...'
 *
 * @param text A text to be shortened
 * @param start Number of chars to print from the begining
 * @param end Number of chars to print from the end
 * @returns A shortened text
 */
export const ellipseText = (text: string, start = 10, end = 0) => {
  if (text.length <= start) return text
  if (text.length <= end) return text
  return `${text.slice(0, start)}...${end > 0 ? text.slice(-end) : ''}`
}

/**
 * Takes a string and returns a shortened version of it, with the first 6 and last 4 characters separated by '...'
 *
 * @param address An address to be shortened
 * @returns A shortened address
 */
export const ellipseAddress = (address: string) => {
  return ellipseText(address, 6, 4)
}

/**
 * Get the Aleph balance for a given Ethereum address
 *
 * @param address An Ethereum address
 * returns The Aleph balance of the address
 */
export const getERC20Balance = async (address: string) => {
  try {
    const query = await fetch(
      `${apiServer}/api/v0/addresses/${address}/balance`,
    )

    // @note: 404 means the balance is 0, don't throw error in that case
    if (query.status === 404) return 0

    const { balance } = await query.json()
    return balance
  } catch (error) {
    throw E_.RequestFailed(error)
  }
}

/**
 * Gets the Aleph balance for a given Solana address
 *
 * @param address A Solana address
 * @returns The Aleph balance of the address
 */
export const getSOLBalance = async (address: string) => {
  // FIXME: This is a temporary solution
  try {
    const query = await fetch(
      `https://balance1.api.aleph.cloud/solana/${address}`,
    )

    const { balance } = await query.json()
    return balance
  } catch (error) {
    throw E_.RequestFailed(error)
  }
}

export function round(num: number, decimals = 2) {
  const pow = 10 ** decimals
  return Math.round((num + Number.EPSILON) * pow) / pow
}

export type ByteUnit =
  | 'B'
  | 'kB'
  | 'MB'
  | 'GB'
  | 'TB'
  | 'KiB'
  | 'MiB'
  | 'GiB'
  | 'TiB'

export type ConvertBitUnitOptions<D extends boolean> = {
  from: ByteUnit
  to: ByteUnit
  displayUnit?: D
}
type R<D> = D extends true ? string : number

export const byteUnits: Record<ByteUnit, number> = {
  // byte
  B: 1,
  // kilo
  kB: 10 ** 3,
  MB: 10 ** 6,
  GB: 10 ** 9,
  TB: 10 ** 12,
  // kibi
  KiB: 2 ** 10,
  MiB: 2 ** 20,
  GiB: 2 ** 30,
  TiB: 2 ** 40,
}

export const byteUnitSubfix: Record<ByteUnit, ByteUnit> = {
  B: 'B',
  kB: 'kB',
  MB: 'MB',
  GB: 'GB',
  TB: 'TB',
  // @note: It is wrong and confusing, I know....
  KiB: 'kB',
  MiB: 'MB',
  GiB: 'GB',
  TiB: 'TB',
}

export function convertByteUnits<D extends boolean = false>(
  value: number,
  {
    from = 'MiB',
    to = 'GiB',
    displayUnit = false as D,
  }: ConvertBitUnitOptions<D>,
): R<D> {
  const result = (value * byteUnits[from]) / byteUnits[to]

  return (
    displayUnit ? `${result.toFixed(2)} ${byteUnitSubfix[to]}` : result
  ) as R<D>
}

function getHumanReadableUnit(
  value: number,
  units: ByteUnit[] = ['B', 'KiB', 'MiB', 'GiB', 'TiB'],
): ByteUnit {
  let optimalUnit: ByteUnit = 'B'

  for (const unit of units) {
    if (value < byteUnits[unit]) break
    optimalUnit = unit
  }

  return optimalUnit
}

/**
 * Converts a number of bytes to a human readable size
 */
export function humanReadableSize(
  value?: number,
  from: ByteUnit = 'B',
): string {
  if (value === undefined) return 'n/a'
  if (value === 0) return '-'

  const bits = convertByteUnits(value, { from, to: 'B' })
  const to = getHumanReadableUnit(bits)
  return convertByteUnits(value, { from, to, displayUnit: true })
}

/**
 * Transforms a number into a multiple of 1000 with a suffix, (ex: 625217 -> 625.2K)
 */
export const humanReadableCurrency = (value?: number) => {
  if (value === undefined) return 'n/a'
  if (value === 0) return value
  if (value < 1_000) return value.toFixed(1)
  else if (value < 10 ** 6) return (value / 1_000).toFixed(1) + 'K'
  else if (value < 10 ** 9) return (value / 10 ** 6).toFixed(1) + 'M'
  else return (value / 10 ** 9).toFixed(1) + 'B'
}

const messageTypeWhitelist = new Set(...Object.values(MessageType))

/**
 * Returns a link to the Aleph explorer for a given message
 */
export const getExplorerURL = ({
  item_hash,
  chain,
  sender,
  type,
}: BaseMessage) => {
  type = messageTypeWhitelist.has(type) ? type : MessageType.post
  return `https://explorer.aleph.im/address/${chain}/${sender}/message/${type}/${item_hash}`
}

export const getDate = (time: number): string => {
  const [date, hour] = new Date(time * 1000).toISOString().split('T')
  const [hours] = hour.split('.')

  return `${date} ${hours}`
}

export const getETHExplorerURL = ({
  hash,
  address,
  tokenAddress,
}: {
  hash?: string
  address?: string
  tokenAddress?: string
}): string | undefined =>
  hash
    ? `https://etherscan.io/tx/${hash}`
    : address
    ? `https://etherscan.io/address/${address}`
    : tokenAddress
    ? `https://etherscan.io/token/0x27702a26126e0B3702af63Ee09aC4d1A084EF628?a=${tokenAddress}`
    : undefined

export const getAVAXExplorerURL = ({
  hash,
  address,
  tokenAddress,
}: {
  hash?: string
  address?: string
  tokenAddress?: string
}): string | undefined =>
  hash
    ? `https://subnets.avax.network/c-chain/tx/${hash}`
    : address
    ? `https://subnets.avax.network/c-chain/address/${address}`
    : tokenAddress
    ? `https://subnets.avax.network/c-chain/address/${tokenAddress}?tab=erc20`
    : undefined

export const getMultiaddressUrl = ({
  multiaddress,
}: {
  multiaddress?: string
}): string | undefined => {
  if (!multiaddress) return

  const [, ip] = multiaddress.match(/\/ip4\/(.+?)\//) || []
  if (!ip) return

  return `http://${ip}:4024`
}

/**
 * Converts a UNIX timestamp to an ISO date, or returns a default value if the timestamp is invalid
 *
 * @param timeStamp A UNIX timestamp
 * @param noDate A default value to return if the timestamp is invalid
 */
export const unixToISODateString = (timeStamp?: number, noDate = 'n/a') => {
  if (!timeStamp) return noDate
  const date = new Date(timeStamp * 1000)
  return date.toISOString().split('T')[0]
}

/**
 * Dirty hack (using a hidden link) to download a blob
 */
export const downloadBlob = (blob: Blob, fileName: string) => {
  const link = document.createElement('a')
  link.href = window.URL.createObjectURL(blob)
  link.download = fileName
  link.click()
}

/**
 * Converts a UNIX timestamp to an ISO date and time, or returns a default value if the timestamp is invalid
 *
 * @param timeStamp A UNIX timestamp
 * @param noDate A default value to return if the timestamp is invalid
 */
export const unixToISODateTimeString = (timeStamp?: number, noDate = 'n/a') => {
  if (!timeStamp) return noDate
  const date = new Date(timeStamp * 1000)
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeZoneName: 'short',
    timeStyle: 'short',
    timeZone: 'UTC',
  }).format(date)
}

/**
 * An util to create promises and control their lifecycle from other scope.
 * In other frameworks they usually call it "Deferred" too.
 *
 * Example:
 * ```ts
 * function sleep(ms) {
 *   const future = new Future()
 *   setTimeout(() => future.resolve(), ms)
 *   return future.promise
 * }
 *
 * async function main() {
 *   await sleep(1000)
 * }
 * ```
 */
export class Future<T> {
  public resolve!: (value: T | PromiseLike<T>) => void
  public reject!: (reason?: any) => void
  public promise!: Promise<T>

  constructor() {
    this.promise = new Promise<T>((_res, _rej) => {
      this.resolve = _res
      this.reject = _rej
    })
  }
}

/**
 * An util for controlling concurrency (lock / unlock) forcing sequential access
 * to some region of the code
 *
 * Example:
 * ```ts
 * // Waits for the lock to be free and returns the releaser function
 * const release = await mutex.acquire()
 *
 * try {
 *   // Execute the concurrent safe code here
 * } finally {
 *   // Release the lock.
 *   // Ensures that the lock is always released, even if there are errors
 *   release()
 * }
 * ```
 */
export class Mutex {
  protected queue = Promise.resolve()
  public count = 0

  async acquire(): Promise<() => void> {
    const release = new Future<void>()

    const currentQueue = this.queue
    this.queue = this.queue.then(() => release.promise)
    this.count++

    await currentQueue

    return () => {
      this.count--
      release.resolve()
    }
  }
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function toKebabCase(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_\\-]/g, '')
    .replace(/_/g, '-')
}

export function toSnakeCase(input: string): string {
  return toKebabCase(input).replace(/-/g, '_')
}

// ------------------------------------------
// ------------------------------------------

export function convertTimestamp(timestamp: number) {
  const a = new Date(timestamp * 1000)
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]
  const year = a.getFullYear()
  const month = months[a.getMonth()]
  const date = a.getDate()
  const hour = a.getHours()
  const min = a.getMinutes()
  const sec = a.getSeconds()
  const time =
    date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec
  return time
}

/**
 * Check if a value is null, undefined, empty string or empty array but not 0. Prevents false positive on 0 using !value
 *
 * @param {any} input
 * @returns true if value is null, undefined, empty string or empty array
 */
export function nullButNot0(input: any) {
  return (
    input === undefined || input === null || input === '' || input?.length > 0
  )
}

/**
 * Normalises a value between a min and max value, if floor and ceil are provided, it will return the floor or ceil if the value is outside the [min, max] interval
 *
 * @param {number} input
 * @param {number} min
 * @param {number} max
 * @param {number} floor
 * @param {number} ceil
 * @returns a number in the [min, max] interval
 */
export function normalizeValue(
  input: number,
  min: number,
  max: number,
  floor: number,
  ceil: number,
) {
  if (!input) return 0
  if (input > max) return 1
  if (input < min) return 0

  const normalized = (input - min) / (max - min)
  if (floor === undefined || ceil === undefined) return normalized
  if (normalized < min) return floor
  if (normalized > max) return ceil
  return normalized
}

/**
 * Fetches a URL and caches the result in LocalStorage for a given time
 *
 * @param {string} url The URL to fetch
 * @param {string} cacheKey The LocalStorage key to use for cachinng (must be unique)
 * @param {number} cacheTime The time in ms to cache the data
 * @returns
 */
export async function fetchAndCache<T = unknown, P = unknown>(
  url: string,
  cacheKey: string,
  cacheTime: number,
  parse?: (data: T) => P | Promise<P>,
): Promise<P> {
  const cached = localStorage.getItem(cacheKey)
  const now = Date.now()

  if (cached) {
    const { cachedAt, value } = JSON.parse(cached)
    if (now - cachedAt < cacheTime) {
      console.log(`Retrieved ${cacheKey} from cache`)
      return value
    }
  }

  try {
    const data = await fetch(url)
    let value = await data.json()

    if (parse) {
      value = await parse(value)
    }

    const toCache = JSON.stringify({
      cachedAt: now,
      value,
    })

    localStorage.setItem(cacheKey, toCache)

    return value
  } catch (error) {
    console.error(`Failed to fetch ${url}`, error)
    if (cached) return JSON.parse(cached).value
    throw error
  }
}

/**
 * Takes a list of github releases and returns the latest, the latest prerelease and a list of outdated versions
 *
 * @param {Array} payload A list of github releases, returned from the API (https://api.github.com/repos/[owner]/[name]/releases)
 * @param {Number} outdatedAfter The time in ms after which a release is considered outdated (defaults to 14 days)
 */
export function getLatestReleases(
  payload: any,
  outdatedAfter = 1000 * 60 * 60 * 24 * 14,
) {
  const versions = {
    latest: null,
    prerelease: null,
    outdated: null,
  }

  let latestReleaseDate = 0
  if (!payload) return versions

  for (const item of payload) {
    if (item.prerelease && !versions.prerelease) {
      versions.prerelease = item.tag_name
    }
    if (!item.prerelease && !versions.latest) {
      versions.latest = item.tag_name
      latestReleaseDate = new Date(item.published_at).getTime()
    }
    if (
      versions.latest &&
      versions.prerelease &&
      !versions.outdated &&
      !item.prerelease &&
      Date.now() - latestReleaseDate < outdatedAfter
    ) {
      versions.outdated = item.tag_name
    }
  }

  return versions
}

/**
 * Returns a list of issues that might explain why the node is not scored
 *
 */
export function diagnoseMetrics(metrics: any) {
  if (metrics.base_latency_ipv4 === undefined) {
    return [
      'Your CRN seems unreachable by our metrics. Is it up and running ? Did you configure the domain name correctly ?',
    ]
  }
  if (
    !metrics.base_latency ||
    !metrics.diagnostic_vm_latency ||
    !metrics.full_check_latency
  ) {
    return ['No IPv6 connectivity detected. Please check your configuration.']
  }

  const issues = []
  if (metrics.base_latency > 2) {
    issues.push('Base latency is too high (max 2 seconds)')
  }
  if (metrics.diagnostic_vm_latency > 2.5) {
    issues.push('Diagnostic VM latency is too high (max 2.5 seconds)')
  }
  if (metrics.full_check_latency > 100) {
    issues.push('Full check latency is too high (max 100 seconds)')
  }

  return issues
}

/**
 * Returns the time in ms until the next score message is issued
 * Takes a unix timestamp as input and returns a string
 */
export function timeUntilNextScoreMessage(metrics: any) {
  // ! Unix timestamp is in seconds
  const ONE_DAY = 60 * 60 * 24
  const offset = metrics.measured_at % ONE_DAY
  const nextMessage = ONE_DAY - offset

  if (nextMessage < 60 * 60 * 2) {
    return Math.floor(nextMessage / 60) + ' minutes'
  }

  return Math.round(nextMessage / 3600) + ' hours'
}

export function fileToImg(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.readAsDataURL(file)
    reader.addEventListener('error', reject)
    reader.addEventListener('load', () => {
      const img = new Image()
      img.src = reader.result as string

      resolve(img)
    })
  })
}
