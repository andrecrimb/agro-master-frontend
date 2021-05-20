import React from 'react'
import { Fade } from '@material-ui/core'
import { PageHeaderAndContentGrid, MainContentGridArea } from 'components/GridLayout'
import PageHeader from 'components/PageHeader'
import { useTranslation } from 'react-i18next'
import PropertiesTable from 'screens/OwnerProperties/PropertiesTable'
import AddPropertyButtonDialog from './AddPropertyButtonDialog'
// import EditUserDialog from './EditUserDialog'
import { Route } from 'react-router-dom'

const Properties: React.FC = () => {
  const { t } = useTranslation()

  return (
    <>
      <Fade in>
        <PageHeaderAndContentGrid>
          <PageHeader title={t('property_plural')}>{<AddPropertyButtonDialog />}</PageHeader>
          <MainContentGridArea>
            <PropertiesTable />
          </MainContentGridArea>
        </PageHeaderAndContentGrid>
      </Fade>
      <Route exact path="/properties/:propertyid">
        <h1>lksdjflskd</h1>
        {/* <EditUserDialog /> */}
      </Route>
    </>
  )
}

export default Properties
