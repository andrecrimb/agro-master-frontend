import React from 'react'
import styled from 'styledComponents'
import {
  IconButton,
  Avatar,
  Popover,
  Divider,
  Paper,
  Typography,
  Button,
  Box
} from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { muiTheme } from 'theme'
import useAuthUser from 'hooks/useAuthUser'
import { useQueryClient } from 'react-query'

const StyledAvatar = styled(Avatar)`
  &.MuiAvatar-root {
    color: #fff;
    background-color: ${muiTheme.palette.primary.main};
    height: 36px;
    width: 36px;
    font-size: 1.1rem;
  }
`

const StyledPaper = styled(Paper)`
  &.MuiPaper-root {
    width: 200px;
    ul {
      padding: 0;
    }
  }
  .popover-avatar {
    color: ${muiTheme.palette.grey[600]};
    border: 1px solid ${muiTheme.palette.divider};
    font-weight: 500;
    background-color: transparent;
    font-size: 1.1rem;
    width: 38px;
    height: 38px;
  }
`
const PaperHeader = styled.div`
  padding: 20px 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  cursor: pointer;
  h4 {
    color: ${muiTheme.palette.grey[700]};
    font-weight: 400;
    font-size: 0.8rem;
    margin-top: 12px;
  }
`

const UserMenu: React.FC = () => {
  const { t } = useTranslation()
  const { data: user } = useAuthUser()
  const queryClient = useQueryClient()

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)

  const displayName = React.useMemo(
    () => ({
      short: (user?.firstName && user?.lastName
        ? `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`
        : `${user?.firstName?.substring(0, 2)}`
      ).toUpperCase(),
      full:
        user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : user?.firstName
    }),
    [user]
  )

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const logout = () => {
    localStorage.removeItem('jwt')
    queryClient.invalidateQueries('authUser')
  }

  const open = Boolean(anchorEl)
  const id = open ? 'user-popover' : undefined

  return (
    <>
      <IconButton aria-label="user-menu" size="small" onClick={handleClick}>
        <StyledAvatar>{displayName.short}</StyledAvatar>
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
      >
        <StyledPaper>
          <PaperHeader>
            <Avatar className="popover-avatar">{displayName.short}</Avatar>
            <Typography variant="h4">{displayName.full}</Typography>
          </PaperHeader>
          <Divider />
          <Box padding="12px 16px" textAlign="center">
            <Button
              data-testid="button_stop_session"
              autoFocus
              disableFocusRipple
              onClick={logout}
              color="secondary"
              variant="contained"
            >
              {t('logout')}
            </Button>
          </Box>
        </StyledPaper>
      </Popover>
    </>
  )
}

export default UserMenu
