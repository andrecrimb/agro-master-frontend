import useUrlSearch from 'hooks/useUrlSearch'
import React, { PropsWithChildren } from 'react'
import SplitterLayout from 'react-splitter-layout'
import DetailsDrawerWrapper from 'components/DetailsDrawerWrapper'

type DrawerType = null | 'user' | 'customer'

const DetailsDrawer: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const {
    params: { drawer, id }
  } = useUrlSearch({ params: ['drawer', 'id'] })

  const drawerType = drawer as DrawerType

  const DrawerComponent = React.useCallback(() => {
    let content: null | React.ReactElement = null
    switch (drawerType) {
      case 'customer':
        content = <div>Customer details</div>
        break
      case 'user':
        content = (
          <DetailsDrawerWrapper
            header={{
              title: 'Antonio carlos',
              highlightTitle: 'Joaoziho',
              RightActions: (
                <>
                  <button>Action</button>
                </>
              )
            }}
            tabs={[
              { label: 'Geral', component: <div>Geral information</div> },
              { label: 'Vendas', component: <div>Vendas</div> },
              { label: 'Propriedades', component: <div>Propriedades</div> }
            ]}
          />
        )
        break
      default:
        content = null
        break
    }
    return content
  }, [drawerType, id])

  return (
    <SplitterLayout percentage secondaryInitialSize={38}>
      {children}
      {DrawerComponent !== null ? (
        <React.Suspense fallback={<div />}>
          <DrawerComponent />
        </React.Suspense>
      ) : null}
    </SplitterLayout>
  )
}

export default DetailsDrawer
