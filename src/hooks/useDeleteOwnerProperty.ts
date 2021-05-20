import { useMutation, useQueryClient } from 'react-query'
import authAxios from 'utils/authAxios'
import { useSnackbar } from 'notistack'
import { useTranslation } from 'react-i18next'

type ReqVars = {
  ownerPropertyId: number
}

const useDeleteOwnerProperty = () => {
  const { t } = useTranslation()
  const { enqueueSnackbar } = useSnackbar()
  const client = useQueryClient()

  return useMutation(
    async (vars: ReqVars) => {
      const { data } = await authAxios.delete(`/api/owner-properties/${vars.ownerPropertyId}`)
      return data
    },
    {
      onSuccess: () => {
        enqueueSnackbar(t('delete_property_success'), { variant: 'success' })
        client.invalidateQueries('owner_properties')
      },
      onError: () => {
        enqueueSnackbar(t('delete_property_error'), { variant: 'error' })
      }
    }
  )
}

export default useDeleteOwnerProperty
