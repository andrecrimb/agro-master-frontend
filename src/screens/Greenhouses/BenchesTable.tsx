import React from 'react'
import Table from 'components/table/Table'
import { Greenhouse, SeedlingBench } from 'types/greenhouse'
import ScreenPlaceholder from 'components/ScreenPlaceholder'
import { useTranslation } from 'react-i18next'
import { usePagination, useSortBy } from 'react-table'
import {
  benchFirstPaymentDate,
  benchLabel,
  benchLastPlantingDate,
  benchQuantity,
  benchRootstock,
  benchResponsible
} from 'components/table/cells'
import { Column } from 'react-table'
import EditBenchButtonDialog from './EditBenchButtonDialog'

type Props = { greenhouse: Greenhouse }

const columns: Column<SeedlingBench>[] = [
  benchLabel,
  benchQuantity,
  benchRootstock,
  benchLastPlantingDate,
  benchFirstPaymentDate,
  benchResponsible,
  {
    Header: ' ',
    id: 'benchActions',
    Cell: ({
      cell: {
        row: { original }
      }
    }) => <EditBenchButtonDialog bench={original} />
  }
]

const BenchesTable: React.FC<Props> = ({ greenhouse }) => {
  const { t } = useTranslation()

  const initialState = React.useMemo(
    () => ({
      sortBy: [{ id: 'label', desc: false }]
    }),
    []
  )
  if (!greenhouse.seedlingBenches.length) {
    return <ScreenPlaceholder description={t('no_benches')} />
  }

  return (
    <Table
      columns={columns}
      data={greenhouse.seedlingBenches}
      plugins={[useSortBy, usePagination]}
      options={{
        disableSortRemove: true,
        autoResetSortBy: false,
        initialState
      }}
    />
  )
}

export default BenchesTable
