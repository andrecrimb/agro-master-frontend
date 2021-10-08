import React from 'react'
import { IconButton, Tooltip } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { SeedOrderItem } from 'types/orders'
import { Delete as DeleteIcon } from '@material-ui/icons'
import useDialog from 'hooks/useDialog'
import useDeleteSeedsOrderItem from 'hooks/useDeleteSeedsOrderItem'

type Props = { orderItem: SeedOrderItem }

const DeleteSeedsOrderItemButton: React.FC<Props> = ({ orderItem }) => {
  const { t } = useTranslation()
  const { newDialog } = useDialog()

  const deleteOrderItem = useDeleteSeedsOrderItem(orderItem.id, orderItem.orderId)

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

export default DeleteSeedsOrderItemButton
