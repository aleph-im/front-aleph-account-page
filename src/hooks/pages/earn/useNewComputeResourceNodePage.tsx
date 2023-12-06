import useConnectedWard from '@/hooks/common/useConnectedWard'
import {
  UseNewComputeResourceNodeFormReturn,
  useNewComputeResourceNodeForm,
} from '@/hooks/form/useNewComputeResourceNodeForm'

export type UseNewComputeResourceNodePage = UseNewComputeResourceNodeFormReturn

export function useNewComputeResourceNodePage(): UseNewComputeResourceNodePage {
  useConnectedWard()

  return useNewComputeResourceNodeForm()
}
