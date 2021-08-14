import { IconButton, Popover, List, MenuItem } from '@material-ui/core'
import { MoreVert as MoreIcon } from '@material-ui/icons'
import React from 'react'
import AddPaymentDialog from './AddPaymentDialog'
import CancelOrderMenuItem from './CancelOrderMenuItem'
import EditOrderDialog from './EditOrderDialog'
import AddFruitOrderItemsDialog from './AddFruitOrderItemsDialog'
import { useTranslation } from 'react-i18next'

type Props = { orderId: number }

const DrawerActions: React.FC<Props> = ({ orderId }) => {
  const { t } = useTranslation()

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [open, setOpen] = React.useState<null | 'addPayments' | 'editOrder' | 'addOrderItems'>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
    setOpen(null)
  }

  //TODO add a cancel order button

  return (
    <>
      <IconButton
        size="small"
        aria-controls="customer-actions"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreIcon />
      </IconButton>
      <Popover
        id="customer-actions"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <List>
          <MenuItem onClick={() => setOpen('editOrder')}>{t('edit_order')}</MenuItem>
          <MenuItem onClick={() => setOpen('addPayments')}>{t('add_payment')}</MenuItem>
          <MenuItem onClick={() => setOpen('addOrderItems')}>{t('add_order_items')}</MenuItem>
          <CancelOrderMenuItem onClick={handleClose} orderId={orderId} />
        </List>
      </Popover>
      {open === 'addPayments' ? <AddPaymentDialog orderId={orderId} onClose={handleClose} /> : null}
      {open === 'editOrder' ? <EditOrderDialog orderId={orderId} onClose={handleClose} /> : null}
      {open === 'addOrderItems' ? (
        <AddFruitOrderItemsDialog orderId={orderId} onClose={handleClose} />
      ) : null}
    </>
  )
}

export default DrawerActions
