import { AxiosError } from 'axios'
import { useQuery, UseQueryOptions } from 'react-query'
import { FruitsOrder } from 'types/orders'
import authAxios from 'utils/authAxios'

const getFruitsOrders = async () => {
  const { data } = await authAxios.get<FruitsOrder[]>('/api/orders/fruits')
  return data
}

const useFruitOrders = <T = FruitsOrder[]>(
  options?: UseQueryOptions<FruitsOrder[], AxiosError, T>
) => {
  return useQuery('fruits_orders', getFruitsOrders, {
    refetchOnWindowFocus: false,
    ...options
  })
}

export default useFruitOrders
