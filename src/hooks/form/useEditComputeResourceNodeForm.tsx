import { useAppState } from '@/contexts/appState'
import { FormEvent, useCallback, useMemo } from 'react'
import { useRouter } from 'next/router'
import { useForm } from '@/hooks/common/useForm'
import {
  Control,
  FieldErrors,
  UseControllerReturn,
  useController,
  useWatch,
} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { NodeManager, UpdateCRN } from '@/domain/node'
import { useNotification } from '@aleph-front/aleph-core'

export type UseEditComputeResourceNodeFormState = UpdateCRN

export type UseEditComputeResourceNodeFormProps = {
  defaultValues?: Partial<UseEditComputeResourceNodeFormState>
}

export type UseEditComputeResourceNodeFormReturn = {
  values: any
  control: Control<any>
  nameCtrl: UseControllerReturn<UseEditComputeResourceNodeFormState, 'name'>
  descriptionCtrl: UseControllerReturn<
    UseEditComputeResourceNodeFormState,
    'description'
  >
  addressCtrl: UseControllerReturn<
    UseEditComputeResourceNodeFormState,
    'address'
  >
  pictureCtrl: UseControllerReturn<
    UseEditComputeResourceNodeFormState,
    'picture'
  >
  bannerCtrl: UseControllerReturn<UseEditComputeResourceNodeFormState, 'banner'>
  rewardCtrl: UseControllerReturn<UseEditComputeResourceNodeFormState, 'reward'>
  managerCtrl: UseControllerReturn<
    UseEditComputeResourceNodeFormState,
    'manager'
  >
  authorizedCtrl: UseControllerReturn<
    UseEditComputeResourceNodeFormState,
    'authorized'
  >
  lockedCtrl: UseControllerReturn<UseEditComputeResourceNodeFormState, 'locked'>
  registrationUrlCtrl: UseControllerReturn<
    UseEditComputeResourceNodeFormState,
    'registration_url'
  >
  errors: FieldErrors<UseEditComputeResourceNodeFormState>
  isDirty: boolean
  handleSubmit: (e: FormEvent) => Promise<void>
}

export function useEditComputeResourceNodeForm({
  defaultValues,
}: UseEditComputeResourceNodeFormProps): UseEditComputeResourceNodeFormReturn {
  const router = useRouter()
  const [appState] = useAppState()
  const { account } = appState.account

  const noti = useNotification()

  // @todo: Refactor into singleton
  const manager = useMemo(() => new NodeManager(account), [account])

  const onSubmit = useCallback(
    async (state: UseEditComputeResourceNodeFormState) => {
      if (!manager) throw new Error('Manager not ready')

      await manager.updateComputeResourceNode(state)
      return state.hash as string
    },
    [manager],
  )

  const onSuccess = useCallback(
    async (hash: string) => {
      if (!noti) throw new Error('Notification not ready')

      noti.add({
        variant: 'success',
        title: 'Success',
        text: `Your node "${hash}" was updated successfully.`,
      })

      router.replace(`/earn/crn/${hash}`)
    },
    [noti, router],
  )

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues,
    onSubmit,
    onSuccess,
    resolver: zodResolver(NodeManager.updateCCNSchema),
    readyDeps: [defaultValues?.hash],
  })
  // @note: dont use watch, use useWatch instead: https://github.com/react-hook-form/react-hook-form/issues/10753
  const values = useWatch({ control }) as UseEditComputeResourceNodeFormState

  const nameCtrl = useController({
    control,
    name: 'name',
  })

  const descriptionCtrl = useController({
    control,
    name: 'description',
  })

  const addressCtrl = useController({
    control,
    name: 'address',
  })

  const pictureCtrl = useController({
    control,
    name: 'picture',
  })

  const bannerCtrl = useController({
    control,
    name: 'banner',
  })

  const rewardCtrl = useController({
    control,
    name: 'reward',
  })

  const managerCtrl = useController({
    control,
    name: 'manager',
  })

  const authorizedCtrl = useController({
    control,
    name: 'authorized',
  })

  const lockedCtrl = useController({
    control,
    name: 'locked',
  })

  const registrationUrlCtrl = useController({
    control,
    name: 'registration_url',
  })

  return {
    values,
    control,
    nameCtrl,
    descriptionCtrl,
    addressCtrl,
    pictureCtrl,
    bannerCtrl,
    rewardCtrl,
    managerCtrl,
    authorizedCtrl,
    lockedCtrl,
    registrationUrlCtrl,
    errors,
    isDirty,
    handleSubmit,
  }
}
