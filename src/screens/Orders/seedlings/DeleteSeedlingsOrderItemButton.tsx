import React from 'react'
import { IconButton, Tooltip } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { SeedlingBenchOrderItem } from 'types/orders'
import { Delete as DeleteIcon } from '@material-ui/icons'
import useDialog from 'hooks/useDialog'
import useDeleteSeedlingsOrderItem from 'hooks/useDeleteSeedlingsOrderItem'

type Props = { orderItem: SeedlingBenchOrderItem }

const DeleteSeedlingsOrderItemButton: React.FC<Props> = ({ orderItem }) => {
  const { t } = useTranslation()
  const { newDialog } = useDialog()

  const deleteOrderItem = useDeleteSeedlingsOrderItem(orderItem.id, orderItem.orderId)

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

export default DeleteSeedlingsOrderItemButton
