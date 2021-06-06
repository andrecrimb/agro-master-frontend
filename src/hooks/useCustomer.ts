import { AxiosError } from 'axios'
import { useQuery, UseQueryOptions } from 'react-query'
import { Customer } from 'types/customer'
import authAxios from 'utils/authAxios'

const useCustomer = <T = Customer>(
  customerId: number,
  options?: UseQueryOptions<Customer, AxiosError, T>
) => {
  return useQuery(
    ['customer', customerId],
    async () => {
      const { data } = await authAxios.get<Customer>('/api/customers/' + customerId)
      return data
    },
    {
      refetchOnWindowFocus: false,
      ...options
    }
  )
}

export default useCustomer
