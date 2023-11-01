import { memo } from 'react'
import Head from 'next/head'

export const NewCoreChannelNodesPage = memo(() => {
  return (
    <>
      <Head>
        <title>Aleph.im | Account</title>
        <meta name="description" content="Aleph.im Account Dashboard" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <section>
        <h1 className="tp-h5" tw="mb-8">
          New core node
        </h1>
      </section>
    </>
  )
})
NewCoreChannelNodesPage.displayName = 'NewCoreChannelNodesPage'

export default NewCoreChannelNodesPage
