import { ReactNode, memo, useState } from 'react'
import tw from 'twin.macro'
import {
  Button,
  Icon,
  useTransitionedEnterExit,
  ToggleContainer,
} from '@aleph-front/aleph-core'

export type ToggleDashboardProps = {
  children?: ReactNode
}

export const ToggleDashboard = ({
  children,
  ...rest
}: ToggleDashboardProps) => {
  const [open, setOpen] = useState(true)

  const {
    shouldMount: mount1,
    ref: ref1,
    state: state1,
  } = useTransitionedEnterExit<HTMLButtonElement>({
    onOff: !open,
  })
  return (
    <div tw="relative mt-8 mb-14 min-h-[2.3125rem]" {...rest}>
      {mount1 && (
        <Button
          ref={ref1}
          color="main0"
          kind="neon"
          variant="secondary"
          size="regular"
          onClick={() => setOpen((prev) => !prev)}
          css={[
            tw`gap-2.5 !absolute top-0 duration-200`,
            state1 === 'exit' ? tw`opacity-0` : tw`opacity-100 !delay-300`,
          ]}
        >
          <Icon name="gauge" />
          open dashboard
        </Button>
      )}
      <ToggleContainer open={open} duration={500}>
        {children}
        <Button
          color="main0"
          kind="neon"
          variant="text-only"
          size="regular"
          onClick={() => setOpen((prev) => !prev)}
          css={[tw`gap-2.5 !mt-6 !flex !ml-auto`]}
        >
          <Icon name="sort-up" tw="h-3.5 w-3.5 pt-2" />
          collapse
        </Button>
      </ToggleContainer>
    </div>
  )
}
ToggleDashboard.displayName = 'ToggleDashboard'

export default memo(ToggleDashboard)
