import { AxiosError } from 'axios'
import { useQuery, UseQueryOptions } from 'react-query'
import { OwnerProperty } from 'types/property'
import authAxios from 'utils/authAxios'

const getOwnerProperties = async () => {
  const { data } = await authAxios.get<OwnerProperty[]>('/api/owner-properties')
  return data
}

const useOwnerProperties = <T = OwnerProperty[]>(
  options?: UseQueryOptions<OwnerProperty[], AxiosError, T>
) => {
  return useQuery('owner_properties', getOwnerProperties, {
    refetchOnWindowFocus: false,
    ...options
  })
}

export default useOwnerProperties
