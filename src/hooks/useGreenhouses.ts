import { AxiosError } from 'axios'
import { useQuery, UseQueryOptions } from 'react-query'
import { Greenhouse } from 'types/greenhouse'
import authAxios from 'utils/authAxios'

const useGreenhouses = <T = Greenhouse[]>(
  options?: UseQueryOptions<Greenhouse[], AxiosError, T>
) => {
  return useQuery(
    'greenhouses',
    async () => {
      const { data } = await authAxios.get<Greenhouse[]>('/api/greenhouses')
      return data
    },
    {
      refetchOnWindowFocus: false,
      ...options
    }
  )
}

export default useGreenhouses
