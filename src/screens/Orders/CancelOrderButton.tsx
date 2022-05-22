import React from 'react'
import useDialog from 'hooks/useDialog'
import { Button } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import useCancelOrder from 'hooks/useCancelOrder'

type Props = { orderId: number }

const CancelOrderButton: React.FC<Props> = ({ orderId }) => {
  const { t } = useTranslation()
  const { newDialog } = useDialog()
  const deleteGreenhouse = useCancelOrder(orderId)

  return (
    <Button
      variant="contained"
      color="inherit"
      onClick={() =>
        newDialog({
          title: t('warning') + '!',
          message: t('cancel_order_question'),
          confirmationButton: {
            text: t('cancel'),
            onClick: () => deleteGreenhouse.mutateAsync(undefined, {})
          }
        })
      }
    >
      {t('cancel_order')}
    </Button>
  )
}

export default CancelOrderButton
