import { useMutation, useQueryClient } from 'react-query'
import authAxios from 'utils/authAxios'
import { useTranslation } from 'react-i18next'
import { useSnackbar } from 'notistack'
import { AxiosError } from 'axios'
import { User } from 'types/user'

export type AddUserRequest = {
  firstName: string
  lastName: string
  nickname: string
  email: string
  password: string
  isSuperuser: boolean
  active: boolean
  phoneNumbers?: {
    label: string
    number: string
  }[]
}

const useAddUser = () => {
  const { t } = useTranslation()
  const { enqueueSnackbar } = useSnackbar()
  const client = useQueryClient()

  return useMutation<User[], AxiosError, AddUserRequest>(
    async (reqBody: AddUserRequest) => {
      const { data } = await authAxios.post('/api/user', reqBody)
      return data
    },
    {
      onSuccess: () => {
        enqueueSnackbar(t('newUserAdded'), { variant: 'success' })
        client.invalidateQueries('users')
      },
      onError: () => {
        enqueueSnackbar(t('newUserError'), { variant: 'error' })
      }
    }
  )
}

export default useAddUser
