import { AxiosError } from 'axios'
import { useQuery, UseQueryOptions } from 'react-query'
import { Rootstock } from 'types/rootstock'
import authAxios from 'utils/authAxios'

const useRootstocks = <T = Rootstock[]>(options?: UseQueryOptions<Rootstock[], AxiosError, T>) => {
  return useQuery(
    'rootstocks',
    async () => {
      const { data } = await authAxios.get<Rootstock[]>('/api/rootstocks')
      return data
    },
    {
      refetchOnWindowFocus: false,
      ...options
    }
  )
}

export default useRootstocks
