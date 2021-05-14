import React from 'react'
import { Fade } from '@material-ui/core'
import { PageHeaderAndContentGrid, MainContentGridArea } from 'components/GridLayout'
import PageHeader from 'components/PageHeader'
import { useTranslation } from 'react-i18next'
import UsersTable from 'screens/Users/UsersTable'
import AddUserButtonDialog from './AddUserButtonDialog'
import EditUserDialog from './EditUserDialog'
import { Route } from 'react-router-dom'

const Users: React.FC = () => {
  const { t } = useTranslation()

  return (
    <>
      <Fade in>
        <PageHeaderAndContentGrid>
          <PageHeader title={t('user_plural')}>
            <AddUserButtonDialog />
          </PageHeader>
          <MainContentGridArea>
            <UsersTable />
          </MainContentGridArea>
        </PageHeaderAndContentGrid>
      </Fade>
      <Route exact path="/users/:userid">
        <EditUserDialog />
      </Route>
    </>
  )
}

export default Users
