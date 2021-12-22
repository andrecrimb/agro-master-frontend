import React from 'react'
import ReactDOM from 'react-dom'
import reportWebVitals from './reportWebVitals'
import Dialogs from 'components/Dialogs'
import AppProviders from 'contexts/AppProviders'
import './i18n'
import 'react-splitter-layout/lib/index.css'
import { AppBarDrawerGrid, PageContentGridArea } from 'components/GridLayout'
import AppBar from 'components/AppBar'
import AppDrawer from 'components/AppDrawer'
import PageLoading from 'components/PageLoading'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import routes from 'routes'
import PageNotFoundPlaceholder from 'components/PageNotFoundPlaceholder'
import 'dayjs/locale/pt-br'
import dayjs from 'dayjs'

dayjs.locale('pt-br')

const Users = React.lazy(() => import('screens/Users'))
const Properties = React.lazy(() => import('screens/OwnerProperties'))
const Customers = React.lazy(() => import('screens/Customers'))
const Orders = React.lazy(() => import('screens/Orders'))
const Rootstocks = React.lazy(() => import('screens/Rootstocks'))

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Dialogs />
      <AppBarDrawerGrid>
        <AppBar />
        <AppDrawer />
        <PageContentGridArea>
          <React.Suspense fallback={<PageLoading />}>
            <Switch>
              <Redirect from="/:url*(/+)" to={window.location.pathname.slice(0, -1)} />
              <Route path={routes.users}>
                <Users />
              </Route>
              <Route path={routes.properties}>
                <Properties />
              </Route>
              <Route path={routes.customers}>
                <Customers />
              </Route>
              <Route path={routes.orders}>
                <Orders />
              </Route>
              <Route path={routes.rootstocks}>
                <Rootstocks />
              </Route>
              <Route>
                <PageNotFoundPlaceholder />
              </Route>
            </Switch>
          </React.Suspense>
        </PageContentGridArea>
      </AppBarDrawerGrid>
    </BrowserRouter>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
