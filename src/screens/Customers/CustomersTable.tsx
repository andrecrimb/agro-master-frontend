import React from 'react'
import { usePagination, useSortBy } from 'react-table'
import Table from 'components/table/Table'
import { LinearProgress } from '@material-ui/core'
import useCustomers from 'hooks/useCustomers'
import { customersName, customersActive } from 'components/table/cells'
import ScreenPlaceholder from 'components/ScreenPlaceholder'
import { useTranslation } from 'react-i18next'

const CustomersTable: React.FC = () => {
  const { t } = useTranslation()
  const { data = [], isFetching } = useCustomers()
  const noData = !isFetching && !data.length

  const columns = React.useMemo(() => [customersName, customersActive], [])

  return (
    <>
      {isFetching && (
        <div style={{ position: 'absolute', zIndex: 3, left: 0, right: 0, top: 0 }}>
          <LinearProgress color="secondary" />
        </div>
      )}
      {noData ? (
        <ScreenPlaceholder description={t('no_customers')} />
      ) : (
        <Table
          columns={columns}
          data={data}
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

export default CustomersTable
