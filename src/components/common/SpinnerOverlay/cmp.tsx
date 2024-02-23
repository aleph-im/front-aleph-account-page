import { memo } from 'react'
import { Spinner, SpinnerProps, useTransition } from '@aleph-front/core'
import { StyledSpinnerContainer } from './styles'
import { createPortal } from 'react-dom'

export type SpinnerOverlayProps = SpinnerProps & {
  show: boolean
  center?: boolean
  fullScreen?: boolean
}

export const SpinnerOverlay = ({
  show,
  center = false,
  fullScreen = false,
  ...rest
}: SpinnerOverlayProps) => {
  const { shouldMount, stage } = useTransition(show, 500)

  const cmp = (
    <>
      {shouldMount && (
        <StyledSpinnerContainer
          $show={stage === 'enter'}
          $center={center}
          $fullScreen={fullScreen}
        >
          <Spinner {...rest} />
        </StyledSpinnerContainer>
      )}
    </>
  )

  return (
    <>
      {fullScreen && typeof document === 'object'
        ? createPortal(cmp, document.body)
        : cmp}
    </>
  )
}

SpinnerOverlay.displayName = 'SpinnerOverlay'

export default memo(SpinnerOverlay)
