import React from 'react'
import { usePagination, useSortBy } from 'react-table'
import Table from 'components/table/Table'
import ScreenPlaceholder from 'components/ScreenPlaceholder'
import {
  paymentsAmount,
  paymentsMethod,
  paymentsReceived,
  paymentsScheduledDate,
  paymentsAction
} from 'components/table/cells'
import { useTranslation } from 'react-i18next'
import { Payment } from 'types/orders'

type Props = { payments: Payment[]; editingAllowed: boolean }

const columns = [paymentsAmount, paymentsMethod, paymentsScheduledDate, paymentsReceived]

const PaymentsTable: React.FC<Props> = props => {
  const { t } = useTranslation()
  const noData = !props.payments.length

  const tableColumns = React.useMemo(() => {
    if (props.editingAllowed) return [...columns, paymentsAction]
    return columns
  }, [props.editingAllowed])

  return (
    <>
      {noData ? (
        <ScreenPlaceholder withAbsoluteWrapper={false} description={t('no_payments')} />
      ) : (
        <Table
          columns={tableColumns}
          data={props.payments}
          plugins={[useSortBy, usePagination]}
          options={{
            disableSortRemove: true,
            autoResetSortBy: false
          }}
        />
      )}
    </>
  )
}

export default PaymentsTable
