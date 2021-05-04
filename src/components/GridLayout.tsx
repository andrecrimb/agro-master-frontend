import styled from 'styledComponents'
import { muiTheme } from 'theme'

//#region LoginPage
export const LoginGrid = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

  display: grid;
  align-items: stretch;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  grid-template-areas: 'form info';
`
export const LoginFormGridArea = styled.div`
  grid-area: form;
  display: flex;
  background: #fff;
  align-items: center;
  justify-content: center;
`
export const LoginInfoGridArea = styled.div`
  background: ${muiTheme.palette.primary.main};
  grid-area: info;
  display: flex;
`
//#endregion

//#region App bar and drawer
export const AppBarDrawerGrid = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: ${muiTheme.palette.background.default};
  height: 100%;
  width: 100%;

  display: grid;
  align-items: stretch;
  grid-template-columns: minmax(50px, auto) 1fr;
  grid-template-rows: 54px 1fr;
  grid-template-areas:
    'left-drawer app-bar'
    'left-drawer page-content';
`
export const DrawerGridArea = styled.div`
  grid-area: left-drawer;
  display: flex;
`
export const AppBarGridArea = styled.header`
  grid-area: app-bar;
  position: sticky;
  top: 0;
  z-index: 999;
`
export const PageContentGridArea = styled.div`
  grid-area: page-content;
  position: relative;
`
//#endregion
