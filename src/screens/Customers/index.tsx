import React from 'react'
import { Fade } from '@material-ui/core'
import { PageHeaderAndContentGrid, MainContentGridArea } from 'components/GridLayout'
import PageHeader from 'components/PageHeader'
import { useTranslation } from 'react-i18next'
import CustomersTable from './CustomersTable'
import AddCustomerButtonDialog from './AddCustomerButtonDialog'
import DetailsDrawer from 'components/DetailsDrawer'

const Customers: React.FC = () => {
  const { t } = useTranslation()

  return (
    <>
      <Fade in>
        <PageHeaderAndContentGrid>
          <PageHeader title={t('customer_plural')}>
            <AddCustomerButtonDialog />
          </PageHeader>
          <MainContentGridArea>
            <DetailsDrawer>
              <CustomersTable />
            </DetailsDrawer>
          </MainContentGridArea>
        </PageHeaderAndContentGrid>
      </Fade>
    </>
  )
}

export default Customers
