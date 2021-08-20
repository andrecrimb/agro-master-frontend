import React from 'react'
import { usePagination, useSortBy } from 'react-table'
import Table from 'components/table/Table'
import {
  borbulhasOrderItemsName,
  borbulhasOrderItemsQuantity,
  borbulhasOrderItemsKgPrice,
  borbulhasOrderItemsAction
} from 'components/table/cells'
import { BorbulhaOrderItem } from 'types/orders'

type Props = { orderItems: BorbulhaOrderItem[] }

const columns = [
  borbulhasOrderItemsName,
  borbulhasOrderItemsQuantity,
  borbulhasOrderItemsKgPrice,
  borbulhasOrderItemsAction
]

const BorbulhasOrderItemsTable: React.FC<Props> = ({ orderItems }) => {
  return (
    <Table
      columns={columns}
      data={orderItems}
      plugins={[useSortBy, usePagination]}
      options={{
        disableSortRemove: true,
        autoResetSortBy: false
      }}
    />
  )
}

export default BorbulhasOrderItemsTable
