import useConnectedWard from '@/hooks/common/useConnectedWard'
import {
  UseNewCoreChannelNodeFormReturn,
  useNewCoreChannelNodeForm,
} from '@/hooks/form/useNewCoreChannelNodeForm'

export type UseNewCoreChannelNodePage = UseNewCoreChannelNodeFormReturn

export function useNewCoreChannelNodePage(): UseNewCoreChannelNodePage {
  useConnectedWard()

  return useNewCoreChannelNodeForm()
}
