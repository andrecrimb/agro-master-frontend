import { useMutation, useQueryClient } from 'react-query'
import authAxios from 'utils/authAxios'
import { AxiosError } from 'axios'
import { Payment } from 'types/orders'
import { useSnackbar } from 'notistack'
import { useTranslation } from 'react-i18next'

export type PaymentVars = Omit<Payment, 'id' | 'orderId'>

const useEditOrderPayment = (paymentId: number, orderId: number) => {
  const { t } = useTranslation()
  const client = useQueryClient()
  const { enqueueSnackbar } = useSnackbar()

  return useMutation<any, AxiosError, PaymentVars>(
    async (reqBody: PaymentVars) => {
      const { data } = await authAxios.patch(
        `/api/orders/${orderId}/payments/${paymentId}`,
        reqBody
      )
      return data
    },
    {
      onSuccess: () => {
        client.invalidateQueries(['order', orderId])
      },
      onError: e => {
        enqueueSnackbar(t('edit_order_payment_error'), { variant: 'error' })
      }
    }
  )
}

export default useEditOrderPayment
