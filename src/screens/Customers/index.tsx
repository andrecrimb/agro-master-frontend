import React from 'react'
import { Fade } from '@material-ui/core'
import { PageHeaderAndContentGrid, MainContentGridArea } from 'components/GridLayout'
import PageHeader from 'components/PageHeader'
import { useTranslation } from 'react-i18next'
import CustomersTable from './CustomersTable'
import AddCustomerButtonDialog from './AddCustomerButtonDialog'
import EditCustomerDialog from './EditCustomerDialog'
import { Route } from 'react-router-dom'
import routes from 'routes'

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
            <CustomersTable />
          </MainContentGridArea>
        </PageHeaderAndContentGrid>
      </Fade>
      <Route exact path={`${routes.customers}/:customerId`}>
        <EditCustomerDialog />
      </Route>
    </>
  )
}

export default Customers
