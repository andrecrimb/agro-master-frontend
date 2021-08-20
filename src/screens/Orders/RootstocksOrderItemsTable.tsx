import React from 'react'
import { usePagination, useSortBy } from 'react-table'
import Table from 'components/table/Table'
import {
  rootstocksOrderItemsName,
  rootstocksOrderItemsQuantity,
  rootstocksOrderItemsKgPrice,
  rootstocksOrderItemsAction
} from 'components/table/cells'
import { RootstockOrderItem } from 'types/orders'

type Props = { orderItems: RootstockOrderItem[] }

const columns = [
  rootstocksOrderItemsName,
  rootstocksOrderItemsQuantity,
  rootstocksOrderItemsKgPrice,
  rootstocksOrderItemsAction
]

const RootstocksOrderItemsTable: React.FC<Props> = ({ orderItems }) => {
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

export default RootstocksOrderItemsTable
