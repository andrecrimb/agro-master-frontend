import React from 'react'
import useDialog from 'hooks/useDialog'
import { MenuItem } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import useCancelOrder from 'hooks/useCancelOrder'
import useUrlSearch from 'hooks/useUrlSearch'

type Props = {
  orderId: number
  onClick: () => void
}

const CancelOrderMenuItem: React.FC<Props> = ({ onClick, orderId }) => {
  const { t } = useTranslation()
  const { setParams } = useUrlSearch({ params: [] })

  const { newDialog } = useDialog()
  const deleteGreenhouse = useCancelOrder(orderId)

  return (
    <MenuItem
      onClick={() => {
        newDialog({
          title: t('warning') + '!',
          message: t('cancel_order_question'),
          confirmationButton: {
            text: t('cancel'),
            onClick: () =>
              deleteGreenhouse.mutateAsync(undefined, {
                onSuccess: () => setParams({ drawer: null, drawerTab: null, id: null })
              })
          }
        })
        onClick()
      }}
    >
      {t('cancel_order')}
    </MenuItem>
  )
}

export default CancelOrderMenuItem
