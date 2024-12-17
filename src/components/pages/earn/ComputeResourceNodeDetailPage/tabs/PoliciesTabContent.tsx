import { memo } from 'react'
import { UseComputeResourceNodeDetailPageReturn } from '@/hooks/pages/earn/ComputeResourceNodeDetailPage/useComputeResourceNodeDetailPage'
import Card2, { Card2Field } from '@/components/common/Card2'
import {
  Button,
  Col,
  ellipseText,
  FileInput,
  Icon,
  Row,
  Spinner,
} from '@aleph-front/core'
import ExternalLink from '@/components/common/ExternalLink'
import { usePoliciesTabContent } from '@/hooks/pages/earn/ComputeResourceNodeDetailPage/usePoliciesTabContent'

export type PoliciesTabContentProps = Pick<
  UseComputeResourceNodeDetailPageReturn,
  'termsAndConditionsCtrl' | 'handleRemovePolicies' | 'node'
>

export const PoliciesTabContent = (props: PoliciesTabContentProps) => {
  const {
    documentName,
    documentCID,
    documentLink,
    termsAndConditionsCtrl,
    isLoadingHistoryMessages,
    policiesHistory,
    fileValue,
    isCurrentVersion,
    handleFileChange,
    handleDownloadFile,
    handleRemovePolicies,
  } = usePoliciesTabContent(props)

  return (
    <section tw="mt-8">
      <Row count={1} xl={5} xlGap={'2rem'}>
        <Col span={3}>
          <Card2 title="CURRENT VERSION">
            <Card2Field name="DOCUMENT NAME" value={documentName} />
            <Card2Field name="CID" value={documentCID} />
            <Card2Field name="LINK" value={documentLink} />
          </Card2>
          <Button
            kind="flat"
            variant="secondary"
            size="md"
            color="error"
            onClick={handleRemovePolicies}
            tw="my-8!"
          >
            <Icon name="trash" color="error" size="lg" />
            remove policies
          </Button>
          <FileInput
            {...termsAndConditionsCtrl.field}
            {...termsAndConditionsCtrl.fieldState}
            value={fileValue}
            onChange={handleFileChange}
          />
        </Col>
        <Col span={2}>
          <div className="tp-h7" tw="my-8">
            History
          </div>
          {isLoadingHistoryMessages ? (
            <Spinner />
          ) : (
            policiesHistory && (
              <ol>
                {Array.from(policiesHistory).map(([, policies], index) => (
                  <li key={policies.cid} tw="mt-2">
                    <div
                      className="fs-12"
                      tw="italic font-normal opacity-40 mb-0.5"
                    >
                      {isCurrentVersion(policies)
                        ? 'Now'
                        : policies.time.toLocaleDateString()}
                    </div>
                    <ExternalLink
                      text={policies.name || ellipseText(policies.cid, 12, 6)}
                      href="#"
                      onClick={() =>
                        handleDownloadFile(
                          policies.cid,
                          policies.name || policies.cid,
                        )
                      }
                      target="_self"
                    />
                    {/* Don't render left line only for last element  */}
                    {index < policiesHistory.size - 1 && (
                      <div tw="ml-1 mt-2 h-8 relative border-s" />
                    )}
                  </li>
                ))}
              </ol>
            )
          )}
        </Col>
      </Row>
    </section>
  )
}
PoliciesTabContent.displayName = 'PoliciesTabContent'

export default memo(PoliciesTabContent)
