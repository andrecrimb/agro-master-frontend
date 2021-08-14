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
  seedOrderQtd,
  seedOrderValue,
  orderStatus
} from 'components/table/cells'
import useOrders from 'hooks/useOrders'
import { LinearProgress } from '@material-ui/core'

const columns = [
  orderNfNumber,
  orderDate,
  orderDeliveryDate,
  orderCustomer,
  seedOrderQtd,
  seedOrderValue,
  orderStatus
]

const SeedOrdersTable: React.FC = () => {
  const { t } = useTranslation()
  const { data = [], isLoading } = useOrders('seed')

  const initialState = React.useMemo(
    () => ({
      sortBy: [{ id: 'orderDate', desc: false }]
    }),
    []
  )

  return (
    <>
      {isLoading ? (
        <div style={{ position: 'absolute', zIndex: 3, left: 0, right: 0, top: 0 }}>
          <LinearProgress color="secondary" />
        </div>
      ) : null}
      {!data.length ? <ScreenPlaceholder description={t('no_orders')} /> : null}
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
    </>
  )
}

export default SeedOrdersTable
