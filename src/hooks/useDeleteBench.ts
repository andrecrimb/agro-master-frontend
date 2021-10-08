import { useMutation, useQueryClient } from 'react-query'
import authAxios from 'utils/authAxios'
import { useSnackbar } from 'notistack'
import { useTranslation } from 'react-i18next'

type ReqVars = {
  benchId: number
  greenhouseId: number
}

const useDeleteBench = () => {
  const { t } = useTranslation()
  const { enqueueSnackbar } = useSnackbar()
  const client = useQueryClient()

  return useMutation(
    async (vars: ReqVars) => {
      const { data } = await authAxios.delete(
        `/api/greenhouses/${vars.greenhouseId}/benches/${vars.benchId}`
      )
      return data
    },
    {
      onSuccess: () => {
        enqueueSnackbar(t('delete_bench_success'), { variant: 'success' })
        client.invalidateQueries('greenhouses')
      },
      onError: () => {
        enqueueSnackbar(t('delete_bench_error'), { variant: 'error' })
      }
    }
  )
}

export default useDeleteBench
