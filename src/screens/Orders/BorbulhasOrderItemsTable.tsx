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
import { useTranslation } from 'react-i18next'
import ScreenPlaceholder from 'components/ScreenPlaceholder'

type Props = { orderItems: BorbulhaOrderItem[] }

const columns = [
  borbulhasOrderItemsName,
  borbulhasOrderItemsQuantity,
  borbulhasOrderItemsKgPrice,
  borbulhasOrderItemsAction
]

const BorbulhasOrderItemsTable: React.FC<Props> = ({ orderItems }) => {
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

export default BorbulhasOrderItemsTable
