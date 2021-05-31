import { AxiosError } from 'axios'
import { useQuery, UseQueryOptions } from 'react-query'
import { User } from 'types/user'
import authAxios from 'utils/authAxios'

const getUser = async (id: number) => {
  const { data } = await authAxios.get<User>('/api/users/' + id)
  return data
}

const useUser = <T = User>(id: number, options?: UseQueryOptions<User, AxiosError, T>) => {
  return useQuery(['user', id], () => getUser(id), {
    refetchOnWindowFocus: false,
    ...options
  })
}

export default useUser
