import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import Axios from 'axios'
import { SnackbarProvider } from 'notistack'
import { MuiThemeProvider } from '@material-ui/core'
import { ThemeProvider } from 'styledComponents'
import { DialogsProvider } from './DialogsContext'
import { muiTheme } from 'theme'
import AuthenticationProvider from './AuthenticationProvider'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      notifyOnChangePropsExclusions: ['isStale']
    }
  }
})

const AppProviders: React.FC = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <MuiThemeProvider theme={muiTheme}>
        <ThemeProvider theme={{}}>
          <DialogsProvider>
            <SnackbarProvider maxSnack={8}>
              <AuthenticationProvider>{children}</AuthenticationProvider>
            </SnackbarProvider>
          </DialogsProvider>
        </ThemeProvider>
      </MuiThemeProvider>
    </QueryClientProvider>
  )
}

export default AppProviders
