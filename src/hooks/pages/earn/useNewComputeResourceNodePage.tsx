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
import { NewCRN, NodeManager } from '@/domain/node'
import { useNotification } from '@aleph-front/aleph-core'
import ButtonLink from '@/components/common/ButtonLink'

export type NewComputeResourceNodeFormState = NewCRN

const defaultValues: Partial<NewComputeResourceNodeFormState> = {
  name: '',
  address: '',
}

// @todo: Split this into reusable hooks by composition

export type UseNewComputeResourceNodePage = {
  values: any
  control: Control<any>
  nameCtrl: UseControllerReturn<NewComputeResourceNodeFormState, 'name'>
  addressCtrl: UseControllerReturn<NewComputeResourceNodeFormState, 'address'>
  errors: FieldErrors<NewComputeResourceNodeFormState>
  handleSubmit: (e: FormEvent) => Promise<void>
}

export function useNewComputeResourceNodePage(): UseNewComputeResourceNodePage {
  useConnectedWard()

  const router = useRouter()
  const [appState] = useAppState()
  const { account } = appState.account

  const noti = useNotification()

  // @todo: Refactor into singleton
  const manager = useMemo(() => new NodeManager(account), [account])

  const onSubmit = useCallback(
    async (state: NewComputeResourceNodeFormState) => {
      if (!manager) throw new Error('Manager not ready')

      const hash = await manager.newComputeResourceNode(state)
      return hash
    },
    [manager],
  )

  const onSuccess = useCallback(
    async (hash: string) => {
      if (!noti) throw new Error('Notification not ready')

      noti.add({
        variant: 'success',
        title: 'Success',
        text: `Your node "${hash}" was created successfully.`,
      })

      router.replace(`/earn/crn/${hash}`)
    },
    [noti, router],
  )

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    onSubmit,
    onSuccess,
    resolver: zodResolver(NodeManager.newCRNSchema),
  })
  // @note: dont use watch, use useWatch instead: https://github.com/react-hook-form/react-hook-form/issues/10753
  const values = useWatch({ control }) as NewComputeResourceNodeFormState

  const nameCtrl = useController({
    control,
    name: 'name',
  })

  const addressCtrl = useController({
    control,
    name: 'address',
  })

  return {
    values,
    control,
    nameCtrl,
    addressCtrl,
    errors,
    handleSubmit,
  }
}
