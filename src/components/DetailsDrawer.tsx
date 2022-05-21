import React, { PropsWithChildren } from 'react'
import SplitterLayout from 'react-splitter-layout'
import { useQueryParams, NumberParam, StringParam } from 'use-query-params'

const UserDrawer = React.lazy(() => import('../screens/Users/UserDetails'))
const CustomerDrawer = React.lazy(() => import('../screens/Customers/CustomerDetails'))
const OwnerPropertyDrawer = React.lazy(
  () => import('../screens/OwnerProperties/OwnerPropertyDetails')
)
const FruitsOrderDrawer = React.lazy(() => import('../screens/Orders/fruits/FruitsOrderDetails'))
const SeedsOrderDrawer = React.lazy(() => import('../screens/Orders/seeds/SeedsOrderDetails'))
const SeedlingsOrderDrawer = React.lazy(
  () => import('../screens/Orders/seedlings/SeedlingsOrderDetails')
)
const BorbulhasOrderDrawer = React.lazy(
  () => import('../screens/Orders/borbulhas/BorbulhasOrderDetails')
)
const RootstocksOrderDrawer = React.lazy(
  () => import('../screens/Orders/rootstocks/RootstocksOrderDetails')
)

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
  const [search] = useQueryParams({
    id: NumberParam,
    drawer: StringParam
  })

  const DrawerComponent = React.useCallback(() => {
    let content: null | React.ReactElement = null

    if (!search.id || !search.drawer) return null

    switch (search.drawer as DrawerType) {
      case 'property':
        content = <OwnerPropertyDrawer id={search.id} />
        break
      case 'user':
        content = <UserDrawer id={search.id} />
        break
      case 'customer':
        content = <CustomerDrawer id={search.id} />
        break
      case 'fruitOrder':
        content = <FruitsOrderDrawer id={search.id} />
        break
      case 'seedOrder':
        content = <SeedsOrderDrawer id={search.id} />
        break
      case 'rootstockOrder':
        content = <RootstocksOrderDrawer id={search.id} />
        break
      case 'seedlingOrder':
        content = <SeedlingsOrderDrawer id={search.id} />
        break
      case 'borbulhaOrder':
        content = <BorbulhasOrderDrawer id={search.id} />
        break
      default:
        content = null
        break
    }
    return content
  }, [search])

  return (
    <SplitterLayout percentage secondaryInitialSize={45}>
      {children}
      {search.drawer ? (
        <React.Suspense fallback={<div />}>
          <DrawerComponent />
        </React.Suspense>
      ) : null}
    </SplitterLayout>
  )
}

export default DetailsDrawer
