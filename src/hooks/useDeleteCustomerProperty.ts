import { useMutation, useQueryClient } from 'react-query'
import authAxios from 'utils/authAxios'
import { useSnackbar } from 'notistack'
import { useTranslation } from 'react-i18next'

type ReqVars = {
  propertyId: number
  customerId: number
}

const useDeleteCustomerProperty = () => {
  const { t } = useTranslation()
  const { enqueueSnackbar } = useSnackbar()
  const client = useQueryClient()

  return useMutation(
    async (vars: ReqVars) => {
      const { data } = await authAxios.delete(
        `/api/customers/${vars.customerId}/properties/${vars.propertyId}`
      )
      return data
    },
    {
      onSuccess: (_, vars) => {
        enqueueSnackbar(t('delete_property_success'), { variant: 'success' })
        client.invalidateQueries(['customer', vars.customerId])
      },
      onError: () => {
        enqueueSnackbar(t('delete_property_error'), { variant: 'error' })
      }
    }
  )
}

export default useDeleteCustomerProperty
