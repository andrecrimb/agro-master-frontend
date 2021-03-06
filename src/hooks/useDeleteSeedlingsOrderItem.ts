import { useMutation, useQueryClient } from 'react-query'
import authAxios from 'utils/authAxios'
import { useSnackbar } from 'notistack'
import { useTranslation } from 'react-i18next'

const useDeleteSeedlingsOrderItem = (orderItemId: number, orderId: number) => {
  const client = useQueryClient()
  const { t } = useTranslation()
  const { enqueueSnackbar } = useSnackbar()

  return useMutation(
    async () => {
      const { data } = await authAxios.delete(
        `/api/orders/${orderId}/seedlingsOrderItems/${orderItemId}`
      )
      return data
    },
    {
      onSuccess: () => {
        client.invalidateQueries(['order', orderId])
      },
      onError: () => {
        enqueueSnackbar(t('delete_order_item_error'), { variant: 'error' })
      }
    }
  )
}

export default useDeleteSeedlingsOrderItem
