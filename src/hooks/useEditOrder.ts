import { useMutation, useQueryClient } from 'react-query'
import { useSnackbar } from 'notistack'
import authAxios from 'utils/authAxios'
import { useTranslation } from 'react-i18next'
import { OrderRequest } from 'types/orders'
import { AxiosError } from 'axios'

const useEditOrder = (orderId: number) => {
  const { t } = useTranslation()
  const { enqueueSnackbar } = useSnackbar()
  const client = useQueryClient()

  return useMutation<OrderRequest, AxiosError, OrderRequest>(
    async ({ type, ...reqBody }: OrderRequest) => {
      const { data } = await authAxios.put<OrderRequest>('/api/orders/' + orderId, reqBody)
      return data
    },
    {
      onSuccess: () => {
        enqueueSnackbar(t('edit_order_success'), { variant: 'success' })
        client.invalidateQueries(['order', orderId])
        client.invalidateQueries('orders')
      },
      onError: () => {
        enqueueSnackbar(t('edit_order_error'), { variant: 'error' })
      }
    }
  )
}

export default useEditOrder
