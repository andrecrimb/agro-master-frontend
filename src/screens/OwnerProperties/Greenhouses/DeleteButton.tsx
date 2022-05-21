import React from 'react'
import useDialog from 'hooks/useDialog'
import { MenuItem } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import useDeleteGreenhouse from 'hooks/useDeleteGreenhouse'
import { Greenhouse } from 'types/greenhouse'
import { useSearchParams } from 'react-router-dom'

type Props = {
  greenhouse: Greenhouse
  onClick: () => void
}

const DeleteButton: React.FC<Props> = ({ onClick, greenhouse }) => {
  const { t } = useTranslation()
  const [_, setSearchParams] = useSearchParams()

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
                { greenhouseId: greenhouse.id },
                { onSuccess: () => setSearchParams({}) }
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
