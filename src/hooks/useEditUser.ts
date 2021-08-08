import { useMutation, useQueryClient } from 'react-query'
import authAxios from 'utils/authAxios'
import { useTranslation } from 'react-i18next'
import { useSnackbar } from 'notistack'
import { AxiosError } from 'axios'

export type EditUserRequest = {
  id: number
  data: {
    name?: string
    email?: string
    password?: string
    isSuperuser?: boolean
    active?: boolean
    phoneNumbers?: {
      label?: string
      number?: string
    }[]
  }
}

const useEditUser = () => {
  const { t } = useTranslation()
  const { enqueueSnackbar } = useSnackbar()
  const client = useQueryClient()

  return useMutation<any, AxiosError, EditUserRequest>(
    async (reqBody: EditUserRequest) => {
      const { data } = await authAxios.patch('/api/users/' + reqBody.id, reqBody.data)
      return data
    },
    {
      onSuccess: (_, vars) => {
        enqueueSnackbar(t('user_edit_success'), { variant: 'success' })
        client.invalidateQueries('users')
        client.invalidateQueries(['user', vars.id])
      },
      onError: () => {
        enqueueSnackbar(t('user_edit_error'), { variant: 'error' })
      }
    }
  )
}

export default useEditUser
