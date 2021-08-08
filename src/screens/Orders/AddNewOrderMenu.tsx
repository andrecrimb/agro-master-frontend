import { IconButton, Menu, MenuItem } from '@material-ui/core'
import React from 'react'
import { AddRounded as AddIcon } from '@material-ui/icons'
import { useTranslation } from 'react-i18next'
import { OrderType } from 'types/orders'
import AddFruitOrderDialog from './AddFruitOrderDialog'
import AddSeedlingOrderDialog from './AddSeedlingOrderDialog'

const AddNewOrderMenu: React.FC = () => {
  const { t } = useTranslation()

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [openDialog, setOpenDialog] = React.useState<OrderType | null>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = (itemType: OrderType) => {
    setOpenDialog(itemType)
    setAnchorEl(null)
  }

  return (
    <>
      <IconButton
        aria-controls="new-order-menu"
        aria-haspopup="true"
        color="inherit"
        onClick={handleClick}
      >
        <AddIcon />
      </IconButton>
      <Menu
        id="new-order-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => handleClose('fruit')}>{t('fruit_plural')}</MenuItem>
        <MenuItem onClick={() => handleClose('seedling')}>{t('seedling_plural')}</MenuItem>
        <MenuItem onClick={() => handleClose('borbulha')}>{t('borbulha_plural')}</MenuItem>
        <MenuItem onClick={() => handleClose('seed')}>{t('seeds')}</MenuItem>
      </Menu>

      {openDialog === 'fruit' ? <AddFruitOrderDialog onClose={() => setOpenDialog(null)} /> : null}
      {openDialog === 'seedling' ? (
        <AddSeedlingOrderDialog onClose={() => setOpenDialog(null)} />
      ) : null}
    </>
  )
}

export default AddNewOrderMenu
