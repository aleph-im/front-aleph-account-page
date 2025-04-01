import {
  UseNewComputeResourceNodeFormReturn,
  useNewComputeResourceNodeForm,
} from '@/hooks/form/useNewComputeResourceNodeForm'

export type UseNewComputeResourceNodePage = UseNewComputeResourceNodeFormReturn

export function useNewComputeResourceNodePage(): UseNewComputeResourceNodePage {
  return useNewComputeResourceNodeForm()
}
