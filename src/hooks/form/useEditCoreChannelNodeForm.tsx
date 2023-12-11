import { useAppState } from '@/contexts/appState'
import { FormEvent, useCallback, useMemo } from 'react'
import { useForm } from '@/hooks/common/useForm'
import {
  Control,
  FieldErrors,
  UseControllerReturn,
  useController,
  useWatch,
} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { NodeManager, UpdateCCN } from '@/domain/node'
import { useNotification } from '@aleph-front/aleph-core'

export type UseEditCoreChannelNodeFormState = UpdateCCN

export type UseEditCoreChannelNodeFormProps = {
  defaultValues?: Partial<UseEditCoreChannelNodeFormState>
}

export type UseEditCoreChannelNodeFormReturn = {
  values: any
  control: Control<any>
  nameCtrl: UseControllerReturn<UseEditCoreChannelNodeFormState, 'name'>
  descriptionCtrl: UseControllerReturn<
    UseEditCoreChannelNodeFormState,
    'description'
  >
  multiaddressCtrl: UseControllerReturn<
    UseEditCoreChannelNodeFormState,
    'multiaddress'
  >
  pictureCtrl: UseControllerReturn<UseEditCoreChannelNodeFormState, 'picture'>
  bannerCtrl: UseControllerReturn<UseEditCoreChannelNodeFormState, 'banner'>
  rewardCtrl: UseControllerReturn<UseEditCoreChannelNodeFormState, 'reward'>
  managerCtrl: UseControllerReturn<UseEditCoreChannelNodeFormState, 'manager'>
  authorizedCtrl: UseControllerReturn<
    UseEditCoreChannelNodeFormState,
    'authorized'
  >
  lockedCtrl: UseControllerReturn<UseEditCoreChannelNodeFormState, 'locked'>
  registrationUrlCtrl: UseControllerReturn<
    UseEditCoreChannelNodeFormState,
    'registration_url'
  >
  errors: FieldErrors<UseEditCoreChannelNodeFormState>
  isDirty: boolean
  handleSubmit: (e: FormEvent) => Promise<void>
}

export function useEditCoreChannelNodeForm({
  defaultValues,
}: UseEditCoreChannelNodeFormProps): UseEditCoreChannelNodeFormReturn {
  const [appState] = useAppState()
  const { account } = appState.account

  const noti = useNotification()

  // @todo: Refactor into singleton
  const manager = useMemo(() => new NodeManager(account), [account])

  const onSubmit = useCallback(
    async (state: UseEditCoreChannelNodeFormState) => {
      if (!manager) throw new Error('Manager not ready')

      await manager.updateCoreChannelNode(state)
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
    },
    [noti],
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
  const values = useWatch({ control }) as UseEditCoreChannelNodeFormState

  const nameCtrl = useController({
    control,
    name: 'name',
  })

  const descriptionCtrl = useController({
    control,
    name: 'description',
  })

  const multiaddressCtrl = useController({
    control,
    name: 'multiaddress',
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
    multiaddressCtrl,
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
