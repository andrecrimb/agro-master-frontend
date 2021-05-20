import React from 'react'
import { usePagination, useSortBy } from 'react-table'
import Table from 'components/table/Table'
import { LinearProgress } from '@material-ui/core'
import useOwnerProperties from 'hooks/useOwnerProperties'
import {
  ownerPropertyAddress,
  ownerPropertyName,
  ownerPropertyProducerName
} from 'components/table/cells'

const PropertiesTable: React.FC = () => {
  const { data = [] } = useOwnerProperties()

  const columns = React.useMemo(
    () => [ownerPropertyName, ownerPropertyProducerName, ownerPropertyAddress],
    []
  )
  const isFetching = false

  return (
    <>
      {isFetching && (
        <div style={{ position: 'absolute', zIndex: 3, left: 0, right: 0, top: 0 }}>
          <LinearProgress color="secondary" />
        </div>
      )}
      <Table
        columns={columns}
        data={data}
        plugins={[useSortBy, usePagination]}
        options={{
          disableSortRemove: true,
          autoResetSortBy: false
        }}
      />
    </>
  )
}

export default PropertiesTable
