import { useMutation, useQueryClient } from 'react-query'
import authAxios from 'utils/authAxios'
import { useTranslation } from 'react-i18next'
import { useSnackbar } from 'notistack'
import { AxiosError } from 'axios'

export type EditPropertyRequest = {
  id: number
  data: {
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
}

const useEditOwnerProperty = () => {
  const { t } = useTranslation()
  const { enqueueSnackbar } = useSnackbar()
  const client = useQueryClient()

  return useMutation<any, AxiosError, EditPropertyRequest>(
    async (reqBody: EditPropertyRequest) => {
      const { data } = await authAxios.patch(`/api/owner-properties/${reqBody.id}`, reqBody.data)
      return data
    },
    {
      onSuccess: () => {
        enqueueSnackbar(t('edit_property_success'), { variant: 'success' })
        client.invalidateQueries('owner_properties')
      },
      onError: () => {
        enqueueSnackbar(t('edit_property_error'), { variant: 'error' })
      }
    }
  )
}

export default useEditOwnerProperty
