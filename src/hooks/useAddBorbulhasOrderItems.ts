import { useMutation, useQueryClient } from 'react-query'
import { useSnackbar } from 'notistack'
import authAxios from 'utils/authAxios'
import { useTranslation } from 'react-i18next'
import { AxiosError } from 'axios'
import { Order } from 'types/orders'

type ReqBody = {
  name: string
  quantity: number
  unityPrice: number
  greenhouseId: number
}[]

const useAddBorbulhasOrderItems = (orderId: number) => {
  const { t } = useTranslation()
  const { enqueueSnackbar } = useSnackbar()
  const client = useQueryClient()

  return useMutation<Order, AxiosError, ReqBody>(
    async (reqBody: ReqBody) => {
      const { data } = await authAxios.post<Order>(
        `/api/orders/${orderId}/borbulhasOrderItems`,
        reqBody
      )
      return data
    },
    {
      onSuccess: () => {
        enqueueSnackbar(t('add_order_items_success'), { variant: 'success' })
        client.invalidateQueries(['orders', 'borbulha'])
        client.invalidateQueries(['order', orderId])
      },
      onError: () => {
        enqueueSnackbar(t('add_order_items_error'), { variant: 'error' })
      }
    }
  )
}

export default useAddBorbulhasOrderItems
