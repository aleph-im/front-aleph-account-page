import { memo } from 'react'
import Head from 'next/head'

export const ComputeResourceNodeDetailPage = () => {
  return (
    <>
      <Head>
        <title>Aleph.im | CRN Detail</title>
        <meta name="description" content="Aleph.im Compute Resource Node" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <section>
        <h1 className="tp-h5" tw="mb-8">
          CRN Detail
        </h1>
      </section>
    </>
  )
}
ComputeResourceNodeDetailPage.displayName = 'ComputeResourceNodeDetailPage'

export default memo(ComputeResourceNodeDetailPage)
