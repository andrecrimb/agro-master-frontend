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
import { useTranslation } from 'react-i18next'
import ScreenPlaceholder from 'components/ScreenPlaceholder'

type Props = { orderItems: SeedlingBenchOrderItem[] }

const columns = [
  seedlingsOrderItemsName,
  seedlingsOrderItemsQuantity,
  seedlingsOrderItemsKgPrice,
  seedlingsOrderItemsAction
]

const SeedlingsOrderItemsTable: React.FC<Props> = ({ orderItems }) => {
  const { t } = useTranslation()

  if (!orderItems.length) {
    return <ScreenPlaceholder description={t('no_items')} />
  }

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
