import { useMutation, useQueryClient } from 'react-query'
import authAxios from 'utils/authAxios'
import { useTranslation } from 'react-i18next'
import { useSnackbar } from 'notistack'
import { AxiosError } from 'axios'

export type EditRootstockRequest = {
  id: number
  data: Partial<{ name: string }>
}

const useEditRootstock = () => {
  const { t } = useTranslation()
  const { enqueueSnackbar } = useSnackbar()
  const client = useQueryClient()

  return useMutation<any, AxiosError, EditRootstockRequest>(
    async (reqBody: EditRootstockRequest) => {
      const { data } = await authAxios.patch('/api/rootstocks/' + reqBody.id, reqBody.data)
      return data
    },
    {
      onSuccess: () => {
        enqueueSnackbar(t('rootstock_edit_success'), { variant: 'success' })
        client.invalidateQueries('rootstocks')
      },
      onError: () => {
        enqueueSnackbar(t('rootstock_edit_error'), { variant: 'error' })
      }
    }
  )
}

export default useEditRootstock
