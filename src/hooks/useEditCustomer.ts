import { useMutation, useQueryClient } from 'react-query'
import authAxios from 'utils/authAxios'
import { useTranslation } from 'react-i18next'
import { useSnackbar } from 'notistack'
import { AxiosError } from 'axios'

export type EditCustomerRequest = {
  id: number
  data: Partial<{
    name: string
    nickname: string
    active: boolean
    address: string
    zip: string
    city: string
    state: string
    phoneNumbers?: { number: string; label: string }[]
  }>
}

const useEditCustomer = () => {
  const { t } = useTranslation()
  const { enqueueSnackbar } = useSnackbar()
  const client = useQueryClient()

  return useMutation<any, AxiosError, EditCustomerRequest>(
    async (reqBody: EditCustomerRequest) => {
      const { data } = await authAxios.patch('/api/customers/' + reqBody.id, reqBody.data)
      return data
    },
    {
      onSuccess: (_, vars) => {
        enqueueSnackbar(t('customer_edit_success'), { variant: 'success' })
        client.invalidateQueries('customers')
        client.invalidateQueries(['customer', vars.id])
      },
      onError: () => {
        enqueueSnackbar(t('customer_edit_error'), { variant: 'error' })
      }
    }
  )
}

export default useEditCustomer
