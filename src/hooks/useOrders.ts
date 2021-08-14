import { AxiosError } from 'axios'
import { useQuery, UseQueryOptions } from 'react-query'
import { Order, OrderType } from 'types/orders'
import authAxios from 'utils/authAxios'

const useOrders = <T = Order[]>(
  type: OrderType,
  options?: UseQueryOptions<Order[], AxiosError, T>
) => {
  return useQuery(
    ['orders', type],
    async () => {
      const { data } = await authAxios.get<Order[]>('/api/orders/?type=' + type)
      return data
    },
    {
      refetchOnWindowFocus: false,
      ...options
    }
  )
}

export default useOrders
