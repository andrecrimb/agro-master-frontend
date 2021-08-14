import { useMutation, useQueryClient } from 'react-query'
import { useSnackbar } from 'notistack'
import authAxios from 'utils/authAxios'
import { useTranslation } from 'react-i18next'
import { AxiosError } from 'axios'
import { OrderRequest } from 'types/orders'

const useAddOrder = () => {
  const { t } = useTranslation()
  const { enqueueSnackbar } = useSnackbar()
  const client = useQueryClient()

  return useMutation<OrderRequest, AxiosError, OrderRequest>(
    async (reqBody: OrderRequest) => {
      const { data } = await authAxios.post<OrderRequest>('/api/orders', reqBody)
      return data
    },
    {
      onSuccess: (_, orderRequest) => {
        enqueueSnackbar(t('new_order_added'), { variant: 'success' })
        client.invalidateQueries(['orders', orderRequest.type])
      },
      onError: () => {
        enqueueSnackbar(t('new_order_error'), { variant: 'error' })
      }
    }
  )
}

export default useAddOrder
