import React from 'react'
import { usePagination, useSortBy } from 'react-table'
import Table from 'components/table/Table'
import ScreenPlaceholder from 'components/ScreenPlaceholder'
import {
  paymentsAmount,
  paymentsMethod,
  paymentsReceived,
  paymentsScheduledDate
} from 'components/table/cells'
import { useTranslation } from 'react-i18next'
import { Payment } from 'types/orders'

type Props = { payments: Payment[] }

const columns = [paymentsAmount, paymentsMethod, paymentsScheduledDate, paymentsReceived]

const PaymentsTable: React.FC<Props> = ({ payments }) => {
  const { t } = useTranslation()
  const noData = !payments.length

  return (
    <>
      {noData ? (
        <ScreenPlaceholder description={t('no_payments')} />
      ) : (
        <Table
          columns={columns}
          data={payments}
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
