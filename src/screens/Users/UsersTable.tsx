import React from 'react'
import { usePagination, useSortBy } from 'react-table'
import Table from 'components/table/Table'
import { LinearProgress } from '@material-ui/core'
import useUsers from 'hooks/useUsers'
import { usersName, usersEmail, usersActive, usersSuperUser } from 'components/table/cells'
import { useSingleSelect } from 'utils/useSingleSelect'
import { useHistory } from 'react-router-dom'

const UsersTable: React.FC = () => {
  const history = useHistory()
  const { data = [] } = useUsers()

  const columns = React.useMemo(() => [usersName, usersEmail, usersActive, usersSuperUser], [])
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
        plugins={[useSortBy, useSingleSelect, usePagination]}
        onRowSelect={rowId => rowId > 0 && history.push('/users/' + rowId)}
        options={{
          disableSortRemove: true,
          autoResetSortBy: false
        }}
      />
    </>
  )
}

export default UsersTable
