import { useMutation, useQueryClient } from 'react-query'
import authAxios from 'utils/authAxios'
import { useTranslation } from 'react-i18next'
import { useSnackbar } from 'notistack'
import { AxiosError } from 'axios'
import { Greenhouse } from 'types/greenhouse'

export type EditRequest = {
  greenhouseId: number
  benchId: number
  data: {
    label: string
    quantity: number
    lastPlantingDate: string
    firstPaymentDate: string
    rootstockId: number
    userId: number
  }
}

const useEditBench = () => {
  const { t } = useTranslation()
  const { enqueueSnackbar } = useSnackbar()
  const client = useQueryClient()

  return useMutation<Greenhouse, AxiosError, EditRequest>(
    async (vars: EditRequest) => {
      const { data } = await authAxios.put(
        `/api/greenhouses/${vars.greenhouseId}/benches/${vars.benchId}`,
        {
          ...vars.data,
          greenhouseId: vars.greenhouseId,
          benchId: vars.benchId
        }
      )
      return data
    },
    {
      onSuccess: (_, vars) => {
        enqueueSnackbar(t('edit_bench_success'), { variant: 'success' })
        client.invalidateQueries(['greenhouse', vars.greenhouseId])
      },
      onError: () => {
        enqueueSnackbar(t('edit_bench_error'), { variant: 'error' })
      }
    }
  )
}

export default useEditBench
