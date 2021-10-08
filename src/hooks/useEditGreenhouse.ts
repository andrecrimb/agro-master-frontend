import { useMutation, useQueryClient } from 'react-query'
import authAxios from 'utils/authAxios'
import { useTranslation } from 'react-i18next'
import { useSnackbar } from 'notistack'
import { AxiosError } from 'axios'
import { GreenhouseType } from 'types/greenhouse'

export type EditGreenhouseRequest = {
  id: number
  data: {
    label: string
    type: GreenhouseType
    ownerPropertyId: number
  }
}

const useEditGreenhouse = () => {
  const { t } = useTranslation()
  const { enqueueSnackbar } = useSnackbar()
  const client = useQueryClient()

  return useMutation<any, AxiosError, EditGreenhouseRequest>(
    async (reqBody: EditGreenhouseRequest) => {
      const { data } = await authAxios.patch('/api/greenhouses/' + reqBody.id, reqBody.data)
      return data
    },
    {
      onSuccess: () => {
        enqueueSnackbar(t('edit_greenhouse_success'), { variant: 'success' })
        client.invalidateQueries('greenhouses')
      },
      onError: () => {
        enqueueSnackbar(t('edit_greenhouse_error'), { variant: 'error' })
      }
    }
  )
}

export default useEditGreenhouse
