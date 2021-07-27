import { useMutation, useQueryClient } from 'react-query'
import { useSnackbar } from 'notistack'
import authAxios from 'utils/authAxios'
import { useTranslation } from 'react-i18next'
import { AxiosError } from 'axios'
import { AddFruitOrderRequest } from 'types/orders'

const useAddFruitOrder = () => {
  const { t } = useTranslation()
  const { enqueueSnackbar } = useSnackbar()
  const client = useQueryClient()

  return useMutation<unknown, AxiosError, AddFruitOrderRequest>(
    async (reqBody: AddFruitOrderRequest) => {
      const { data } = await authAxios.post('/api/orders/fruits', reqBody)
      return data
    },
    {
      onSuccess: () => {
        enqueueSnackbar(t('new_order_added'), { variant: 'success' })
        client.invalidateQueries('fruits_orders')
      },
      onError: () => {
        enqueueSnackbar(t('new_order_error'), { variant: 'error' })
      }
    }
  )
}

export default useAddFruitOrder
