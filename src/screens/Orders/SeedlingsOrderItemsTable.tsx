import React from 'react'
import { usePagination, useSortBy } from 'react-table'
import Table from 'components/table/Table'
import {
  seedlingsOrderItemsName,
  seedlingsOrderItemsQuantity,
  seedlingsOrderItemsKgPrice,
  seedlingsOrderItemsAction
} from 'components/table/cells'
import { SeedlingBenchOrderItem } from 'types/orders'

type Props = { orderItems: SeedlingBenchOrderItem[] }

const columns = [
  seedlingsOrderItemsName,
  seedlingsOrderItemsQuantity,
  seedlingsOrderItemsKgPrice,
  seedlingsOrderItemsAction
]

const SeedlingsOrderItemsTable: React.FC<Props> = ({ orderItems }) => {
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

export default SeedlingsOrderItemsTable
