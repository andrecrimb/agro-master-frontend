import React from 'react'
import useDetailsDrawerState from 'hooks/useDetailsDrawerState'
import SplitterLayout from 'react-splitter-layout'
import PageLoading from 'components/PageLoading'

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

const SelectedDrawer = () => {
  const { type, id } = useDetailsDrawerState()

  if (type && id) {
    switch (type) {
      case 'property':
        return <OwnerPropertyDrawer id={id} />
      case 'user':
        return <UserDrawer id={id} />
      case 'customer':
        return <CustomerDrawer id={id} />
      case 'fruitOrder':
        return <FruitsOrderDrawer id={id} />
      case 'seedOrder':
        return <SeedsOrderDrawer id={id} />
      case 'rootstockOrder':
        return <RootstocksOrderDrawer id={id} />
      case 'seedlingOrder':
        return <SeedlingsOrderDrawer id={id} />
      case 'borbulhaOrder':
        return <BorbulhasOrderDrawer id={id} />
      default:
        return null
    }
  }

  return null
}

const DetailsDrawer: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const { open } = useDetailsDrawerState()

  return (
    <SplitterLayout percentage secondaryInitialSize={45}>
      {children}
      {open ? (
        <React.Suspense fallback={<PageLoading />}>
          <SelectedDrawer />
        </React.Suspense>
      ) : null}
    </SplitterLayout>
  )
}

export default DetailsDrawer
