import {
  ReactNode,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
  FocusEvent,
  KeyboardEvent,
  InputHTMLAttributes,
  ChangeEvent,
} from 'react'
import { Icon } from '@aleph-front/aleph-core'

export type NodeDetailEditableFieldProps =
  InputHTMLAttributes<HTMLDivElement> & {
    children: ReactNode
    isOwner: boolean | undefined
  }

function moveCursorToEnd(el: Element) {
  if (!document.createRange) return

  const range = document.createRange() //Create a range (a range is a like the selection but invisible)
  range.selectNodeContents(el) //Select the entire contents of the element with the range
  range.collapse(false) //collapse the range to the end point. false means collapse to end rather than the start

  const selection = window.getSelection() //get the selection object (allows you to change selection)
  selection?.removeAllRanges() //remove any selections already made
  selection?.addRange(range) //make the range you have just created the visible selection
}

export const NodeDetailEditableField = memo(
  ({
    children,
    isOwner,
    value,
    onChange,
    onBlur,
    onKeyDown,
    ...rest
  }: NodeDetailEditableFieldProps) => {
    const [isEditing, setIsEditing] = useState<boolean>()

    const ref = useRef<HTMLDivElement>(null)

    const handleEditClick = useCallback(() => {
      setIsEditing((prev) => (prev ? prev : !prev))
    }, [])

    const handleInputBlur = useCallback(
      (e: FocusEvent<HTMLDivElement>) => {
        setIsEditing(false)
        onBlur && onBlur(e)
      },
      [onBlur],
    )

    const handleInputKeyDown = useCallback(
      (e: KeyboardEvent<HTMLDivElement>) => {
        if (!['Escape', 'Enter', 'NumpadEnter'].includes(e.code)) return
        setIsEditing(false)
        onKeyDown && onKeyDown(e)
      },
      [onKeyDown],
    )

    const handleOnInput = useCallback(
      (e: ChangeEvent<HTMLDivElement>) => {
        const value = e.currentTarget?.textContent
        onChange && onChange(value as any)
      },
      [onChange],
    )

    useEffect(() => {
      if (!ref.current) return
      ref.current.textContent = value ? value + '' : null
    }, [value, isEditing])

    useEffect(() => {
      if (!ref.current) return
      ref.current.focus()
      moveCursorToEnd(ref.current)
      ref.current.scrollLeft = ref.current.scrollWidth
    }, [isEditing])

    return (
      <div tw="flex items-baseline overflow-hidden" {...rest}>
        {isEditing ? (
          <div
            ref={ref}
            type="text"
            tw="border-none outline-none overflow-hidden min-w-[1px]"
            disabled={!isOwner}
            contentEditable={true}
            onInput={handleOnInput}
            onBlur={handleInputBlur}
            onKeyDown={handleInputKeyDown}
            suppressContentEditableWarning={true}
            {...rest}
          />
        ) : (
          <>{children ? children : value || 'NONE'}</>
        )}
        {isOwner && (
          <div
            tw="flex justify-end"
            css={{
              width: '1.75rem',
              maxWidth: isEditing ? '0' : '1.75rem',
              transition: 'max-width ease-in-out 0.25s 0s',
              overflow: 'hidden',
            }}
          >
            <Icon
              name="edit"
              tw="cursor-pointer w-4 h-4"
              onClick={handleEditClick}
            />
          </div>
        )}
      </div>
    )
  },
)
NodeDetailEditableField.displayName = 'NodeDetailEditableField'

export default NodeDetailEditableField
