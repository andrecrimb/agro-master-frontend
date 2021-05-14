import { useMutation, useQueryClient } from 'react-query'
import { AddUserRequest } from 'types/user'
import authAxios from 'utils/authAxios'
import { useTranslation } from 'react-i18next'
import { useSnackbar } from 'notistack'
import { AxiosError } from 'axios'

const useAddUser = () => {
  const { t } = useTranslation()
  const { enqueueSnackbar } = useSnackbar()
  const client = useQueryClient()

  return useMutation<any, AxiosError, any>(
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
