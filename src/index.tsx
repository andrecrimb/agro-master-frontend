import React from 'react'
import ReactDOM from 'react-dom'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter as Router } from 'react-router-dom'
import Dialogs from 'components/Dialogs'
import AppProviders from 'contexts/AppProviders'
import './i18n'
import { AppBarDrawerGrid } from 'components/GridLayout'
import AppBar from 'components/AppBar'
import AppDrawer from 'components/AppDrawer'

const App: React.FC = () => {
  return (
    <Router>
      <Dialogs />
      <AppBarDrawerGrid>
        <AppBar />
        <AppDrawer />
        <h1>hallo</h1>
      </AppBarDrawerGrid>
    </Router>
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
