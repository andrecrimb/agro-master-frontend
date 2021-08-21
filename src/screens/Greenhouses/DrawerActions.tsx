import { IconButton, Popover, List, MenuItem } from '@material-ui/core'
import { MoreVert as MoreIcon } from '@material-ui/icons'
import React from 'react'
import AddBenchButtonDialog from './AddBenchButtonDialog'
import EditGreenhouseButtonDialog from './EditGreenhouseButtonDialog'
import DeleteButton from './DeleteButton'
import { Greenhouse } from 'types/greenhouse'

type Props = { greenhouse: Greenhouse }

const DrawerActions: React.FC<Props> = ({ greenhouse }) => {
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
          <EditGreenhouseButtonDialog greenhouse={greenhouse} onClick={handleClose} />
          <DeleteButton greenhouse={greenhouse} onClick={handleClose} />
          {greenhouse.type === 'seedling' ? (
            <AddBenchButtonDialog greenhouse={greenhouse} onClick={handleClose} />
          ) : null}
        </List>
      </Popover>
    </>
  )
}

export default DrawerActions
