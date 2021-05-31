import { AxiosError } from 'axios'
import { useQuery, UseQueryOptions } from 'react-query'
import { OwnerProperty } from 'types/property'
import authAxios from 'utils/authAxios'

const getOwnerProperty = async (propertyId: number) => {
  const { data } = await authAxios.get<OwnerProperty>('/api/owner-properties/' + propertyId)
  return data
}

const useOwnerProperty = <T = OwnerProperty>(
  propertyId: number,
  options?: UseQueryOptions<OwnerProperty, AxiosError, T>
) => {
  return useQuery(['owner_property', propertyId], () => getOwnerProperty(propertyId), {
    refetchOnWindowFocus: false,
    ...options
  })
}

export default useOwnerProperty
