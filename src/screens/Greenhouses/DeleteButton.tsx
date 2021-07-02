import React from 'react'
import useDialog from 'hooks/useDialog'
import { MenuItem } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import useGreenhouse from 'hooks/useGreenhouse'
import useDeleteGreenhouse from 'hooks/useDeleteGreenhouse'
import useUrlSearch from 'hooks/useUrlSearch'

type Props = {
  greenhouseId: number
  onClick: () => void
}

const DeleteButton: React.FC<Props> = ({ onClick, greenhouseId }) => {
  const { t } = useTranslation()
  const { setParams } = useUrlSearch({ params: [] })

  const { data: greenhouse } = useGreenhouse(greenhouseId)
  const { newDialog } = useDialog()
  const deleteGreenhouse = useDeleteGreenhouse()

  return (
    <MenuItem
      onClick={() => {
        newDialog({
          title: t('warning') + '!',
          message: t('delete_question', {
            item: greenhouse?.label
          }),
          confirmationButton: {
            text: t('delete'),
            onClick: () =>
              deleteGreenhouse.mutateAsync(
                { greenhouseId },
                { onSuccess: () => setParams({ drawer: null, drawerTab: null, id: null }) }
              )
          }
        })
        onClick()
      }}
    >
      {t('delete_greenhouse')}
    </MenuItem>
  )
}

export default DeleteButton
