import useUrlSearch from 'hooks/useUrlSearch'
import React, { PropsWithChildren } from 'react'
import SplitterLayout from 'react-splitter-layout'

const UserDrawer = React.lazy(() => import('../screens/Users/UserDetails'))

type DrawerType = undefined | 'user' | 'customer'

const DetailsDrawer: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const {
    params: { drawer, id }
  } = useUrlSearch({ params: ['drawer', 'id'] })

  const drawerType = drawer as DrawerType

  const DrawerComponent = React.useCallback(() => {
    let content: null | React.ReactElement = null
    switch (drawerType) {
      case 'customer':
        content = null
        break
      case 'user':
        content = <UserDrawer id={+id} />
        break
      default:
        content = null
        break
    }
    return content
  }, [drawerType, id])

  return (
    <SplitterLayout percentage secondaryInitialSize={45}>
      {children}
      {drawer ? (
        <React.Suspense fallback={<div />}>
          <DrawerComponent />
        </React.Suspense>
      ) : null}
    </SplitterLayout>
  )
}

export default DetailsDrawer
