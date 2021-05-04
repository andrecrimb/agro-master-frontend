import Axios from 'axios'
import { useQuery, UseQueryOptions } from 'react-query'
import { User } from 'types/user'

const getUser = async () => {
  const { data } = await Axios.get<User>('/api/users')
}
