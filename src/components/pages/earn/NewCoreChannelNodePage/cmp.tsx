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
import { useNewCoreChannelNodePage } from '@/hooks/pages/earn/useNewCoreChannelNodePage'
import InfoTooltipButton from '@/components/common/InfoTooltipButton'
import ExternalLinkButton from '@/components/common/ExternalLinkButton'
import ButtonLink from '@/components/common/ButtonLink'

export const NewCoreChannelNodePage = () => {
  const { nameCtrl, multiaddressCtrl, errors, handleSubmit } =
    useNewCoreChannelNodePage()

  return (
    <>
      <Head>
        <title>Aleph.im | Create CCN</title>
        <meta name="description" content="Aleph.im Create Core Channel Node" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <section>
        <h1 className="tp-h5" tw="mb-8">
          Create core node
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
            Set multiaddress
          </CompositeTitle>
          <p tw="mt-1 mb-6">
            The physical node as unique identifier called multiaddress. It links
            the wallet and interface to the physical node. Can be setup later on
            the info page of the node or at setup if the physical node is
            already running. This screen has a link to install procedure of the
            node as well.
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
                    <div className="tp-body2 fs-18">Multiaddress</div>
                    <div className="tp-body1 fs-18">Blabla</div>
                  </div>
                </div>
              }
            >
              <FormLabel
                label="Set multiaddress"
                error={multiaddressCtrl.fieldState.error}
              />
            </InfoTooltipButton>
            <TextInput
              {...multiaddressCtrl.field}
              {...multiaddressCtrl.fieldState}
              placeholder="Multiaddress (optional)"
            />
            <div tw="mt-2">
              <ExternalLinkButton
                href="https://docs.aleph.im/nodes/core/"
                size="regular"
              >
                How to create a node
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
            Create core node
          </Button>
          <ButtonLink size="regular" href="/earn/ccn">
            Cancel
          </ButtonLink>
        </section>
      </Form>
    </>
  )
}
NewCoreChannelNodePage.displayName = 'NewCoreChannelNodePage'

export default memo(NewCoreChannelNodePage)
