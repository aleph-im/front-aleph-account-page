import { memo } from 'react'
import Head from 'next/head'
import NodeDetailHeader from '@/components/common/NodeDetailHeader'
import { useCoreChannelNodeDetailPage } from '@/hooks/pages/earn/useCoreChannelNodeDetailPage'
import Card2 from '@/components/common/Card2'
import { Card2Field } from '@/components/common/Card2/cmp'
import ColumnLayout from '@/components/common/ColumnLayout'
import { Button, Icon, Logo } from '@aleph-front/aleph-core'
import StyledProgressBar from '@/components/common/ColorProgressBar'
import NodeLinkedNodes from '@/components/common/NodeLinkedNodes'
import NodeName from '@/components/common/NodeName'
import Link from 'next/link'
import { ellipseAddress, getETHExplorerURL } from '@/helpers/utils'
import ButtonLink from '@/components/common/ButtonLink'
import NodeDetailLockSwitch from '@/components/common/NodeDetailLockSwitch'
import NodeDetailStatus from '@/components/common/NodeDetailStatus'
import NodeDetailEditableField from '@/components/common/NodeDetailEditableField'
import SpinnerOverlay from '@/components/common/SpinnerOverlay'

export const CoreChannelNodeDetailPage = () => {
  const {
    node,
    nodesOnSameASN,
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
                name="MULTI ADDRESS"
                value={
                  <NodeDetailEditableField
                    {...multiaddressCtrl.field}
                    {...multiaddressCtrl.fieldState}
                    placeholder="multi address"
                    isOwner={isOwner}
                  >
                    {ellipseAddress(multiaddressCtrl.field.value || 'NONE')}
                  </NodeDetailEditableField>
                }
                big
              />
            </Card2>
          </div>
          <div>
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
                    {ellipseAddress(managerCtrl.field.value || 'NONE')}
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
                    {registrationUrlCtrl.field.value || 'NONE'}
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
          <div>
            <Card2 title="REWARD INDICATORS">
              <Card2Field name="ASN" value={node?.metricsData?.as_name} />
              <Card2Field name="NODES ON ASN" value={nodesOnSameASN} />
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
          </div>
          <div>
            <Card2 title="POTENTIAL REWARD">
              <Card2Field
                name="TOTAL REWARDS"
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
            <Card2 title="LINKED RESOURCES">
              {Array.from(
                { length: Math.max(3, node?.crnsData.length || 0) },
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
                            size="regular"
                            kind="neon"
                            variant="text-only"
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
          </div>
          <div>
            <Card2 title="PERFORMANCE">
              <Card2Field name="AVERAGE RESPONSE" value="?????" />
              <Card2Field name="RESPONSIVENESS" value="?????" />
              <Card2Field
                name="TOTAL STAKED"
                value={
                  <div tw="inline-flex gap-2 items-center">
                    <div tw="whitespace-nowrap">
                      {node?.total_staked?.toFixed(5)}
                    </div>
                    <Logo text="" color="main0" />
                  </div>
                }
              />
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
CoreChannelNodeDetailPage.displayName = 'CoreChannelNodeDetailPage'

export default memo(CoreChannelNodeDetailPage)
