import React from 'react'
import { usePagination, useSortBy } from 'react-table'
import Table from 'components/table/Table'
import { LinearProgress } from '@material-ui/core'
import useCustomer from 'hooks/useCustomer'
import ScreenPlaceholder from 'components/ScreenPlaceholder'
import { customerPropertyGeneral, customerPropertyEdit } from 'components/table/cells'
import { useTranslation } from 'react-i18next'

type Props = { customerId: number }

const PropertiesTable: React.FC<Props> = ({ customerId }) => {
  const { t } = useTranslation()
  const { data = [], isFetching } = useCustomer(customerId, { select: d => d.properties })
  const noData = !isFetching && !data.length

  const columns = React.useMemo(() => [customerPropertyGeneral, customerPropertyEdit], [])

  return (
    <>
      {isFetching && (
        <div style={{ position: 'absolute', zIndex: 3, left: 0, right: 0, top: 0 }}>
          <LinearProgress color="secondary" />
        </div>
      )}
      {noData ? (
        <ScreenPlaceholder description={t('no_properties')} />
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

export default PropertiesTable
