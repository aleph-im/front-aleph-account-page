import { ReactNode, memo, useCallback, useState } from 'react'
import tw from 'twin.macro'
import {
  Button,
  Icon,
  useTransitionedEnterExit,
  useBounds,
} from '@aleph-front/aleph-core'
import { StyledButtonsContainer, StyledToggleContainer } from './styles'

export type ToggleDashboardProps = {
  buttons?: ReactNode
  children?: ReactNode
}

export const ToggleDashboard = ({
  buttons,
  children,
  ...rest
}: ToggleDashboardProps) => {
  const [open, setOpen] = useState(true)
  const handleToogle = useCallback(() => setOpen((prev) => !prev), [])

  const duration = 1000

  const {
    shouldMount: mount1,
    ref: ref1,
    state: state1,
  } = useTransitionedEnterExit<HTMLDivElement>({
    onOff: !open,
    duration,
  })

  const {
    shouldMount: mount2,
    ref: ref2,
    state: state2,
  } = useTransitionedEnterExit<HTMLDivElement>({
    onOff: open,
    duration,
  })
  const openButton = state1 === 'enter'
  const openPanel = state2 === 'enter'

  const { bounds } = useBounds({ ref: ref1, deps: [openButton] })
  const minHeight = bounds?.height || 0

  return (
    <div tw="relative mt-8 mb-14" style={{ minHeight }} {...rest}>
      <>
        {mount2 && (
          <StyledToggleContainer
            ref={ref2}
            open={openPanel}
            duration={duration}
          >
            {children}
            <Button
              color="main0"
              kind="neon"
              variant="text-only"
              size="regular"
              onClick={handleToogle}
              css={[tw`gap-2.5 !mt-6 !flex !ml-auto`]}
            >
              <Icon name="sort-up" tw="h-3.5 w-3.5 pt-2" />
              collapse
            </Button>
          </StyledToggleContainer>
        )}
        {mount1 && (
          <StyledButtonsContainer ref={ref1} $open={openButton}>
            {buttons}
            <Button
              color="main0"
              kind="neon"
              variant="secondary"
              size="regular"
              onClick={handleToogle}
              tw="gap-2.5"
            >
              <Icon name="gauge" />
              open dashboard
            </Button>
          </StyledButtonsContainer>
        )}
      </>
    </div>
  )
}
ToggleDashboard.displayName = 'ToggleDashboard'

export default memo(ToggleDashboard)
