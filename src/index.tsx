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
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import routes from 'routes'
import PageNotFoundPlaceholder from 'components/PageNotFoundPlaceholder'
import 'dayjs/locale/pt-br'
import dayjs from 'dayjs'

dayjs.locale('pt-br')

const Users = React.lazy(() => import('screens/Users'))
const Properties = React.lazy(() => import('screens/OwnerProperties'))
const Customers = React.lazy(() => import('screens/Customers'))
const Orders = React.lazy(() => import('screens/Orders'))
const Greenhouses = React.lazy(() => import('screens/Greenhouses'))
const Rootstocks = React.lazy(() => import('screens/Rootstocks'))

//TODO change Route "component" prop to "render" or children

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
              <Route path={routes.users} component={Users} />
              <Route path={routes.properties} component={Properties} />
              <Route path={routes.customers} component={Customers} />
              <Route path={routes.orders} component={Orders} />
              <Route path={routes.greenhouses} component={Greenhouses} />
              <Route path={routes.rootstocks} component={Rootstocks} />
              <Route component={PageNotFoundPlaceholder} />
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
