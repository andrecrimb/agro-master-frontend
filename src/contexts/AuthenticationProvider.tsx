import React, { PropsWithChildren } from 'react'
import Login from 'screens/Login'

const AuthenticationProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  // return <Login />

  return <>{children}</>
}

export default AuthenticationProvider
