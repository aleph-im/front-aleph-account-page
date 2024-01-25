import { memo } from 'react'
import { FormProps } from './types'
import { StyledForm } from './styles'
import { FormError, FormErrorProps } from '@aleph-front/core'

export const Form = ({ children, onSubmit, errors, ...rest }: FormProps) => {
  return (
    <StyledForm onSubmit={onSubmit} noValidate {...rest}>
      {children}
      <div>
        {errors?.root &&
          Object.values<FormErrorProps['error']>(errors.root).map((error) => (
            <FormError key={error + ''} error={error} />
          ))}
      </div>
    </StyledForm>
  )
}

export default memo(Form)
