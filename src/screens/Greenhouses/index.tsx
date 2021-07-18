import React from 'react'
import { Fade } from '@material-ui/core'
import { PageHeaderAndContentGrid, MainContentGridArea } from 'components/GridLayout'
import PageHeader from 'components/PageHeader'
import { useTranslation } from 'react-i18next'
import GreenhousesTable from './GreenhousesTable'
import AddGreenhouseButtonDialog from './AddGreenhouseButtonDialog'
import DetailsDrawer from 'components/DetailsDrawer'

const Greenhouses: React.FC = () => {
  const { t } = useTranslation()

  return (
    <Fade in>
      <PageHeaderAndContentGrid>
        <PageHeader title={t('greenhouse_plural')}>
          <AddGreenhouseButtonDialog />
        </PageHeader>
        <MainContentGridArea>
          <DetailsDrawer>
            <GreenhousesTable />
          </DetailsDrawer>
        </MainContentGridArea>
      </PageHeaderAndContentGrid>
    </Fade>
  )
}

export default Greenhouses
