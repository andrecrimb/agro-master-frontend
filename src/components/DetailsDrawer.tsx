import useUrlSearch from 'hooks/useUrlSearch'
import React, { PropsWithChildren } from 'react'
import SplitterLayout from 'react-splitter-layout'

const UserDrawer = React.lazy(() => import('../screens/Users/UserDetails'))
const GreenhouseDrawer = React.lazy(() => import('../screens/Greenhouses/GreenhouseDetails'))
const CustomerDrawer = React.lazy(() => import('../screens/Customers/CustomerDetails'))
const FruitsOrderDrawer = React.lazy(() => import('../screens/Orders/FruitsOrderDetails'))
const OwnerPropertyDrawer = React.lazy(
  () => import('../screens/OwnerProperties/OwnerPropertyDetails')
)

type DrawerType = undefined | 'user' | 'property' | 'customer' | 'greenhouse' | 'fruitOrder'

const DetailsDrawer: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const {
    params: { drawer, id }
  } = useUrlSearch({ params: ['drawer', 'id'] })

  const drawerType = drawer as DrawerType
  const DrawerComponent = React.useCallback(() => {
    let content: null | React.ReactElement = null
    switch (drawerType) {
      case 'greenhouse':
        content = <GreenhouseDrawer id={+id} />
        break
      case 'property':
        content = <OwnerPropertyDrawer id={+id} />
        break
      case 'user':
        content = <UserDrawer id={+id} />
        break
      case 'customer':
        content = <CustomerDrawer id={+id} />
        break
      case 'fruitOrder':
        content = <FruitsOrderDrawer id={+id} />
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
