import React from 'react'
import Table from 'components/table/Table'
import ScreenPlaceholder from 'components/ScreenPlaceholder'
import { useTranslation } from 'react-i18next'
import { usePagination, useSortBy } from 'react-table'
import {
  orderNfNumber,
  orderDate,
  orderDeliveryDate,
  orderCustomer,
  fruitOrderBoxQtd,
  fruitOrderValue,
  orderStatus
} from 'components/table/cells'
import useOrders from 'hooks/useOrders'
import { LinearProgress } from '@material-ui/core'

const columns = [
  orderNfNumber,
  orderDate,
  orderDeliveryDate,
  orderStatus,
  orderCustomer,
  fruitOrderBoxQtd,
  fruitOrderValue
]

const FruitsOrdersTable: React.FC = () => {
  const { t } = useTranslation()
  const { data = [], isLoading } = useOrders('fruit')

  const initialState = React.useMemo(
    () => ({
      sortBy: [{ id: 'orderDate', desc: false }]
    }),
    []
  )

  if (!data.length) {
    return <ScreenPlaceholder description={t('no_orders')} />
  }

  return (
    <>
      {isLoading ? (
        <div style={{ position: 'absolute', zIndex: 3, left: 0, right: 0, top: 0 }}>
          <LinearProgress color="secondary" />
        </div>
      ) : null}
      {!data.length ? (
        <ScreenPlaceholder description={t('no_orders')} />
      ) : (
        <Table
          columns={columns}
          data={data}
          plugins={[useSortBy, usePagination]}
          options={{
            disableSortRemove: true,
            autoResetSortBy: false,
            initialState
          }}
        />
      )}
    </>
  )
}

export default FruitsOrdersTable
