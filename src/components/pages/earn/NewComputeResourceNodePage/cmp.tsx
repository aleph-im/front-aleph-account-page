import { memo } from 'react'
import Head from 'next/head'

export const NewComputeResourceNodePage = () => {
  return (
    <>
      <Head>
        <title>Aleph.im | Account</title>
        <meta name="description" content="Aleph.im Account Dashboard" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <section>
        <h1 className="tp-h5" tw="mb-8">
          New compute node
        </h1>
      </section>
    </>
  )
}
NewComputeResourceNodePage.displayName = 'NewComputeResourceNodePage'

export default memo(NewComputeResourceNodePage)
