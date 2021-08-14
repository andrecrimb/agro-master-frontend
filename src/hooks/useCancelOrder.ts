import { useMutation, useQueryClient } from 'react-query'
import { useSnackbar } from 'notistack'
import authAxios from 'utils/authAxios'
import { useTranslation } from 'react-i18next'
import { OrderRequest } from 'types/orders'

const useCancelOrder = (orderId: number) => {
  const { t } = useTranslation()
  const { enqueueSnackbar } = useSnackbar()
  const client = useQueryClient()

  return useMutation(
    async () => {
      const { data } = await authAxios.put<OrderRequest>(`/api/orders/${orderId}/cancel`)
      return data
    },
    {
      onSuccess: () => {
        enqueueSnackbar(t('order_canceled_success'), { variant: 'success' })
        client.invalidateQueries(['order', orderId])
        client.invalidateQueries('orders')
      },
      onError: () => {
        enqueueSnackbar(t('order_canceled_error'), { variant: 'error' })
      }
    }
  )
}

export default useCancelOrder
