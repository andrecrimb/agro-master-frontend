import React from 'react'
import styled from 'styledComponents'
import { Table, TableBody, TableRow, TableCell } from '@material-ui/core'
import _ from 'utils/lodash'
import { muiTheme } from 'theme'

//#region Styles
const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-wrap: wrap;
  > * + * {
    margin-left: 4px;
  }
`
const Heading = styled(TableCell)<any>`
  && {
    padding: 2px 10px 2px 0px;
    color: ${muiTheme.palette.grey[600]};
    border: none;
    font-weight: 500;
    line-height: 130%;
    text-transform: uppercase;
    ${p => p.fontSize && `font-size: ${p.fontSize};`}
  }
`
const Value = styled(TableCell)<any>`
  && {
    padding: 2px 10px 2px 0px;
    border: none;
    line-height: 130%;
    ${p => p.fontSize && `font-size: ${p.fontSize};`}
  }
`
const TableWrapper = styled.div<any>``
//#endregion

//#region Props
type Props = {
  headingFontSize?: string
  valueFontSize?: string
  minRowHeight?: string
  columns?: number
  entries: [string, string | React.ReactNode][]
}

//#endregion

const InfoTable: React.FC<Props> = ({
  entries,
  minRowHeight = '26px',
  columns = entries.length,
  headingFontSize = '0.68rem',
  valueFontSize = '0.8rem'
}) => {
  const renderEntries = entriesItem =>
    entriesItem.map(([h, v], index) => (
      <TableRow style={{ height: minRowHeight }} key={`${h}-${index}`}>
        <Heading component="th" scope="row" fontSize={headingFontSize}>
          {h}
        </Heading>
        <Value data-testid={`${h}-value`} fontSize={valueFontSize}>
          {v}
        </Value>
      </TableRow>
    ))

  const tablesToRender = React.useMemo(() => _.chunk(entries, columns), [columns, entries])

  const entriesTables = tablesToRender.map((item, index) => (
    <TableWrapper key={`key-value-${columns}-${index}`}>
      <Table>
        <TableBody>{renderEntries(item)}</TableBody>
      </Table>
    </TableWrapper>
  ))

  return <Wrapper>{entriesTables}</Wrapper>
}

export default InfoTable
