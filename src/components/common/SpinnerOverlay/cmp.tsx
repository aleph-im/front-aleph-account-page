import { memo } from 'react'
import {
  Spinner,
  SpinnerProps,
  useTransitionedEnterExit,
} from '@aleph-front/aleph-core'
import { StyledSpinnerContainer } from './styles'

export type SpinnerOverlayProps = SpinnerProps & {
  show: boolean
  center?: boolean
}

export const SpinnerOverlay = ({
  show,
  center = false,
  ...rest
}: SpinnerOverlayProps) => {
  const { shouldMount, state, ref } = useTransitionedEnterExit<HTMLDivElement>({
    onOff: show,
  })

  return (
    <>
      {shouldMount && (
        <StyledSpinnerContainer
          ref={ref}
          $show={state === 'enter'}
          $center={center}
        >
          <Spinner {...rest} />
        </StyledSpinnerContainer>
      )}
    </>
  )
}

SpinnerOverlay.displayName = 'SpinnerOverlay'

export default memo(SpinnerOverlay)
