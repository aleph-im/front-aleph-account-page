import { memo } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useCoreChannelNodeDetailPage } from '@/hooks/pages/earn/useCoreChannelNodeDetailPage'
import { Button, Icon, NodeName } from '@aleph-front/core'
import {
  ellipseAddress,
  getETHExplorerURL,
  getMultiaddressUrl,
} from '@/helpers/utils'
import NodeDetailHeader from '@/components/common/NodeDetailHeader'
import Card2, { Card2Field } from '@/components/common/Card2'
import StyledProgressBar from '@/components/common/ColorProgressBar'
import NodeLinkedNodes from '@/components/common/NodeLinkedNodes'
import ButtonLink from '@/components/common/ButtonLink'
import NodeDetailLockSwitch from '@/components/common/NodeDetailLockSwitch'
import NodeDetailStatus from '@/components/common/NodeDetailStatus'
import NodeDetailEditableField from '@/components/common/NodeDetailEditableField'
import NodeDetailLink from '@/components/common/NodeDetailLink'
import { apiServer } from '@/helpers/constants'
import Image from 'next/image'
import Price from '@/components/common/Price'
import { NodeManager } from '@/domain/node'

export const CoreChannelNodeDetailPage = () => {
  const {
    node,
    // nodesOnSameASN,
    baseLatency,
    aggregateLatency,
    fileDownloadLatency,
    metricsLatency,
    relativeETHHeightPercent,
    lastMetricsCheck,
    calculatedRewards,
    creationDate,
    isOwner,
    nameCtrl,
    descriptionCtrl,
    multiaddressCtrl,
    pictureCtrl,
    bannerCtrl,
    rewardCtrl,
    managerCtrl,
    lockedCtrl,
    registrationUrlCtrl,
    isDirty,
    handleRemove,
    handleSubmit,
    handleUnlink,
  } = useCoreChannelNodeDetailPage()

  return (
    <>
      <Head>
        <title>Aleph.im | CCN Detail</title>
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
        <div tw="flex flex-wrap gap-9">
          <div tw="flex-1 w-1/3 min-w-[20rem] flex flex-col gap-9">
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
                    placeholder="address"
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
                name="MULTI ADDRESS"
                value={
                  <NodeDetailEditableField
                    {...multiaddressCtrl.field}
                    {...multiaddressCtrl.fieldState}
                    placeholder="multi address"
                    isOwner={isOwner}
                  >
                    <NodeDetailLink
                      href={getMultiaddressUrl({
                        multiaddress: multiaddressCtrl.field.value,
                      })}
                      isOwner={isOwner}
                    >
                      {multiaddressCtrl.field.value &&
                        ellipseAddress(multiaddressCtrl.field.value)}
                    </NodeDetailLink>
                  </NodeDetailEditableField>
                }
                big
              />
            </Card2>
            <Card2 title="ADDITIONAL SETTINGS">
              <Card2Field
                name="MANAGER"
                value={
                  <NodeDetailEditableField
                    {...managerCtrl.field}
                    {...managerCtrl.fieldState}
                    placeholder="manager address"
                    isOwner={isOwner}
                  >
                    <NodeDetailLink
                      href={getETHExplorerURL({
                        address: managerCtrl.field.value,
                      })}
                      isOwner={isOwner}
                    >
                      {managerCtrl.field.value &&
                        ellipseAddress(managerCtrl.field.value)}
                    </NodeDetailLink>
                  </NodeDetailEditableField>
                }
                big
              />
              <Card2Field
                name="REGISTRATION URL"
                value={
                  <NodeDetailEditableField
                    {...registrationUrlCtrl.field}
                    {...registrationUrlCtrl.fieldState}
                    placeholder="registration url"
                    isOwner={isOwner}
                  >
                    <NodeDetailLink
                      href={registrationUrlCtrl.field.value}
                      isOwner={isOwner}
                    >
                      {registrationUrlCtrl.field.value}
                    </NodeDetailLink>
                  </NodeDetailEditableField>
                }
                big
              />
              <Card2Field
                name={lockedCtrl.field.value ? 'LOCKED' : 'UNLOCKED'}
                value={
                  <NodeDetailLockSwitch
                    {...(lockedCtrl.field as any)}
                    {...lockedCtrl.fieldState}
                    checked={lockedCtrl.field.value}
                    disabled={!isOwner}
                  />
                }
              />
            </Card2>
          </div>
          <div tw="flex-1 w-1/3 min-w-[20rem] flex flex-col gap-9">
            <Card2 title="REWARD INDICATORS">
              {/* <Card2Field name="NODES ON ASN" value={nodesOnSameASN} /> */}
              <Card2Field name="VERSION" value={node?.metricsData?.version} />
              <Card2Field name="BASE LATENCY" value={baseLatency} />
              <Card2Field name="AGGREGATE LATENCY" value={aggregateLatency} />
              <Card2Field
                name="FILE DOWNLOAD LATENCY"
                value={fileDownloadLatency}
              />
              <Card2Field name="METRICS LATENCY" value={metricsLatency} />
              <Card2Field
                name="ETH HEIGHT REMAINING"
                value={node?.metricsData?.eth_height_remaining}
              />
              <StyledProgressBar
                $percent={relativeETHHeightPercent || 0}
                $color="main0"
              />
              <Card2Field name="LAST CHECK" value={lastMetricsCheck} />
              <Card2Field
                name="linked resources"
                value={
                  <NodeLinkedNodes nodes={node?.crnsData} subfix=" linked" />
                }
              />
            </Card2>
            <Card2 title="POTENTIAL REWARD">
              <Card2Field
                name="TOTAL REWARDS"
                value={<Price value={calculatedRewards} />}
              />
            </Card2>
          </div>
          <div tw="flex-1 w-1/3 min-w-[20rem] flex flex-col gap-9">
            <Card2 title="LINKED RESOURCES">
              {Array.from(
                {
                  length: Math.max(
                    NodeManager.maxLinkedPerNode,
                    node?.crnsData.length || 0,
                  ),
                },
                (_, i) => {
                  const crn = node?.crnsData[i]

                  return !crn ? (
                    <div key={i} tw="inline-flex gap-3 items-center">
                      <div tw="w-6 h-6 rounded-full bg-[#C4C4C433]" />
                      <div className="fs-10" tw="leading-4">
                        {isOwner ? (
                          <ButtonLink
                            href="/earn/crn"
                            color="main0"
                            size="md"
                            kind="neon"
                            variant="textOnly"
                          >
                            <div>
                              <Icon name="link" tw="w-3.5 h-3.5" /> link now
                            </div>
                          </ButtonLink>
                        ) : (
                          <>not linked</>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div key={i} tw="flex items-center">
                      <Link href={`/earn/crn/${crn.hash}`} legacyBehavior>
                        <NodeName
                          hash={crn.hash}
                          name={crn.name}
                          picture={crn.picture}
                          tw="mr-auto w-auto cursor-pointer"
                          apiServer={apiServer}
                          ImageCmp={Image}
                        />
                      </Link>
                      {isOwner ? (
                        <button onClick={() => handleUnlink(crn.hash)}>
                          <Icon name="trash" color="error" />
                        </button>
                      ) : (
                        <></>
                      )}
                    </div>
                  )
                },
              )}
            </Card2>
            <Card2 title="PERFORMANCE">
              {/* <Card2Field name="AVERAGE RESPONSE" value="?????" />
              <Card2Field name="RESPONSIVENESS" value="?????" /> */}
              <Card2Field
                name="TOTAL STAKED"
                value={<Price value={node?.total_staked} />}
              />
              {/* <Card2Field name="TIME LEFT" value="?????" />
              <Card2Field name="UPTIME" value="?????" /> */}
              <Card2Field name="CREATION TIME" value={creationDate} />
            </Card2>
          </div>
        </div>
      </section>
    </>
  )
}
CoreChannelNodeDetailPage.displayName = 'CoreChannelNodeDetailPage'

export default memo(CoreChannelNodeDetailPage)
