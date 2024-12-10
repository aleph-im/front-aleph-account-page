import { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { UseComputeResourceNodeDetailPageReturn } from '@/hooks/pages/earn/useComputeResourceNodeDetailPage'
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
import { apiServer } from '@/helpers/constants'
import ExternalLink from '@/components/common/ExternalLink'
import { MessageManager } from '@/domain/message'
import { MessageType } from '@aleph-sdk/message'
import { FileManager } from '@/domain/file'

export type PoliciesTabContentProps = Pick<
  UseComputeResourceNodeDetailPageReturn,
  'termsAndConditionsCtrl' | 'handleRemovePolicies' | 'node'
>

export const PoliciesTabContent = ({
  node,
  termsAndConditionsCtrl,
  handleRemovePolicies,
}: PoliciesTabContentProps) => {
  const {
    field: { onChange, value },
  } = termsAndConditionsCtrl

  // @todo: Refactor FileInputProps to accept File too
  // Adjust the file value to match FileInputProps
  const fileValue = useMemo(() => {
    if (value instanceof File) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const extFile = value as any
      return extFile
    }
    return undefined
  }, [value])

  // Adjust the onChange function to accept ExtFile | ExtFile[] | undefined
  const handleChange = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (files?: any) => {
      const file = Array.isArray(files) ? files[0] : files
      onChange(file)
    },
    [onChange],
  )

  type PoliciesRecord = {
    time: Date
    cid: string
    name: string
  }
  type PoliciesHistory = Map<string, PoliciesRecord>

  const [amendMessages, setAmendMessages] = useState<any[]>()
  const [isLoadingAmendMessages, setIsLoadingAmendMessages] = useState(true)
  const [policiesHistory, setPoliciesHistory] = useState<PoliciesHistory>()
  const [isLoadingHistoryMessages, setIsLoadingHistoryMessages] = useState(true)

  const currentPolicies = useMemo(() => {
    if (!policiesHistory) return
    if (!node?.terms_and_conditions) return

    return policiesHistory.get(node.terms_and_conditions)
  }, [node, policiesHistory])

  const messageManager = useMemo(() => {
    return new MessageManager()
  }, [])

  const fileManager = useMemo(() => {
    return new FileManager()
  }, [])

  const downloadFile = useCallback(
    async (fileHash: string, fileName: string) => {
      const downloadedFile = await fileManager.downloadFile(fileHash)
      const customDownloadUrl = window.URL.createObjectURL(downloadedFile)
      const a = document.createElement('a')
      a.href = customDownloadUrl
      a.download = fileName
      document.body.appendChild(a)
      a.click()
      a.remove()
      window.URL.revokeObjectURL(customDownloadUrl)
    },
    [fileManager],
  )

  const isCurrentVersion = useCallback(
    (policies: PoliciesRecord) => {
      if (!currentPolicies) return false

      return policies === currentPolicies
    },
    [currentPolicies],
  )

  useEffect(() => {
    const fetchMessages = async () => {
      setIsLoadingAmendMessages(true)
      if (!messageManager) return setAmendMessages(undefined)
      if (!node) return setAmendMessages(undefined)

      try {
        const { messages } = await messageManager?.getAll({
          messageTypes: [MessageType['post']],
          refs: [node.hash],
          addresses: [node.owner],
        })

        setAmendMessages(messages)
      } catch (e) {
        console.error(e)
      } finally {
        setIsLoadingAmendMessages(false)
      }
    }

    fetchMessages()
  }, [messageManager, node])

  useEffect(() => {
    const fetchMessages = async () => {
      setIsLoadingHistoryMessages(true)

      if (isLoadingAmendMessages) return setPoliciesHistory(undefined)
      if (!messageManager) return setPoliciesHistory(undefined)
      if (!amendMessages) return setPoliciesHistory(undefined)

      try {
        const history = new Map<string, PoliciesRecord>()
        for (const message of amendMessages) {
          const policiesMessageHash =
            message.content?.content?.details.terms_and_conditions

          if (!policiesMessageHash) continue

          let storeMessageContent
          try {
            const { content } =
              await messageManager?.get<MessageType.store>(policiesMessageHash)
            storeMessageContent = content
          } catch (e) {
            console.error(e)
          }

          if (!storeMessageContent) continue

          history.set(policiesMessageHash, {
            time: new Date(message.content.time * 1000),
            cid: storeMessageContent.item_hash,
            name: storeMessageContent.metadata?.name as string,
          })
        }

        const sortedHistory = new Map(
          Array.from(history).sort(
            ([, { time: a }], [, { time: b }]) => b.getTime() - a.getTime(),
          ),
        )

        setPoliciesHistory(sortedHistory)
      } catch (e) {
        console.error(e)
      } finally {
        setIsLoadingHistoryMessages(false)
      }
    }

    fetchMessages()
  }, [amendMessages, isLoadingAmendMessages, messageManager])

  return (
    <section tw="mt-8">
      <Row count={1} xl={5} xlGap={'2rem'}>
        <Col span={3}>
          <Card2 title="CURRENT VERSION">
            <Card2Field
              name="DOCUMENT NAME"
              value={
                isLoadingHistoryMessages
                  ? ''
                  : currentPolicies?.name || 'UNKNOWN'
              }
            />
            <Card2Field
              name="CID"
              value={
                isLoadingHistoryMessages ? '' : currentPolicies?.cid || ' '
              }
            />
            <Card2Field
              name="LINK"
              value={
                isLoadingHistoryMessages
                  ? ''
                  : currentPolicies
                    ? `${apiServer}/api/v0/storage/raw/${currentPolicies?.cid}`
                    : ' '
              }
            />
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
            onChange={handleChange}
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
                      text={ellipseText(policies.cid, 12, 6)}
                      href="#"
                      onClick={() =>
                        downloadFile(
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
