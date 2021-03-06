import React from 'react'
import { usePagination, useSortBy } from 'react-table'
import Table from 'components/table/Table'
import { LinearProgress } from '@material-ui/core'
import useOwnerProperties from 'hooks/useOwnerProperties'
import ScreenPlaceholder from 'components/ScreenPlaceholder'
import {
  ownerPropertyAddress,
  ownerPropertyName,
  ownerPropertyProducerName
} from 'components/table/cells'
import { useTranslation } from 'react-i18next'

const PropertiesTable: React.FC = () => {
  const { t } = useTranslation()
  const { data = [], isFetching } = useOwnerProperties()
  const noData = !isFetching && !data.length

  const columns = React.useMemo(
    () => [ownerPropertyName, ownerPropertyProducerName, ownerPropertyAddress],
    []
  )

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
