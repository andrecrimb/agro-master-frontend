import React from 'react'
import { usePagination, useSortBy } from 'react-table'
import Table from 'components/table/Table'
import {
  FruitsOrderItemsName,
  FruitsOrderItemsQuantity,
  FruitsOrderItemsBoxPrice
} from 'components/table/cells'
import { FruitsOrderItem } from 'types/orders'

type Props = { orderItems: FruitsOrderItem[] }

const columns = [FruitsOrderItemsName, FruitsOrderItemsQuantity, FruitsOrderItemsBoxPrice]

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
