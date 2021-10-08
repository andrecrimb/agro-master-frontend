import { AxiosError } from 'axios'
import { useQuery, UseQueryOptions } from 'react-query'
import { Greenhouse } from 'types/greenhouse'
import authAxios from 'utils/authAxios'
import qs from 'query-string'
import { ApiFilters } from 'types/greenhouse'

const getGreenhouses = async (filters: ApiFilters = {}) => {
  const query = qs.stringify(filters, {
    arrayFormat: 'comma',
    skipEmptyString: true,
    skipNull: true
  })

  const { data } = await authAxios.get<Greenhouse[]>(`/api/greenhouses/?${query}`)
  return data
}

const useGreenhouses = <T = Greenhouse[]>(
  filters?: ApiFilters,
  options?: UseQueryOptions<Greenhouse[], AxiosError, T>
) => {
  const key = filters ? ['greenhouses', filters] : 'greenhouses'
  return useQuery(key, () => getGreenhouses(filters), {
    refetchOnWindowFocus: false,
    ...options
  })
}

export default useGreenhouses
