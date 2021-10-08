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
import ScreenPlaceholder from 'components/ScreenPlaceholder'
import { useTranslation } from 'react-i18next'

type Props = { orderItems: SeedOrderItem[] }

const columns = [
  seedsOrderItemsName,
  seedsOrderItemsQuantity,
  seedsOrderItemsKgPrice,
  seedsOrderItemsAction
]

const SeedsOrderItemsTable: React.FC<Props> = ({ orderItems }) => {
  const { t } = useTranslation()

  if (!orderItems.length) {
    return <ScreenPlaceholder withAbsoluteWrapper={false} description={t('no_items')} />
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

export default SeedsOrderItemsTable
