import { useMutation, useQueryClient } from 'react-query'
import authAxios from 'utils/authAxios'
import { useTranslation } from 'react-i18next'
import { useSnackbar } from 'notistack'
import { AxiosError } from 'axios'

export type AddPropertyRequest = {
  producerName: string
  name: string
  cnpj: string
  cpf: string
  ie: string
  address: string
  zip: string
  city: string
  state: string
}

const useAddCustomerProperty = (customerId: number) => {
  const { t } = useTranslation()
  const { enqueueSnackbar } = useSnackbar()
  const client = useQueryClient()

  return useMutation<any, AxiosError, AddPropertyRequest>(
    async (reqBody: AddPropertyRequest) => {
      const { data } = await authAxios.post(`/api/customers/${customerId}/properties`, reqBody)
      return data
    },
    {
      onSuccess: () => {
        enqueueSnackbar(t('add_property_success'), { variant: 'success' })
        client.invalidateQueries(['customer', customerId])
      },
      onError: () => {
        enqueueSnackbar(t('add_property_error'), { variant: 'error' })
      }
    }
  )
}

export default useAddCustomerProperty
