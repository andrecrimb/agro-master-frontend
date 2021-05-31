import React from 'react'
import { Fade } from '@material-ui/core'
import { PageHeaderAndContentGrid, MainContentGridArea } from 'components/GridLayout'
import PageHeader from 'components/PageHeader'
import { useTranslation } from 'react-i18next'
import PropertiesTable from 'screens/OwnerProperties/PropertiesTable'
import AddPropertyButtonDialog from './AddPropertyButtonDialog'
import DetailsDrawer from 'components/DetailsDrawer'

const Properties: React.FC = () => {
  const { t } = useTranslation()
  return (
    <Fade in>
      <PageHeaderAndContentGrid>
        <PageHeader title={t('property_plural')}>{<AddPropertyButtonDialog />}</PageHeader>
        <MainContentGridArea>
          <DetailsDrawer>
            <PropertiesTable />
          </DetailsDrawer>
        </MainContentGridArea>
      </PageHeaderAndContentGrid>
    </Fade>
  )
}

export default Properties
