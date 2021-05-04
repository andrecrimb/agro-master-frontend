import React from 'react'
import styled from 'styledComponents'
import { IconButton, Avatar } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { muiTheme } from 'theme'

const StyledAvatar = styled(Avatar)`
  &.MuiAvatar-root {
    color: #fff;
    background-color: ${muiTheme.palette.primary.main};
    height: 36px;
    width: 36px;
    font-size: 1.1rem;
  }
`

const UserMenu: React.FC = () => {
  const { t } = useTranslation()

  return (
    <IconButton size="small">
      <StyledAvatar>AR</StyledAvatar>
    </IconButton>
  )
}

export default UserMenu
