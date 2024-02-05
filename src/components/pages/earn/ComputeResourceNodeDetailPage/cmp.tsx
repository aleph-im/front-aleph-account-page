import { memo } from 'react'
import Head from 'next/head'
import { useComputeResourceNodeDetailPage } from '@/hooks/pages/earn/useComputeResourceNodeDetailPage'
import { Button, Icon, NodeName } from '@aleph-front/core'
import {
  ellipseAddress,
  getAVAXExplorerURL,
  getETHExplorerURL,
} from '@/helpers/utils'
import Link from 'next/link'
import NodeDetailHeader from '@/components/common/NodeDetailHeader'
import Card2, { Card2Field } from '@/components/common/Card2'
import ColumnLayout from '@/components/common/ColumnLayout'
import NodeDetailStatus from '@/components/common/NodeDetailStatus'
import NodeDecentralization from '@/components/common/NodeDecentralization'
import NodeDetailEditableField from '@/components/common/NodeDetailEditableField'
import NodeDetailLink from '@/components/common/NodeDetailLink'
import { apiServer } from '@/helpers/constants'
import Image from 'next/image'
import Price from '@/components/common/Price'

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
    streamRewardCtrl,
    addressCtrl,
    asnTier,
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
            variant="textOnly"
            size="md"
            color="error"
            onClick={handleRemove}
          >
            <Icon name="trash" color="error" size="lg" />
            remove node
          </Button>
          <Button
            kind="neon"
            variant="primary"
            size="md"
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
              <Card2Field name="ASN" value={node?.metricsData?.as_name} />
              <Card2Field
                name="OWNER"
                value={
                  <NodeDetailLink
                    href={getETHExplorerURL({ address: node?.owner })}
                    isOwner={false}
                  >
                    {node?.owner && ellipseAddress(node?.owner)}
                  </NodeDetailLink>
                }
                big
              />
              <Card2Field
                name="REWARD ADDRESS"
                value={
                  <NodeDetailEditableField
                    {...rewardCtrl.field}
                    {...rewardCtrl.fieldState}
                    placeholder="reward address"
                    isOwner={isOwner}
                  >
                    <NodeDetailLink
                      href={getETHExplorerURL({
                        tokenAddress: rewardCtrl.field.value,
                      })}
                      isOwner={isOwner}
                    >
                      {rewardCtrl.field.value &&
                        ellipseAddress(rewardCtrl.field.value)}
                    </NodeDetailLink>
                  </NodeDetailEditableField>
                }
                big
              />
              <Card2Field
                name="STREAM REWARD ADDRESS"
                value={
                  <NodeDetailEditableField
                    {...streamRewardCtrl.field}
                    {...streamRewardCtrl.fieldState}
                    placeholder="PAYG reward address"
                    isOwner={isOwner}
                  >
                    <NodeDetailLink
                      href={getAVAXExplorerURL({
                        tokenAddress: streamRewardCtrl.field.value,
                      })}
                      isOwner={isOwner}
                    >
                      {streamRewardCtrl.field.value &&
                        ellipseAddress(streamRewardCtrl.field.value)}
                    </NodeDetailLink>
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
                    <NodeDetailLink href={node?.address} isOwner={isOwner}>
                      {node?.address}
                    </NodeDetailLink>
                  </NodeDetailEditableField>
                }
                big
              />
            </Card2>
          </div>
          <div>
            <Card2 title="REWARD INDICATORS">
              <Card2Field
                name="NODES ON ASN"
                value={
                  <div
                    tw="flex gap-3 items-center"
                    className={asnTier && `text-${asnTier.color}`}
                  >
                    {nodesOnSameASN}
                    {!!asnTier && (
                      <Icon name="hexagon-exclamation" color={asnTier.color} />
                    )}
                  </div>
                }
              />
              <Card2Field name="VERSION" value={node?.metricsData?.version} />
              <Card2Field name="BASE LATENCY" value={baseLatency} />
              <Card2Field name="LAST CHECK" value={lastMetricsCheck} />
            </Card2>

            <Card2 title="POTENTIAL REWARD">
              <Card2Field
                name="ESTIMATED MONTHLY REWARD"
                value={<Price value={calculatedRewards} />}
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
                        size="md"
                        kind="neon"
                        variant="textOnly"
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
                      apiServer={apiServer}
                      ImageCmp={Image}
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
              <div
                tw="flex gap-3 items-center"
                className={asnTier && `text-${asnTier.color}`}
              >
                <NodeDecentralization
                  decentralization={node?.scoreData?.decentralization || 0}
                />
                {!!asnTier && (
                  <Icon name="hexagon-exclamation" color={asnTier.color} />
                )}
              </div>
              {!!asnTier && (
                <p className="tp-body3 fs-10">
                  There are {nodesOnSameASN} nodes on this ASN. Please consider
                  to migrate your node to a different ASN.
                </p>
              )}
            </Card2>
          </div>
          <div>
            <Card2 title="PERFORMANCE">
              {/* <Card2Field name="AVERAGE RESPONSE" value="?????" />
              <Card2Field name="RESPONSIVENESS" value="?????" />
              <Card2Field name="TIME LEFT" value="?????" />
              <Card2Field name="UPTIME" value="?????" /> */}
              <Card2Field name="CREATION TIME" value={creationDate} />
            </Card2>
          </div>
        </ColumnLayout>
      </section>
    </>
  )
}
ComputeResourceNodeDetailPage.displayName = 'ComputeResourceNodeDetailPage'

export default memo(ComputeResourceNodeDetailPage)
