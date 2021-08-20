import React from 'react'
import { usePagination, useSortBy } from 'react-table'
import Table from 'components/table/Table'
import {
  seedsOrderItemsName,
  seedsOrderItemsQuantity,
  seedsOrderItemsKgPrice,
  seedsOrderItemsAction
} from 'components/table/cells'
import { SeedOrderItem } from 'types/orders'

type Props = { orderItems: SeedOrderItem[] }

const columns = [
  seedsOrderItemsName,
  seedsOrderItemsQuantity,
  seedsOrderItemsKgPrice,
  seedsOrderItemsAction
]

const SeedsOrderItemsTable: React.FC<Props> = ({ orderItems }) => {
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

export default SeedsOrderItemsTable
