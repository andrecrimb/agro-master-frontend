import React from 'react'
import Table from 'components/table/Table'
import ScreenPlaceholder from 'components/ScreenPlaceholder'
import { useTranslation } from 'react-i18next'
import { usePagination, useSortBy } from 'react-table'
import {
  fruitOrderNfNumber,
  fruitOrderDate,
  fruitOrderDeliveryDate,
  fruitOrderCustomer,
  fruitOrderBoxQtd,
  fruitOrderValue,
  fruitOrderStatus
} from 'components/table/cells'
import useOrders from 'hooks/useOrders'

const columns = [
  fruitOrderDate,
  fruitOrderDeliveryDate,
  fruitOrderNfNumber,
  fruitOrderCustomer,
  fruitOrderStatus,
  fruitOrderBoxQtd,
  fruitOrderValue
]

const FruitsOrdersTable: React.FC = () => {
  const { t } = useTranslation()
  const { data = [] } = useOrders('fruit')

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
  )
}

export default FruitsOrdersTable
