import { AxiosError } from 'axios'
import { useQuery, UseQueryOptions } from 'react-query'
import { Greenhouse } from 'types/greenhouse'
import authAxios from 'utils/authAxios'

const useGreenhouse = <T = Greenhouse>(
  greenhouseId: number,
  options?: UseQueryOptions<Greenhouse, AxiosError, T>
) => {
  return useQuery(
    ['greenhouse', greenhouseId],
    async () => {
      const { data } = await authAxios.get<Greenhouse>('/api/greenhouses/' + greenhouseId)
      return data
    },
    {
      refetchOnWindowFocus: false,
      ...options
    }
  )
}

export default useGreenhouse
