import { IconButton, Popover, List } from '@material-ui/core'
import { MoreVert as MoreIcon } from '@material-ui/icons'
import React from 'react'
import { Customer } from 'types/customer'
import AddPropertyButtonDialog from './AddPropertyButtonDialog'
import EditCustomerButtonDialog from './EditCustomerButtonDialog'

type Props = { customer: Customer }

const DrawerActions: React.FC<Props> = ({ customer }) => {
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
          <AddPropertyButtonDialog customer={customer} onClick={handleClose} />
          <EditCustomerButtonDialog customer={customer} onClick={handleClose} />
        </List>
      </Popover>
    </>
  )
}

export default DrawerActions
