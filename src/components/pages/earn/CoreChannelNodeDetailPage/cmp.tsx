import { memo } from 'react'
import Head from 'next/head'

export const CoreChannelNodeDetailPage = () => {
  return (
    <>
      <Head>
        <title>Aleph.im | CCN Detail</title>
        <meta name="description" content="Aleph.im Compute Resource Node" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <section>
        <h1 className="tp-h5" tw="mb-8">
          CCN Detail
        </h1>
      </section>
    </>
  )
}
CoreChannelNodeDetailPage.displayName = 'CoreChannelNodeDetailPage'

export default memo(CoreChannelNodeDetailPage)
