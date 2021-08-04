import { useMutation, useQueryClient } from 'react-query'
import authAxios from 'utils/authAxios'
import { AxiosError } from 'axios'
import { Payment } from 'types/orders'

export type PaymentVars = Omit<Payment, 'id' | 'orderId'>

const useEditOrderPayment = (paymentId: number, orderId: number) => {
  const client = useQueryClient()

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
        client.invalidateQueries(['fruitsOrder', orderId])
      },
      onError: e => {
        console.error(e)
      }
    }
  )
}

export default useEditOrderPayment
