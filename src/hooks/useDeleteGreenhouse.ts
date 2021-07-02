import { useMutation, useQueryClient } from 'react-query'
import authAxios from 'utils/authAxios'
import { useSnackbar } from 'notistack'
import { useTranslation } from 'react-i18next'

type ReqVars = {
  greenhouseId: number
}

const useDeleteGreenhouse = () => {
  const { t } = useTranslation()
  const { enqueueSnackbar } = useSnackbar()
  const client = useQueryClient()

  return useMutation(
    async (vars: ReqVars) => {
      const { data } = await authAxios.delete(`/api/greenhouses/${vars.greenhouseId}`)
      return data
    },
    {
      onSuccess: () => {
        enqueueSnackbar(t('delete_greenhouse_success'), { variant: 'success' })
        client.invalidateQueries('greenhouses')
      },
      onError: () => {
        enqueueSnackbar(t('delete_greenhouse_error'), { variant: 'error' })
      }
    }
  )
}

export default useDeleteGreenhouse
