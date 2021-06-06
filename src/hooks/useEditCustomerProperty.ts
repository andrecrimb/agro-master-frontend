import { useMutation, useQueryClient } from 'react-query'
import authAxios from 'utils/authAxios'
import { useTranslation } from 'react-i18next'
import { useSnackbar } from 'notistack'
import { AxiosError } from 'axios'

export type EditPropertyRequest = {
  propertyId: number
  customerId: number
  data: Partial<{
    producerName: string
    name: string
    cnpj: string
    cpf: string
    ie: string
    address: string
    zip: string
    city: string
    state: string
  }>
}

const useEditCustomerProperty = () => {
  const { t } = useTranslation()
  const { enqueueSnackbar } = useSnackbar()
  const client = useQueryClient()

  return useMutation<any, AxiosError, EditPropertyRequest>(
    async (reqBody: EditPropertyRequest) => {
      const { data } = await authAxios.patch(
        `/api/customers/${reqBody.customerId}/properties/${reqBody.propertyId}`,
        reqBody.data
      )
      return data
    },
    {
      onSuccess: (_, vars) => {
        enqueueSnackbar(t('edit_property_success'), { variant: 'success' })
        client.invalidateQueries(['customer', vars.customerId])
      },
      onError: () => {
        enqueueSnackbar(t('edit_property_error'), { variant: 'error' })
      }
    }
  )
}

export default useEditCustomerProperty
