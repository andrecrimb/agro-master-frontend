import { useMutation, useQueryClient } from 'react-query'
import authAxios from 'utils/authAxios'
import { useTranslation } from 'react-i18next'
import { useSnackbar } from 'notistack'
import { AxiosError } from 'axios'
import { Greenhouse } from 'types/greenhouse'

export type AddRequest = {
  greenhouseId: number
  data: {
    label: string
    quantity: number
    lastPlantingDate: string
    firstPaymentDate: string
    rootstockId: number
    userId: number
  }
}

const useAddBench = () => {
  const { t } = useTranslation()
  const { enqueueSnackbar } = useSnackbar()
  const client = useQueryClient()

  return useMutation<Greenhouse, AxiosError, AddRequest>(
    async (vars: AddRequest) => {
      const { data } = await authAxios.post(
        '/api/greenhouses/' + vars.greenhouseId + '/benches',
        vars.data
      )
      return data
    },
    {
      onSuccess: (_, vars) => {
        enqueueSnackbar(t('add_bench_success'), { variant: 'success' })
        client.invalidateQueries(['greenhouse', vars.greenhouseId])
      },
      onError: () => {
        enqueueSnackbar(t('add_bench_error'), { variant: 'error' })
      }
    }
  )
}

export default useAddBench
