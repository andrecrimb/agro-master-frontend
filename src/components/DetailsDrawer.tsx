import useUrlSearch from 'hooks/useUrlSearch'
import React, { PropsWithChildren } from 'react'
import SplitterLayout from 'react-splitter-layout'

const UserDrawer = React.lazy(() => import('../screens/Users/UserDetails'))
const CustomerDrawer = React.lazy(() => import('../screens/Customers/CustomerDetails'))
const OwnerPropertyDrawer = React.lazy(
  () => import('../screens/OwnerProperties/OwnerPropertyDetails')
)

const FruitsOrderDrawer = React.lazy(() => import('../screens/Orders/FruitsOrderDetails'))
const SeedsOrderDrawer = React.lazy(() => import('../screens/Orders/SeedsOrderDetails'))
const SeedlingsOrderDrawer = React.lazy(() => import('../screens/Orders/SeedlingsOrderDetails'))
const BorbulhasOrderDrawer = React.lazy(() => import('../screens/Orders/BorbulhasOrderDetails'))
const RootstocksOrderDrawer = React.lazy(() => import('../screens/Orders/RootstocksOrderDetails'))

type DrawerType =
  | undefined
  | 'user'
  | 'property'
  | 'customer'
  | 'fruitOrder'
  | 'seedOrder'
  | 'seedlingOrder'
  | 'rootstockOrder'
  | 'borbulhaOrder'

const DetailsDrawer: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const {
    params: { drawer, id }
  } = useUrlSearch({ params: ['drawer', 'id'] })

  const drawerType = drawer as DrawerType
  const DrawerComponent = React.useCallback(() => {
    let content: null | React.ReactElement = null
    switch (drawerType) {
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
      case 'seedOrder':
        content = <SeedsOrderDrawer id={+id} />
        break
      case 'rootstockOrder':
        content = <RootstocksOrderDrawer id={+id} />
        break
      case 'seedlingOrder':
        content = <SeedlingsOrderDrawer id={+id} />
        break
      case 'borbulhaOrder':
        content = <BorbulhasOrderDrawer id={+id} />
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
