import React from 'react'
import { Tooltip, IconButton } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { BorbulhaOrderItem } from 'types/orders'
import { Delete as DeleteIcon } from '@material-ui/icons'
import useDialog from 'hooks/useDialog'
import useDeleteBorbulhasOrderItem from 'hooks/useDeleteBorbulhasOrderItem'

type Props = { orderItem: BorbulhaOrderItem }

const DeleteBorbulhasOrderItemButton: React.FC<Props> = ({ orderItem }) => {
  const { t } = useTranslation()
  const { newDialog } = useDialog()

  const deleteOrderItem = useDeleteBorbulhasOrderItem(orderItem.id, orderItem.orderId)

  return (
    <Tooltip title={t('delete_item') + ''} arrow placement="left">
      <IconButton
        size="small"
        onClick={() =>
          newDialog({
            title: t('warning') + '!',
            message: t('delete_order_item_question'),
            confirmationButton: {
              text: t('delete'),
              onClick: () => deleteOrderItem.mutateAsync(undefined)
            }
          })
        }
      >
        <DeleteIcon />
      </IconButton>
    </Tooltip>
  )
}

export default DeleteBorbulhasOrderItemButton
