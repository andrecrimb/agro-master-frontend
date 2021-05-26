import { useMutation, useQueryClient } from 'react-query'
import authAxios from 'utils/authAxios'
import { useSnackbar } from 'notistack'
import { useTranslation } from 'react-i18next'

type ReqVars = {
  customerId: number
}

const useDeleteCustomer = () => {
  const { t } = useTranslation()
  const { enqueueSnackbar } = useSnackbar()
  const client = useQueryClient()

  return useMutation(
    async (vars: ReqVars) => {
      const { data } = await authAxios.delete(`/api/customers/${vars.customerId}`)
      return data
    },
    {
      onSuccess: () => {
        enqueueSnackbar(t('delete_customer_success'), { variant: 'success' })
        client.invalidateQueries('customers')
      },
      onError: () => {
        enqueueSnackbar(t('delete_customer_error'), { variant: 'error' })
      }
    }
  )
}

export default useDeleteCustomer
