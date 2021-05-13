import { AxiosError } from 'axios'
import { useQuery, UseQueryOptions } from 'react-query'
import { User } from 'types/user'
import authAxios from 'utils/authAxios'

const getUsers = async () => {
  const { data } = await authAxios.get<User[]>('/api/users')
  return data
}

const useUsers = <T = User[]>(options?: UseQueryOptions<User[], AxiosError, T>) => {
  return useQuery('users', getUsers, {
    refetchOnWindowFocus: false,
    ...options
  })
}

export default useUsers
