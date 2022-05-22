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
  seedlingOrderQtd,
  seedlingOrderValue,
  orderStatus
} from 'components/table/cells'
import useOrders from 'hooks/useOrders'
import LineLoading from 'components/LineLoading'

const columns = [
  orderNfNumber,
  orderDate,
  orderDeliveryDate,
  orderStatus,
  orderCustomer,
  seedlingOrderQtd,
  seedlingOrderValue
]

const SeedlingsOrdersTable: React.FC = () => {
  const { t } = useTranslation()
  const { data = [], isLoading } = useOrders('seedling')

  const initialState = React.useMemo(
    () => ({
      sortBy: [{ id: 'orderDate', desc: false }]
    }),
    []
  )

  return (
    <>
      {isLoading && <LineLoading />}
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

export default SeedlingsOrdersTable
