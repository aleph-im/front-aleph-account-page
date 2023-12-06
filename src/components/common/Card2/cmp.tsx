import { HTMLAttributes, ReactNode, memo } from 'react'
import { StyledContainer, StyledTitle } from './styles'

export type Card2FieldProps = {
  name: string
  value: ReactNode
  big?: boolean
}

export const Card2Field = memo(
  ({ name, value, big = false, ...rest }: Card2FieldProps) => {
    return (
      <div tw="flex items-center" {...rest}>
        <div
          tw="uppercase opacity-60 whitespace-nowrap mr-4"
          className="tp-body3 fs-10"
        >
          {name}
        </div>
        <div
          tw="ml-auto overflow-hidden whitespace-nowrap text-ellipsis max-w-full"
          className={`${!big ? 'tp-body fs-12' : 'tp-body3 fs-16'}`}
        >
          {value}
        </div>
      </div>
    )
  },
)
Card2Field.displayName = 'Card2Field'

export type Card2Props = HTMLAttributes<HTMLDivElement> & {
  title: string
  children?: ReactNode
  disabled?: boolean
  loading?: boolean
}

export const Card2 = memo(({ title, children, ...rest }: Card2Props) => {
  return (
    <StyledContainer {...rest}>
      <StyledTitle>{title}</StyledTitle>
      {children}
    </StyledContainer>
  )
})
Card2.displayName = 'Card2'

export default Card2
