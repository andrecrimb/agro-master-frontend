import PageLoading from 'components/PageLoading'
import useAuthUser from 'hooks/useAuthUser'
import React, { PropsWithChildren } from 'react'
import Login from 'screens/Login'

const AuthenticationProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const { data: user, error } = useAuthUser()

  const errorCode = error?.response?.status

  if (errorCode && errorCode >= 500) {
    return <h1>Server down (Change message later)</h1>
  }

  if (errorCode && errorCode >= 400 && errorCode < 500) {
    return <Login />
  }

  if (!user) {
    return <PageLoading />
  }

  return <>{children}</>
}

export default AuthenticationProvider
