import { IconButton, Popover, List, MenuItem } from '@material-ui/core'
import { MoreVert as MoreIcon } from '@material-ui/icons'
import React from 'react'
import AddPaymentDialog from './AddPaymentDialog'
import CancelOrderMenuItem from './CancelOrderMenuItem'
import EditOrderDialog from './EditOrderDialog'
import AddFruitsOrderItemsDialog from './AddFruitsOrderItemsDialog'
import AddSeedsOrderItemsDialog from './AddSeedsOrderItemsDialog'
import AddRootstockOrderItemsDialog from './AddRootstocksOrderItemsDialog'
import AddSeedlingsOrderItemsDialog from './AddSeedlingsOrderItemsDialog'
import AddBorbulhasOrderItemsDialog from './AddBorbulhasOrderItemsDialog'
import { useTranslation } from 'react-i18next'
import { Order } from 'types/orders'

type Props = { order: Order }

const DrawerActions: React.FC<Props> = ({ order }) => {
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
          <CancelOrderMenuItem onClick={handleClose} orderId={order.id} />
        </List>
      </Popover>
      {open === 'addPayments' ? (
        <AddPaymentDialog orderId={order.id} onClose={handleClose} />
      ) : null}
      {open === 'editOrder' ? <EditOrderDialog orderId={order.id} onClose={handleClose} /> : null}
      {open === 'addOrderItems' && order.type === 'fruit' ? (
        <AddFruitsOrderItemsDialog orderId={order.id} onClose={handleClose} />
      ) : null}
      {open === 'addOrderItems' && order.type === 'borbulha' ? (
        <AddBorbulhasOrderItemsDialog orderId={order.id} onClose={handleClose} />
      ) : null}
      {open === 'addOrderItems' && order.type === 'seed' ? (
        <AddSeedsOrderItemsDialog orderId={order.id} onClose={handleClose} />
      ) : null}
      {open === 'addOrderItems' && order.type === 'seedling' ? (
        <AddSeedlingsOrderItemsDialog order={order} onClose={handleClose} />
      ) : null}
      {open === 'addOrderItems' && order.type === 'rootstock' ? (
        <AddRootstockOrderItemsDialog orderId={order.id} onClose={handleClose} />
      ) : null}
    </>
  )
}

export default DrawerActions
