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
import { useTranslation } from 'react-i18next'
import ScreenPlaceholder from 'components/ScreenPlaceholder'

type Props = { orderItems: RootstockOrderItem[]; editingAllowed: boolean }

const columns = [
  rootstocksOrderItemsName,
  rootstocksOrderItemsQuantity,
  rootstocksOrderItemsKgPrice
]

const RootstocksOrderItemsTable = (props: Props) => {
  const { t } = useTranslation()

  const tableColumns = React.useMemo(() => {
    if (props.editingAllowed) return [...columns, rootstocksOrderItemsAction]
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

export default RootstocksOrderItemsTable
