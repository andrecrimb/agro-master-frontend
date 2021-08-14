import { AxiosError } from 'axios'
import { useQuery, UseQueryOptions } from 'react-query'
import { Order } from 'types/orders'
import authAxios from 'utils/authAxios'

const useOrder = <T = Order>(orderId: number, options?: UseQueryOptions<Order, AxiosError, T>) => {
  return useQuery(
    ['order', orderId],
    async () => {
      const { data } = await authAxios.get<Order>('/api/orders/' + orderId)
      return data
    },
    {
      refetchOnWindowFocus: false,
      ...options
    }
  )
}

export default useOrder
