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

type Props = { orderItems: SeedOrderItem[]; editingAllowed: boolean }

const columns = [seedsOrderItemsName, seedsOrderItemsQuantity, seedsOrderItemsKgPrice]

const SeedsOrderItemsTable: React.FC<Props> = props => {
  const { t } = useTranslation()

  const tableColumns = React.useMemo(() => {
    if (props.editingAllowed) return [...columns, seedsOrderItemsAction]
    return columns
  }, [props.editingAllowed])

  if (!props.orderItems.length) {
    return <ScreenPlaceholder withAbsoluteWrapper={false} description={t('no_items')} />
  }

  return (
    <Table
      columns={tableColumns}
      data={props.orderItems}
      plugins={[useSortBy, usePagination]}
      options={{
        disableSortRemove: true,
        autoResetSortBy: false
      }}
    />
  )
}

export default SeedsOrderItemsTable
