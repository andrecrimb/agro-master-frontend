import React from 'react'
import { usePagination, useSortBy } from 'react-table'
import Table from 'components/table/Table'
import {
  fruitsOrderItemsName,
  fruitsOrderItemsQuantity,
  fruitsOrderItemsBoxPrice,
  fruitsOrderItemsAction
} from 'components/table/cells'
import { FruitOrderItem } from 'types/orders'
import { useTranslation } from 'react-i18next'
import ScreenPlaceholder from 'components/ScreenPlaceholder'

type Props = { orderItems: FruitOrderItem[]; editingAllowed: boolean }

const columns = [fruitsOrderItemsName, fruitsOrderItemsQuantity, fruitsOrderItemsBoxPrice]

const FruitsOrderItemsTable: React.FC<Props> = props => {
  const { t } = useTranslation()

  const tableColumns = React.useMemo(() => {
    if (props.editingAllowed) return [...columns, fruitsOrderItemsAction]
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

export default FruitsOrderItemsTable
