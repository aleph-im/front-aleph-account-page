import { useAppState } from '@/contexts/appState'
import { FormEvent, useCallback, useMemo } from 'react'
import { useRouter } from 'next/router'
import useConnectedWard from '@/hooks/common/useConnectedWard'
import { useForm } from '@/hooks/common/useForm'
import {
  Control,
  FieldErrors,
  UseControllerReturn,
  useController,
  useWatch,
} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { NewCCN, NodeManager } from '@/domain/node'

export type NewCoreChannelNodeFormState = NewCCN

const defaultValues: Partial<NewCoreChannelNodeFormState> = {
  name: '',
  multiaddress: '',
}

// @todo: Split this into reusable hooks by composition

export type UseNewCoreChannelNodePage = {
  address: string
  accountBalance: number
  values: any
  control: Control<any>
  nameCtrl: UseControllerReturn<NewCoreChannelNodeFormState, 'name'>
  multiaddressCtrl: UseControllerReturn<
    NewCoreChannelNodeFormState,
    'multiaddress'
  >
  errors: FieldErrors<NewCoreChannelNodeFormState>
  handleSubmit: (e: FormEvent) => Promise<void>
}

export function useNewCoreChannelNodePage(): UseNewCoreChannelNodePage {
  useConnectedWard()

  const router = useRouter()
  const [appState] = useAppState()
  const { account, balance: accountBalance } = appState.account

  // @todo: Refactor into singleton
  const manager = useMemo(() => new NodeManager(account), [account])

  const onSubmit = useCallback(
    async (state: NewCoreChannelNodeFormState) => {
      if (!manager) throw new Error('Manager not ready')

      await manager.newCoreChannelNode(state)

      router.replace('/earn/ccn')
    },
    [manager, router],
  )

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    onSubmit,
    resolver: zodResolver(NodeManager.newCCNSchema),
  })
  // @note: dont use watch, use useWatch instead: https://github.com/react-hook-form/react-hook-form/issues/10753
  const values = useWatch({ control }) as NewCoreChannelNodeFormState

  const nameCtrl = useController({
    control,
    name: 'name',
  })

  const multiaddressCtrl = useController({
    control,
    name: 'multiaddress',
  })

  return {
    address: account?.address || '',
    accountBalance: accountBalance || 0,
    values,
    control,
    nameCtrl,
    multiaddressCtrl,
    errors,
    handleSubmit,
  }
}
