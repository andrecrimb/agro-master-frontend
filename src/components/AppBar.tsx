import { Toolbar, AppBar as Bar, IconButton } from '@material-ui/core'
import { AppBarGridArea } from 'components/GridLayout'
import React from 'react'
import styled from 'styledComponents'
import UserMenu from 'components/UserMenu'
import { NotificationsNoneRounded as NotificationIcon } from '@material-ui/icons'
import { Link } from 'react-router-dom'

const AppLogo = styled.img`
  height: 34px;
`
const StyledToolbar = styled(Toolbar)`
  && {
    justify-content: space-between;
  }
`

const ActionsWrapper = styled.div`
  button + button {
    margin-left: 10px;
  }
`

const AppBar: React.FC = () => {
  return (
    <AppBarGridArea>
      <Bar color="inherit" position="static">
        <StyledToolbar>
          <Link to="/">
            <AppLogo
              src={`${process.env.PUBLIC_URL}/logo_full.svg`}
              alt={`${process.env.REACT_APP_NAME}`}
            />
          </Link>
          <ActionsWrapper>
            <IconButton color="inherit">
              <NotificationIcon />
            </IconButton>
            <UserMenu />
          </ActionsWrapper>
        </StyledToolbar>
      </Bar>
    </AppBarGridArea>
  )
}

export default AppBar
