import { memo } from 'react'
import Head from 'next/head'
import NodeDetailHeader from '@/components/common/NodeDetailHeader'
import { useComputeResourceNodeDetailPage } from '@/hooks/pages/earn/useComputeResourceNodeDetailPage'
import Card2 from '@/components/common/Card2'
import { Card2Field } from '@/components/common/Card2/cmp'
import ColumnLayout from '@/components/common/ColumnLayout'
import { Button, Icon, Logo } from '@aleph-front/aleph-core'
import { ellipseAddress, getETHExplorerURL } from '@/helpers/utils'
import NodeDetailStatus from '@/components/common/NodeDetailStatus'
import Link from 'next/link'
import NodeName from '@/components/common/NodeName'
import NodeDecentralization from '@/components/common/NodeDecentralization'
import SpinnerOverlay from '@/components/common/SpinnerOverlay'
import NodeDetailEditableField from '@/components/common/NodeDetailEditableField'

export const ComputeResourceNodeDetailPage = () => {
  const {
    node,
    nodesOnSameASN,
    baseLatency,
    lastMetricsCheck,
    calculatedRewards,
    isUserLinked,
    isLinkable,
    creationDate,
    nameCtrl,
    descriptionCtrl,
    bannerCtrl,
    pictureCtrl,
    isOwner,
    isDirty,
    rewardCtrl,
    addressCtrl,
    handleRemove,
    handleSubmit,
    handleLink,
    handleUnlink,
  } = useComputeResourceNodeDetailPage()

  return (
    <>
      <Head>
        <title>Aleph.im | CRN Detail</title>
        <meta name="description" content="Aleph.im Compute Resource Node" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <section>
        <NodeDetailHeader
          {...{
            node,
            nameCtrl,
            descriptionCtrl,
            bannerCtrl,
            pictureCtrl,
            isOwner,
          }}
        />
      </section>
      {isOwner && (
        <section tw="my-8 flex items-center justify-end gap-7">
          <Button
            kind="flat"
            variant="text-only"
            size="regular"
            color="error"
            onClick={handleRemove}
          >
            <Icon name="trash" color="error" size="lg" />
            remove node
          </Button>
          <Button
            kind="neon"
            variant="primary"
            size="regular"
            color="main2"
            onClick={handleSubmit}
            disabled={!isDirty}
          >
            save changes
          </Button>
        </section>
      )}
      <section tw="mt-8">
        <ColumnLayout>
          <div>
            <Card2 title="GENERAL INFO">
              <NodeDetailStatus status={node?.status} />
              <Card2Field name="NAME" value={node?.name} />
              <Card2Field
                name="OWNER"
                value={
                  <Link
                    href={getETHExplorerURL({ address: node?.owner })}
                    target="_blank"
                  >
                    {ellipseAddress(node?.owner || '')}
                  </Link>
                }
                big
              />
              <Card2Field
                name="REWARD ADDRESS"
                value={
                  <NodeDetailEditableField
                    {...rewardCtrl.field}
                    {...rewardCtrl.fieldState}
                    placeholder="address"
                    isOwner={isOwner}
                  >
                    <Link
                      href={getETHExplorerURL({
                        tokenAddress: rewardCtrl.field.value,
                      })}
                      target="_blank"
                    >
                      {ellipseAddress(rewardCtrl.field.value || 'NONE')}
                    </Link>
                  </NodeDetailEditableField>
                }
                big
              />
              <Card2Field
                name="ADDRESS"
                value={
                  <NodeDetailEditableField
                    {...addressCtrl.field}
                    {...addressCtrl.fieldState}
                    placeholder="address"
                    isOwner={isOwner}
                  >
                    <Link href={node?.address || '#'} target="_blank">
                      {node?.address}
                    </Link>
                  </NodeDetailEditableField>
                }
                big
              />
            </Card2>
          </div>
          <div>
            <Card2 title="REWARD INDICATORS">
              <Card2Field name="ASN" value={node?.metricsData?.as_name} />
              <Card2Field name="NODES ON ASN" value={nodesOnSameASN} />
              <Card2Field name="VERSION" value={node?.metricsData?.version} />
              <Card2Field name="BASE LATENCY" value={baseLatency} />
              <Card2Field name="LAST CHECK" value={lastMetricsCheck} />
            </Card2>

            <Card2 title="POTENTIAL REWARD">
              <Card2Field
                name="ESTIMATED MONTHLY REWARD"
                value={
                  <div tw="inline-flex gap-2 items-center">
                    <div tw="whitespace-nowrap">
                      {calculatedRewards?.toFixed(5)}
                    </div>
                    <Logo text="" color="main0" />
                  </div>
                }
              />
            </Card2>
          </div>
          <div>
            <Card2 title="LINKED CORE NODE">
              {!node?.parentData ? (
                <div tw="inline-flex gap-3 items-center">
                  <div tw="w-6 h-6 rounded-full bg-[#C4C4C433]" />
                  <div className="fs-10" tw="leading-4">
                    {!isUserLinked && isLinkable ? (
                      <Button
                        color="main2"
                        size="regular"
                        kind="neon"
                        variant="text-only"
                        onClick={handleLink}
                      >
                        <div>
                          <Icon name="link" tw="w-3.5 h-3.5" /> link now
                        </div>
                      </Button>
                    ) : (
                      <>not linked</>
                    )}
                  </div>
                </div>
              ) : (
                <div tw="flex items-center">
                  <Link
                    href={`/earn/ccn/${node.parentData.hash}`}
                    legacyBehavior
                  >
                    <NodeName
                      hash={node.parentData.hash}
                      name={node.parentData.name}
                      picture={node.parentData.picture}
                      tw="mr-auto w-auto cursor-pointer"
                    />
                  </Link>
                  {isUserLinked ? (
                    <button onClick={handleUnlink}>
                      <Icon name="trash" color="error" />
                    </button>
                  ) : (
                    <></>
                  )}
                </div>
              )}
            </Card2>
          </div>
          <div>
            <Card2 title="DECENTRALIZED SCORE">
              <NodeDecentralization
                decentralization={node?.scoreData?.decentralization || 0}
              />
            </Card2>
          </div>
          <div>
            <Card2 title="PERFORMANCE">
              <Card2Field name="AVERAGE RESPONSE" value="?????" />
              <Card2Field name="RESPONSIVENESS" value="?????" />
              <Card2Field name="TIME LEFT" value="?????" />
              <Card2Field name="UPTIME" value="?????" />
              <Card2Field name="CREATION TIME" value={creationDate} />
            </Card2>
          </div>
        </ColumnLayout>
      </section>
      <SpinnerOverlay show={!node} center />
    </>
  )
}
ComputeResourceNodeDetailPage.displayName = 'ComputeResourceNodeDetailPage'

export default memo(ComputeResourceNodeDetailPage)
