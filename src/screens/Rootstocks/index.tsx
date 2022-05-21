import React from 'react'
import { Fade } from '@material-ui/core'
import { PageHeaderAndContentGrid, MainContentGridArea } from 'components/GridLayout'
import PageHeader from 'components/PageHeader'
import { useTranslation } from 'react-i18next'
import RootstocksTable from './RootstocksTable'
import AddRootstockButtonDialog from './AddRootstockButtonDialog'
import EditRootstockDialog from './EditRootstockDialog'
import { Route, Routes } from 'react-router-dom'

const Rootstocks: React.FC = () => {
  const { t } = useTranslation()

  return (
    <>
      <Fade in>
        <PageHeaderAndContentGrid>
          <PageHeader title={t('rootstock_plural')}>
            <AddRootstockButtonDialog />
          </PageHeader>
          <MainContentGridArea>
            <RootstocksTable />
          </MainContentGridArea>
        </PageHeaderAndContentGrid>
      </Fade>
      <Routes>
        <Route path=":rootstockId" element={<EditRootstockDialog />} />
      </Routes>
    </>
  )
}

export default Rootstocks
