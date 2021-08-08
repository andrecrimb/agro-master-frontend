import { IconButton, Popover, List } from '@material-ui/core'
import { MoreVert as MoreIcon } from '@material-ui/icons'
import React from 'react'
import AddPaymentButtonDialog from './AddPaymentButtonDialog'

type Props = { orderId: number }

const DrawerActions: React.FC<Props> = ({ orderId }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
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
          <AddPaymentButtonDialog orderId={orderId} onClick={handleClose} />
        </List>
      </Popover>
    </>
  )
}

export default DrawerActions
