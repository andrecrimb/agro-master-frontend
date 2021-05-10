import React from 'react'
import { useTranslation } from 'react-i18next'
import { usePagination, useSortBy } from 'react-table'
import Table from 'components/table/Table'
import { LinearProgress } from '@material-ui/core'

const UsersTable: React.FC = () => {
  const { t } = useTranslation()

  const data = React.useMemo(
    () =>
      Array(80)
        .fill(' ')
        .map((_, index) => ({ c1: 'Test column ' + index, c2: 'Essa é a column ' + index })),
    []
  )

  const columns = React.useMemo(
    () => [
      { Header: 'Column 1', accessor: 'c1' },
      { Header: 'Column 2', accessor: 'c2' }
    ],
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

export default UsersTable
