import { useCallback } from 'react'

export type NewFunctionFormState = NameAndTagsField & {
  code: FunctionCodeField
  specs: InstanceSpecsField
  isPersistent: boolean
  runtime?: CustomFunctionRuntimeField
  volumes?: VolumeField[]
  envVars?: EnvVarField[]
  domains?: DomainField[]
}

const defaultValues: Partial<NewFunctionFormState> = {
  ...defaultNameAndTags,
  code: { ...defaultCode } as FunctionCodeField,
  specs: { ...getDefaultSpecsOptions(false)[0] },
  isPersistent: false,
}

// @todo: Split this into reusable hooks by composition

export type UseNewCoreChannelNodesPage = {
  address: string
  accountBalance: number
  isCreateButtonDisabled: boolean
  values: any
  control: Control<any>
  errors: FieldErrors<NewFunctionFormState>
  handleSubmit: (e: FormEvent) => Promise<void>
  handleChangeEntityTab: (tabId: string) => void
}

export function useNewCoreChannelNodesPage(
  props: UseNewCoreChannelNodesPageProps,
): UseNewCoreChannelNodesPageReturn {
  const onSubmit = useCallback(
    async (state: NewFunctionFormState) => {
      if (!manager) throw new Error('Manager not ready')

      const accountFunction = await manager.add(state)

      dispatch({
        type: ActionTypes.addAccountFunction,
        payload: { accountFunction },
      })

      // @todo: Check new volumes and domains being created to add them to the store

      router.replace('/dashboard')
    },
    [dispatch, manager, router],
  )

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    onSubmit,
    resolver: zodResolver(ProgramManager.addSchema),
  })
  // @note: dont use watch, use useWatch instead: https://github.com/react-hook-form/react-hook-form/issues/10753
  const values = useWatch({ control }) as NewFunctionFormState
}
