import React from 'react'
import {
  useTable,
  UsePaginationOptions,
  UseTableOptions,
  UseGlobalFiltersOptions,
  UseGlobalFiltersColumnOptions,
  PluginHook,
  Column,
  UseSortByOptions,
  UseSortByColumnOptions,
  UseExpandedOptions
} from 'react-table'
import {
  Table as MuiTable,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Toolbar,
  IconButton,
  TableSortLabel
} from '@material-ui/core'
import styled from 'styledComponents'
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons'
import { muiTheme } from 'theme'

const PaginationToolbar = styled(Toolbar)`
  &.MuiToolbar-root {
    justify-content: flex-end;
    width: 100%;
  }
  &.MuiToolbar-dense {
    min-height: 38px;
  }
`

const TableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  height: inherit;
`

const StickyPagination = styled.div`
  position: sticky;
  bottom: 0;
  display: flex;
  background-color: whitesmoke;
  color: ${muiTheme.palette.grey[500]};
`
const FooterIndexWrapper = styled.div`
  p {
    text-transform: uppercase;
    color: ${muiTheme.palette.grey[600]};
    font-weight: 500;
    font-size: 0.65rem;
    opacity: 0.8;
  }
`
type TableOptions<D extends object = {}> = UseTableOptions<D> &
  UsePaginationOptions<D> &
  UseSortByOptions<D> &
  UseExpandedOptions<D> &
  UseGlobalFiltersOptions<D>

interface Props<D extends object = any> {
  columns: Array<Column<D>>
  data: D[]
  options?: Omit<TableOptions<D>, 'data' | 'columns'>
  plugins?: Array<PluginHook<D>>
  renderRowSubComponent?: (row: any) => React.ReactNode
  globalFilter?: string
  onRowSelect?: (selectedRowId, row?) => void
  testid?: string
}

export type RTColumn<D extends object = {}> = Column<D> &
  UseSortByColumnOptions<D> &
  UseGlobalFiltersColumnOptions<D>

export function Table<T extends object>(props: Props<T>): React.ReactElement {
  const {
    data = [],
    columns,
    options = {},
    plugins = [],
    renderRowSubComponent,
    onRowSelect,
    globalFilter,
    testid = 'agroMaster-table'
  } = props

  const { initialState, ...otherOptions } = options

  const table = useTable<T>(
    {
      columns,
      data,
      initialState: { pageSize: 50, ...initialState },
      ...otherOptions
    } as TableOptions<T>,
    ...(plugins || {})
  )

  React.useEffect(() => table['setGlobalFilter']?.(globalFilter), [globalFilter])

  React.useEffect(() => {
    if (onRowSelect) {
      onRowSelect(table.state['selectedRowId'], table.state['selectedRow'])
    }
  }, [table.state['selectedRowId'], table.state['selectedRow']])

  const rows = table['page'] || table.rows

  const getHeaderProps = React.useCallback(column => {
    if (column.hasOwnProperty('getSortByToggleProps')) {
      return column.getSortByToggleProps()
    }
    return {}
  }, [])

  return (
    <TableWrapper>
      <MuiTable data-testid={testid} stickyHeader {...table.getTableProps()}>
        <TableHead>
          {table.headerGroups.map((headerGroup, index) => (
            <React.Fragment key={index}>
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <TableCell
                    {...column.getHeaderProps(getHeaderProps(column))}
                    key={column.getHeaderProps(getHeaderProps(column)).key}
                  >
                    {column['canSort'] ? (
                      <TableSortLabel
                        active={column['isSorted']}
                        direction={column['isSortedDesc'] ? 'desc' : 'asc'}
                      >
                        {column.render('Header')}
                      </TableSortLabel>
                    ) : (
                      column.render('Header')
                    )}
                  </TableCell>
                ))}
              </TableRow>
              {table['setFilter'] && (
                <TableRow>
                  {headerGroup.headers.map(column => (
                    <TableCell
                      {...column.getHeaderProps()}
                      key={column.getHeaderProps().key}
                      style={{ top: 34, borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}
                    >
                      {column['canFilter'] ? column.render('Filter') : null}
                    </TableCell>
                  ))}
                </TableRow>
              )}
            </React.Fragment>
          ))}
        </TableHead>

        <TableBody {...table.getTableBodyProps()}>
          {rows.map((row, index) => {
            table.prepareRow(row)
            return (
              <React.Fragment key={index}>
                <TableRow hover data-testid={row.getRowProps().key} {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return (
                      <TableCell
                        data-testid={cell.getCellProps().key}
                        {...cell.getCellProps()}
                        key={cell.getCellProps().key}
                      >
                        {cell.render('Cell')}
                      </TableCell>
                    )
                  })}
                </TableRow>
                {row['isExpanded'] && renderRowSubComponent && (
                  <tr style={{ backgroundColor: muiTheme.palette.grey[100] }}>
                    <td colSpan={table.visibleColumns.length}>{renderRowSubComponent?.(row)}</td>
                  </tr>
                )}
              </React.Fragment>
            )
          })}
        </TableBody>
      </MuiTable>
      {table['page'] && table['pageCount'] > 1 && (
        <StickyPagination>
          <PaginationToolbar variant="dense">
            <FooterIndexWrapper>
              <Typography>
                {table.state['pageIndex'] + 1} of {table['pageOptions'].length}
              </Typography>
            </FooterIndexWrapper>
            <div>
              <IconButton
                onClick={() => table['previousPage']()}
                disabled={!table['canPreviousPage']}
                data-testid="button_previous_page"
              >
                <KeyboardArrowLeft />
              </IconButton>
              <IconButton
                onClick={() => table['nextPage']()}
                disabled={!table['canNextPage']}
                data-testid="button_next_page"
              >
                <KeyboardArrowRight />
              </IconButton>
            </div>
          </PaginationToolbar>
        </StickyPagination>
      )}
    </TableWrapper>
  )
}
export default Table
