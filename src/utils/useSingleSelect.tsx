import * as React from 'react'
import { actions, Hooks, ensurePluginOrder } from 'react-table'

const pluginName = 'useSingleSelect'

actions.rowSelected = 'rowSelected'

// export const makeSingleSelectOptions = (
//   selectedRowId: number,
//   onRowSelect: (rowId: number) => void
// ) => ({
//   useControlledState: state =>
//     React.useMemo(() => ({ ...state, selectedRowId }), [state, selectedRowId]),
//   stateReducer: (state, action) => action.type === 'rowSelected' && onRowSelect(action.id)
// })

export const useSingleSelect = (hooks: Hooks) => {
  hooks.getRowProps.push(getRowProps)
  hooks.stateReducers.push(reducer)
  hooks.useInstance.push(useInstance)
  hooks.prepareRow.push(prepareRow)
}

useSingleSelect.pluginName = pluginName

const getRowProps = (props, { instance, row }) => {
  const selected =
    typeof row.original === 'object'
      ? instance.state.selectedRowId === row.original.id
      : instance.state.selectedRowId === row.id
  return [
    props,
    {
      onClick: () => {
        if (!selected) {
          row.selectRow()
        }
      },
      style: {
        cursor: selected ? 'inherit' : 'pointer'
      },
      selected
    }
  ]
}

function reducer(state, action) {
  if (action.type === actions.init) {
    return {
      ...state,
      selectedRowId: -1,
      selectedRow: null
    }
  }

  if (action.type === actions.rowSelected) {
    return {
      ...state,
      selectedRowId: action.id,
      selectedRow: action.row
    }
  }
}

function useInstance(instance) {
  const { plugins, dispatch } = instance

  ensurePluginOrder(plugins, ['useFilters', 'useGroupBy', 'useSortBy'], pluginName)

  const selectRow = React.useCallback(
    (id, row) => dispatch({ type: actions.rowSelected, id, row }),
    [dispatch]
  )
  // const selectRow = React.useCallback(id => console.log(id), [])

  Object.assign(instance, { selectRow })
}

function prepareRow(row, { instance }) {
  row.selectRow = () => {
    if (typeof row.original === 'object') {
      instance.selectRow(row.original.id, row.original)
    } else {
      instance.selectRow(row.id, null)
    }
  }
}
