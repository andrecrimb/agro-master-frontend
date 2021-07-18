import React from 'react'
import Table from 'components/table/Table'
import { Greenhouse } from 'types/greenhouse'
import ScreenPlaceholder from 'components/ScreenPlaceholder'
import { useTranslation } from 'react-i18next'
import { usePagination, useSortBy } from 'react-table'
import {
  benchFirstPaymentDate,
  benchLabel,
  benchLastPlantingDate,
  benchQuantity,
  benchRootstock,
  benchResponsible,
  benchActions
} from 'components/table/cells'

type Props = { greenhouse: Greenhouse }

const columns = [
  benchLabel,
  benchQuantity,
  benchRootstock,
  benchLastPlantingDate,
  benchFirstPaymentDate,
  benchResponsible,
  benchActions
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
