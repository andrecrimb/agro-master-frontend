import React from 'react'
import { usePagination, useSortBy } from 'react-table'
import Table from 'components/table/Table'
import { LinearProgress } from '@material-ui/core'
import useGreenhouses from 'hooks/useGreenhouses'
import { greenhouseLabel, greenhouseProperty, greenhouseType } from 'components/table/cells'
import ScreenPlaceholder from 'components/ScreenPlaceholder'
import { useTranslation } from 'react-i18next'

const GreenhousesTable: React.FC = () => {
  const { t } = useTranslation()
  const { data = [], isFetching } = useGreenhouses()
  const noData = !isFetching && !data.length

  const columns = React.useMemo(() => [greenhouseLabel, greenhouseType, greenhouseProperty], [])

  return (
    <>
      {isFetching && (
        <div style={{ position: 'absolute', zIndex: 3, left: 0, right: 0, top: 0 }}>
          <LinearProgress color="secondary" />
        </div>
      )}
      {noData ? (
        <ScreenPlaceholder description={t('no_greenhouses')} />
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

export default GreenhousesTable
