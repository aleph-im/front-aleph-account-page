import { ReactNode, memo, useCallback, useRef, useState } from 'react'
import tw from 'twin.macro'
import { Button, Icon, useTransition, useBounds } from '@aleph-front/core'
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

  const ref = useRef<HTMLDivElement>(null)

  const duration = 1000
  const { shouldMount: mount1, stage: state1 } = useTransition(!open, duration)
  const { shouldMount: mount2, stage: state2 } = useTransition(open, duration)

  const openButton = state1 === 'enter'
  const openPanel = state2 === 'enter'

  const { bounds } = useBounds({ ref, deps: [openButton] })
  const minHeight = bounds?.height || 0

  return (
    <div tw="relative mt-8 mb-14" style={{ minHeight }} {...rest}>
      <>
        {mount2 && (
          <StyledToggleContainer open={openPanel} duration={duration}>
            {children}
            <Button
              color="main0"
              kind="gradient"
              variant="textOnly"
              size="md"
              onClick={handleToogle}
              css={[tw`gap-2.5 !mt-6 !flex !ml-auto`]}
            >
              <Icon name="sort-up" tw="h-3.5 w-3.5 pt-2" />
              collapse
            </Button>
          </StyledToggleContainer>
        )}
        {mount1 && (
          <StyledButtonsContainer ref={ref} $open={openButton}>
            {buttons}
            <Button
              color="main0"
              kind="gradient"
              variant="secondary"
              size="md"
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
