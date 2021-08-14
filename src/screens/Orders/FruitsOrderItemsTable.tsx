import React from 'react'
import { usePagination, useSortBy } from 'react-table'
import Table from 'components/table/Table'
import {
  FruitsOrderItemsName,
  FruitsOrderItemsQuantity,
  FruitsOrderItemsBoxPrice,
  FruitsOrderItemsAction
} from 'components/table/cells'
import { FruitOrderItem } from 'types/orders'

type Props = { orderItems: FruitOrderItem[] }

const columns = [
  FruitsOrderItemsName,
  FruitsOrderItemsQuantity,
  FruitsOrderItemsBoxPrice,
  FruitsOrderItemsAction
]

const FruitsOrderItemsTable: React.FC<Props> = ({ orderItems }) => {
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

export default FruitsOrderItemsTable
