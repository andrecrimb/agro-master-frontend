import { useMutation, useQueryClient } from 'react-query'
import authAxios from 'utils/authAxios'
import { useSnackbar } from 'notistack'
import { useTranslation } from 'react-i18next'

type ReqVars = {
  rootstockId: number
}

const useDeleteRootstock = () => {
  const { t } = useTranslation()
  const { enqueueSnackbar } = useSnackbar()
  const client = useQueryClient()

  return useMutation(
    async (vars: ReqVars) => {
      const { data } = await authAxios.delete(`/api/rootstocks/${vars.rootstockId}`)
      return data
    },
    {
      onSuccess: () => {
        enqueueSnackbar(t('delete_rootstock_success'), { variant: 'success' })
        client.invalidateQueries('rootstocks')
      },
      onError: () => {
        enqueueSnackbar(t('delete_rootstock_error'), { variant: 'error' })
      }
    }
  )
}

export default useDeleteRootstock
