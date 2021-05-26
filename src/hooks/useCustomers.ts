import { AxiosError } from 'axios'
import { useQuery, UseQueryOptions } from 'react-query'
import { Customer } from 'types/customer'
import authAxios from 'utils/authAxios'

const useCustomers = <T = Customer[]>(options?: UseQueryOptions<Customer[], AxiosError, T>) => {
  return useQuery(
    'customers',
    async () => {
      const { data } = await authAxios.get<Customer[]>('/api/customers')
      return data
    },
    {
      refetchOnWindowFocus: false,
      ...options
    }
  )
}

export default useCustomers
