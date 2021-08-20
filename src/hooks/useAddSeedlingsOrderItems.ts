import { useMutation, useQueryClient } from 'react-query'
import { useSnackbar } from 'notistack'
import authAxios from 'utils/authAxios'
import { useTranslation } from 'react-i18next'
import { AxiosError } from 'axios'
import { SeedlingBenchOrderItem, Order } from 'types/orders'

type ReqBody = {
  seedlingBenchId: number
  quantity: number
  unityPrice: number
}[]

const useAddSeedlingsOrderItems = (orderId: number) => {
  const { t } = useTranslation()
  const { enqueueSnackbar } = useSnackbar()
  const client = useQueryClient()

  return useMutation<Order, AxiosError, ReqBody>(
    async (reqBody: ReqBody) => {
      const { data } = await authAxios.post<Order>(
        `/api/orders/${orderId}/seedlingsOrderItems`,
        reqBody
      )
      return data
    },
    {
      onSuccess: () => {
        enqueueSnackbar(t('add_order_items_success'), { variant: 'success' })
        client.invalidateQueries(['orders', 'seedling'])
        client.invalidateQueries(['order', orderId])
      },
      onError: () => {
        enqueueSnackbar(t('add_order_items_error'), { variant: 'error' })
      }
    }
  )
}

export default useAddSeedlingsOrderItems
