import { IconButton, Popover, List } from '@material-ui/core'
import { MoreVert as MoreIcon } from '@material-ui/icons'
import React from 'react'
import AddPropertyButtonDialog from './AddPropertyButtonDialog'
import EditCustomerButtonDialog from './EditCustomerButtonDialog'

type Props = { customerId: number }

const DrawerActions: React.FC<Props> = ({ customerId }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
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
          <AddPropertyButtonDialog customerId={customerId} onClick={handleClose} />
          <EditCustomerButtonDialog customerId={customerId} onClick={handleClose} />
        </List>
      </Popover>
    </>
  )
}

export default DrawerActions
