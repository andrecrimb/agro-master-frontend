import { useMutation, useQueryClient } from 'react-query'
import authAxios from 'utils/authAxios'
import { useSnackbar } from 'notistack'
import { useTranslation } from 'react-i18next'

const useDeletePayment = (paymentId: number, orderId: number) => {
  const client = useQueryClient()
  const { t } = useTranslation()
  const { enqueueSnackbar } = useSnackbar()

  return useMutation(
    async () => {
      const { data } = await authAxios.delete(`/api/orders/${orderId}/payments/${paymentId}`)
      return data
    },
    {
      onSuccess: (_, vars) => {
        client.invalidateQueries(['fruitsOrder', orderId])
      },
      onError: err => {
        enqueueSnackbar(t('remove_payment_error'), { variant: 'error' })
      }
    }
  )
}

export default useDeletePayment
