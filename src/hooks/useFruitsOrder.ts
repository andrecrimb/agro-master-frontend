import { AxiosError } from 'axios'
import { useQuery, UseQueryOptions } from 'react-query'
import { FruitsOrder } from 'types/orders'
import authAxios from 'utils/authAxios'

const useFruitsOrder = <T = FruitsOrder>(
  orderId: number,
  options?: UseQueryOptions<FruitsOrder, AxiosError, T>
) => {
  return useQuery(
    ['fruitsOrder', orderId],
    async () => {
      const { data } = await authAxios.get<FruitsOrder>('/api/orders/fruits/' + orderId)
      return data
    },
    {
      refetchOnWindowFocus: false,
      ...options
    }
  )
}

export default useFruitsOrder
