import { useMutation, useQueryClient } from 'react-query'
import authAxios from 'utils/authAxios'
import { useTranslation } from 'react-i18next'
import { useSnackbar } from 'notistack'
import { AxiosError } from 'axios'
import { Payment } from 'types/orders'

export type PaymentItems = Omit<Payment, 'id' | 'orderId'>[]

const useAddOrderPayment = (orderId: number) => {
  const { t } = useTranslation()
  const { enqueueSnackbar } = useSnackbar()
  const client = useQueryClient()

  return useMutation<any, AxiosError, PaymentItems>(
    async (reqBody: PaymentItems) => {
      const { data } = await authAxios.post(`/api/orders/${orderId}/payments`, reqBody)
      return data
    },
    {
      onSuccess: () => {
        enqueueSnackbar(t('add_payment_success'), { variant: 'success' })
        client.invalidateQueries(['order', orderId])
        client.invalidateQueries('orders')
      },
      onError: () => {
        enqueueSnackbar(t('add_payment_error'), { variant: 'error' })
      }
    }
  )
}

export default useAddOrderPayment
