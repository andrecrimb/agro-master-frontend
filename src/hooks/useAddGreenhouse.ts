import { useMutation, useQueryClient } from 'react-query'
import authAxios from 'utils/authAxios'
import { useTranslation } from 'react-i18next'
import { useSnackbar } from 'notistack'
import { AxiosError } from 'axios'
import { Greenhouse, GreenhouseType } from 'types/greenhouse'

export type AddGreenhouseRequest = {
  label: string
  type: GreenhouseType
  ownerPropertyId: number
}

const useAddGreenhouse = () => {
  const { t } = useTranslation()
  const { enqueueSnackbar } = useSnackbar()
  const client = useQueryClient()

  return useMutation<Greenhouse, AxiosError, AddGreenhouseRequest>(
    async (reqBody: AddGreenhouseRequest) => {
      const { data } = await authAxios.post('/api/greenhouses', reqBody)
      return data
    },
    {
      onSuccess: () => {
        enqueueSnackbar(t('new_greenhouse_added'), { variant: 'success' })
        client.invalidateQueries('greenhouses')
      },
      onError: () => {
        enqueueSnackbar(t('new_greenhouse_error'), { variant: 'error' })
      }
    }
  )
}

export default useAddGreenhouse
