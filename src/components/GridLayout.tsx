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
  grid-template-rows: 65px 1fr;
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

//#region Page header and content
export const PageHeaderAndContentGrid = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

  height: calc(100vh - 65px);

  display: grid;
  align-items: stretch;
  grid-template-columns: 1fr;
  grid-template-rows: 44px 1fr;
  grid-template-areas:
    'page-header'
    'main-content';
`
export const PageHeaderGridArea = styled.header`
  grid-area: page-header;
  top: 0;
  left: 0;
  z-index: 9;
  position: sticky;
`
export const MainContentGridArea = styled.div`
  grid-area: main-content;
  position: relative;
  overflow: auto;
`
//#endregion

//#region DetailsDrawerWrapperGrid
export const DetailsDrawerWrapperGrid = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 9;

  background-color: ${muiTheme.palette.grey[100]};
  display: grid;
  align-items: stretch;
  grid-template-columns: minmax(0, auto) 1fr;
  grid-template-rows: minmax(40px, auto) 1fr;
  grid-template-areas:
    'details-drawer-header details-drawer-header'
    'details-drawer-tabs details-drawer-content';
`
export const DetailsDrawerTabsGridArea = styled.div`
  grid-area: details-drawer-tabs;
  position: relative;
  border-right: 1px solid ${muiTheme.palette.divider};
`
export const DetailsDrawerHeaderGridArea = styled.div`
  grid-area: details-drawer-header;
  position: relative;
  border-bottom: 1px solid ${muiTheme.palette.divider};
  border-top: 1px solid ${muiTheme.palette.divider};
`
export const DetailsDrawerContentGridArea = styled.div`
  grid-area: details-drawer-content;
  position: relative;

  overflow: auto;
`
//#endregion
