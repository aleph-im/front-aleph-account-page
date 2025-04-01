import {
  UseNewCoreChannelNodeFormReturn,
  useNewCoreChannelNodeForm,
} from '@/hooks/form/useNewCoreChannelNodeForm'

export type UseNewCoreChannelNodePage = UseNewCoreChannelNodeFormReturn

export function useNewCoreChannelNodePage(): UseNewCoreChannelNodePage {
  return useNewCoreChannelNodeForm()
}
