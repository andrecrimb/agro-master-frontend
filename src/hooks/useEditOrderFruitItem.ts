import { useMutation, useQueryClient } from 'react-query'
import authAxios from 'utils/authAxios'
import { AxiosError } from 'axios'
import { FruitOrderItem } from 'types/orders'
import { useSnackbar } from 'notistack'
import { useTranslation } from 'react-i18next'

export type ReqBody = Omit<FruitOrderItem, 'id' | 'orderId'>

const useEditOrderFruitItem = (fruitOrderItemId: number, orderId: number) => {
  const client = useQueryClient()
  const { enqueueSnackbar } = useSnackbar()
  const { t } = useTranslation()

  return useMutation<any, AxiosError, ReqBody>(
    async (reqBody: ReqBody) => {
      const { data } = await authAxios.put(
        `/api/orders/${orderId}/fruitOrderItems/${fruitOrderItemId}`,
        reqBody
      )
      return data
    },
    {
      onSuccess: () => {
        client.invalidateQueries(['order', orderId])
      },
      onError: e => {
        enqueueSnackbar(t('edit_order_item_error'), { variant: 'error' })
      }
    }
  )
}

export default useEditOrderFruitItem
