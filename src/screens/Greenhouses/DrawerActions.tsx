import { IconButton, Popover, List, MenuItem } from '@material-ui/core'
import { MoreVert as MoreIcon } from '@material-ui/icons'
import React from 'react'
import AddBenchButtonDialog from './AddBenchButtonDialog'
import EditGreenhouseButtonDialog from './EditGreenhouseButtonDialog'
import DeleteButton from './DeleteButton'

type Props = { greenhouseId: number }

const DrawerActions: React.FC<Props> = ({ greenhouseId }) => {
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
        aria-controls="greenhouse-actions"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreIcon />
      </IconButton>
      <Popover
        id="greenhouse-actions"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <List>
          <EditGreenhouseButtonDialog greenhouseId={greenhouseId} onClick={handleClose} />
          <DeleteButton greenhouseId={greenhouseId} onClick={handleClose} />
          <AddBenchButtonDialog greenhouseId={greenhouseId} onClick={handleClose} />
        </List>
      </Popover>
    </>
  )
}

export default DrawerActions
