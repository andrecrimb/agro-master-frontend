import { useMutation, useQueryClient } from 'react-query'
import authAxios from 'utils/authAxios'
import { useTranslation } from 'react-i18next'
import { useSnackbar } from 'notistack'
import { AxiosError } from 'axios'
import { Customer } from 'types/customer'

export type AddCustomerRequest = {
  name: string
  nickname: string
  active: boolean

  address: string
  zip: string
  city: string
  state: string

  phoneNumbers?: { number: string; label: string }[]
}

const useAddCustomer = () => {
  const { t } = useTranslation()
  const { enqueueSnackbar } = useSnackbar()
  const client = useQueryClient()

  return useMutation<Customer, AxiosError, AddCustomerRequest>(
    async (reqBody: AddCustomerRequest) => {
      const { data } = await authAxios.post('/api/customers', reqBody)
      return data
    },
    {
      onSuccess: () => {
        enqueueSnackbar(t('new_customer_added'), { variant: 'success' })
        client.invalidateQueries('customers')
      },
      onError: () => {
        enqueueSnackbar(t('new_customer_error'), { variant: 'error' })
      }
    }
  )
}

export default useAddCustomer
