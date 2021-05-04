import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styledComponents'
import {
  IconButton,
  List,
  Drawer,
  ListItem,
  ListItemIcon,
  ListItemText,
  SvgIconProps
} from '@material-ui/core'
import {
  MenuRounded as MenuIcon,
  PeopleRounded as ClientsIcon,
  SupervisedUserCircleRounded as UsersIcon,
  PinDropRounded as PropertiesIcon,
  MonetizationOnRounded as SalesIcon,
  DashboardRounded as DashboardIcon
} from '@material-ui/icons'
import { DrawerGridArea } from 'components/GridLayout'
import { muiTheme } from 'theme'
import { NavLink, useLocation } from 'react-router-dom'
import routes from 'routes'

const StyledDrawer = styled(Drawer)`
  &.MuiDrawer-docked {
    background-color: ${muiTheme.palette.primary.main};
  }
  .MuiDrawer-paper {
    ${props =>
      props.open
        ? `
        transition: 0.25s;
        width: 228px;
    `
        : `
        transition: 0.2s;
        width: 54px;
    `}
    top: 0px;
    left: 0;
    overflow-x: hidden;
    margin: 0 !important;
    z-index: 998;
    position: relative;
    flex-shrink: 0;
    white-space: nowrap;
    border: none !important;
    background-color: transparent;
    padding-top: 10px;
  }
`

const MenuButtonWrapper = styled.div<any>`
  padding: 0 8px;
  display: flex;
  justify-content: flex-start;
  button {
    color: #fff;
  }
`
const StyledListItem = styled(ListItem)<any>`
  &.MuiListItem-root {
    width: calc(100% - 16px);
    height: 38px;
    border-radius: 40px;
    margin: auto;
    margin-bottom: 10px;
    padding-left: 0;
  }
`
const StyledNavLink = styled(NavLink)`
  && {
    text-decoration: none;
  }
`
const StyledListItemIcon = styled(ListItemIcon)`
  &.MuiListItemIcon-root {
    border-radius: 40px;
    width: 38px;
    height: 38px;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: auto;
  }
`
const StyledListItemText = styled(ListItemText)`
  margin-left: 10px;
  &.MuiListItemText-root {
    span {
      font-weight: 500;
      color: #fff;
    }
  }
`

type DrawerItem = {
  path: string
  title: string
  icon: React.ComponentType<SvgIconProps>
}

export const drawerList: DrawerItem[] = [
  {
    path: routes.dashboard,
    title: 'dashboard',
    icon: DashboardIcon
  },
  {
    path: routes.sales,
    title: 'sale_plural',
    icon: SalesIcon
  },
  {
    path: routes.clients,
    title: 'client_plural',
    icon: ClientsIcon
  },
  {
    path: routes.properties,
    title: 'property_plural',
    icon: PropertiesIcon
  },
  {
    path: routes.users,
    title: 'user_plural',
    icon: UsersIcon
  }
]

const AppDrawer: React.FC = () => {
  const { t } = useTranslation()
  const [open, setOpen] = React.useState(false)
  const location = useLocation()

  return (
    <DrawerGridArea>
      <StyledDrawer variant="permanent" open={open}>
        <MenuButtonWrapper open={open}>
          <IconButton color="default" onClick={() => setOpen(s => !s)}>
            <MenuIcon />
          </IconButton>
        </MenuButtonWrapper>
        <List>
          {drawerList.map(({ title, icon: DrawerIcon, path }) => (
            <StyledNavLink key={title} to={path}>
              <StyledListItem button open={open} selected={path === location.pathname}>
                <StyledListItemIcon>
                  <DrawerIcon style={{ color: path === location.pathname ? '#fff' : '' }} />
                </StyledListItemIcon>
                <StyledListItemText primary={t(title)} />
              </StyledListItem>
            </StyledNavLink>
          ))}
        </List>
      </StyledDrawer>
    </DrawerGridArea>
  )
}

export default AppDrawer
