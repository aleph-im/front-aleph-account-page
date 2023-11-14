import { memo } from 'react'
import Head from 'next/head'
import Form from '@/components/form/Form'
import {
  Button,
  CompositeTitle,
  FormLabel,
  NoisyContainer,
  TextInput,
} from '@aleph-front/aleph-core'
import { useNewComputeResourceNodePage } from '@/hooks/pages/earn/useNewComputeResourceNodePage'
import InfoTooltipButton from '@/components/common/InfoTooltipButton'
import ExternalLinkButton from '@/components/common/ExternalLinkButton'
import ButtonLink from '@/components/common/ButtonLink'

export const NewComputeResourceNodePage = () => {
  const { nameCtrl, addressCtrl, errors, handleSubmit } =
    useNewComputeResourceNodePage()

  return (
    <>
      <Head>
        <title>Aleph.im | Create CRN</title>
        <meta
          name="description"
          content="Aleph.im Create Compute Resource Node"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <section>
        <h1 className="tp-h5" tw="mb-8">
          Create compute resource node
        </h1>
      </section>
      <Form onSubmit={handleSubmit} errors={errors} tw="max-w-[44.6875rem]">
        <section tw="px-0 pb-6 md:pb-10">
          <CompositeTitle as="h2" number="1">
            Set a name
          </CompositeTitle>
          <p tw="mt-1 mb-6">Your node name should be short and meaningful.</p>
          <NoisyContainer>
            <InfoTooltipButton
              plain
              my="bottom-left"
              at="bottom-right"
              vAlign="top"
              tooltipContent={
                <div tw="text-left">
                  <div>
                    <div className="tp-body2 fs-18">Name</div>
                    <div className="tp-body1 fs-18">Blabla</div>
                  </div>
                </div>
              }
            >
              <FormLabel
                label="Node name"
                error={nameCtrl.fieldState.error}
                required
              />
            </InfoTooltipButton>
            <TextInput
              {...nameCtrl.field}
              {...nameCtrl.fieldState}
              required
              placeholder="Give it a name"
            />
            <p tw="mt-4">
              You can change this later if you want, even add a picture and
              desctiption.
            </p>
          </NoisyContainer>
        </section>
        <section tw="px-0 py-6 md:py-10">
          <CompositeTitle as="h2" number="2">
            Set address
          </CompositeTitle>
          <p tw="mt-1 mb-6">
            Lorem ipsum dolor sit amet consectetur. Nibh metus posuere sed
            ultrices consectetur. Id sem facilisis et aliquet a.
          </p>
          <NoisyContainer>
            <InfoTooltipButton
              plain
              my="bottom-left"
              at="bottom-right"
              vAlign="top"
              tooltipContent={
                <div tw="text-left">
                  <div>
                    <div className="tp-body2 fs-18">Address</div>
                    <div className="tp-body1 fs-18">Blabla</div>
                  </div>
                </div>
              }
            >
              <FormLabel
                label="Set address"
                error={addressCtrl.fieldState.error}
              />
            </InfoTooltipButton>
            <TextInput
              {...addressCtrl.field}
              {...addressCtrl.fieldState}
              placeholder="https://my-domain.tld/"
            />
            <div tw="mt-2">
              <ExternalLinkButton
                href="https://docs.aleph.im/nodes/compute/"
                size="regular"
              >
                How to install your node and retrieve your address
              </ExternalLinkButton>
            </div>
          </NoisyContainer>
        </section>
        <section tw="flex gap-10">
          <Button
            color="main0"
            kind="neon"
            variant="primary"
            size="regular"
            type="submit"
          >
            Register compute node
          </Button>
          <ButtonLink size="regular" href="/earn/crn">
            Cancel
          </ButtonLink>
        </section>
      </Form>
    </>
  )
}
NewComputeResourceNodePage.displayName = 'NewComputeResourceNodePage'

export default memo(NewComputeResourceNodePage)
