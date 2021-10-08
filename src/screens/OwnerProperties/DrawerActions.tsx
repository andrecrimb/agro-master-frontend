import { IconButton, Popover, List } from '@material-ui/core'
import { MoreVert as MoreIcon } from '@material-ui/icons'
import React from 'react'
import { OwnerProperty } from 'types/property'
import EditPropertyButtonDialog from './EditPropertyButtonDialog'
import AddGreenhouseButtonDialog from './Greenhouses/AddGreenhouseButtonDialog'

type Props = { ownerProperty: OwnerProperty }

const DrawerActions: React.FC<Props> = ({ ownerProperty }) => {
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
          <EditPropertyButtonDialog ownerProperty={ownerProperty} onClick={handleClose} />
          <AddGreenhouseButtonDialog ownerProperty={ownerProperty} onClick={handleClose} />
        </List>
      </Popover>
    </>
  )
}

export default DrawerActions
