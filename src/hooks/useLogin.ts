import axios, { AxiosError } from 'axios'
import { useSnackbar } from 'notistack'
import { useTranslation } from 'react-i18next'
import { useMutation, useQueryClient } from 'react-query'
import { Login, User } from 'types/user'
import authAxios from 'utils/authAxios'

type LoginResponse = {
  token: string
  email: string
  id: number
}

const useLogin = () => {
  const { t } = useTranslation()
  const { enqueueSnackbar } = useSnackbar()
  const client = useQueryClient()

  return useMutation(
    async (reqBody: Login) => {
      const { data: loginResponse } = await axios.post<LoginResponse>('/api/login', reqBody)

      localStorage.setItem('jwt', loginResponse.token)

      const { data } = await authAxios.get<User>('/api/authuser')
      client.setQueryData<User>('authUser', data)

      return data
    },
    {
      onSuccess: async res => {
        enqueueSnackbar(t('welcomeUser', { user: res.email }), { variant: 'success' })
      },
      onError: (res: AxiosError) => {
        enqueueSnackbar(t('invalidUser'), { variant: 'error' })
      }
    }
  )
}

export default useLogin
