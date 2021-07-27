import { AxiosError } from 'axios'
import { useQuery, UseQueryOptions } from 'react-query'
import { FruitsOrder } from 'types/orders'
import authAxios from 'utils/authAxios'

const useFruitsOrder = <T = FruitsOrder>(
  fruitOrderId: number,
  options?: UseQueryOptions<FruitsOrder, AxiosError, T>
) => {
  return useQuery(
    ['fruitsOrder', fruitOrderId],
    async () => {
      const { data } = await authAxios.get<FruitsOrder>('/api/orders/fruits/' + fruitOrderId)
      return data
    },
    {
      refetchOnWindowFocus: false,
      ...options
    }
  )
}

export default useFruitsOrder
