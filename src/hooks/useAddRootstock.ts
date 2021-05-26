import { useMutation, useQueryClient } from 'react-query'
import authAxios from 'utils/authAxios'
import { useTranslation } from 'react-i18next'
import { useSnackbar } from 'notistack'
import { AxiosError } from 'axios'
import { Rootstock } from 'types/rootstock'

export type AddRootstockRequest = { name: string }

const useAddRootstock = () => {
  const { t } = useTranslation()
  const { enqueueSnackbar } = useSnackbar()
  const client = useQueryClient()

  return useMutation<Rootstock[], AxiosError, AddRootstockRequest>(
    async (reqBody: AddRootstockRequest) => {
      const { data } = await authAxios.post('/api/rootstocks', reqBody)
      return data
    },
    {
      onSuccess: () => {
        enqueueSnackbar(t('new_rootstock_added'), { variant: 'success' })
        client.invalidateQueries('rootstocks')
      },
      onError: () => {
        enqueueSnackbar(t('new_rootstock_error'), { variant: 'error' })
      }
    }
  )
}

export default useAddRootstock
