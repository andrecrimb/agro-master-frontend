import { AxiosError } from 'axios'
import { useQuery, UseQueryOptions } from 'react-query'
import { User } from 'types/user'
import authAxios from 'utils/authAxios'

const getAuthUser = async () => {
  const { data } = await authAxios.get<User>('/api/authuser')
  return data
}

const useAuthUser = <T = User>(options?: UseQueryOptions<User, AxiosError, T>) => {
  return useQuery('authUser', getAuthUser, {
    cacheTime: Infinity,
    staleTime: Infinity,
    retry: false,
    refetchOnWindowFocus: false,
    ...options
  })
}

export default useAuthUser
