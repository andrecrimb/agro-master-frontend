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
import { BrowserRouter, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import routes from 'routes'
import PageNotFoundPlaceholder from 'components/PageNotFoundPlaceholder'
import 'dayjs/locale/pt-br'
import dayjs from 'dayjs'
import { QueryParamProvider } from 'use-query-params'
import ScreenPlaceholder from 'components/ScreenPlaceholder'
import BuildIcon from '@material-ui/icons/BuildRounded'
import i18n from './i18n'

dayjs.locale('pt-br')

const Users = React.lazy(() => import('screens/Users'))
const Properties = React.lazy(() => import('screens/OwnerProperties'))
const Customers = React.lazy(() => import('screens/Customers'))
const Orders = React.lazy(() => import('screens/Orders'))
const Rootstocks = React.lazy(() => import('screens/Rootstocks'))

const RouteAdapter = ({ children }) => {
  const navigate = useNavigate()
  const location = useLocation()

  const adaptedHistory = React.useMemo(
    () => ({
      replace(location) {
        navigate(location, { replace: true, state: location.state })
      },
      push(location) {
        navigate(location, { replace: false, state: location.state })
      }
    }),
    [navigate]
  )
  return children({ history: adaptedHistory, location })
}

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <QueryParamProvider ReactRouterRoute={RouteAdapter as any}>
        <>
          <Dialogs />
          <AppBarDrawerGrid>
            <AppBar />
            <AppDrawer />
            <PageContentGridArea>
              <React.Suspense fallback={<PageLoading />}>
                <Routes>
                  <Route
                    path={routes.dashboard}
                    element={
                      <ScreenPlaceholder
                        Icon={BuildIcon}
                        title={i18n.t('page_under_construction')}
                      />
                    }
                  />
                  <Route path={routes.users} element={<Users />} />
                  <Route path={routes.properties} element={<Properties />} />
                  <Route path={routes.customers} element={<Customers />} />
                  <Route path={routes.orders} element={<Orders />} />
                  <Route path={routes.rootstocks + '/*'} element={<Rootstocks />} />
                  <Route path="*" element={<PageNotFoundPlaceholder />} />
                </Routes>
              </React.Suspense>
            </PageContentGridArea>
          </AppBarDrawerGrid>
        </>
      </QueryParamProvider>
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
