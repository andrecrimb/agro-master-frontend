import React from 'react'
import ReactDOM from 'react-dom'
import reportWebVitals from './reportWebVitals'
import Dialogs from 'components/Dialogs'
import AppProviders from 'contexts/AppProviders'
import './i18n'
import { AppBarDrawerGrid, PageContentGridArea } from 'components/GridLayout'
import AppBar from 'components/AppBar'
import AppDrawer from 'components/AppDrawer'
import PageLoading from 'components/PageLoading'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import routes from 'routes'
import PageNotFoundPlaceholder from 'components/PageNotFoundPlaceholder'

const Users = React.lazy(() => import('screens/Users'))
const Properties = React.lazy(() => import('screens/OwnerProperties'))

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
