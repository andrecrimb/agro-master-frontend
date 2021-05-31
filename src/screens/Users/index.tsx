import React from 'react'
import { Fade } from '@material-ui/core'
import { PageHeaderAndContentGrid, MainContentGridArea } from 'components/GridLayout'
import PageHeader from 'components/PageHeader'
import { useTranslation } from 'react-i18next'
import UsersTable from 'screens/Users/UsersTable'
import AddUserButtonDialog from './AddUserButtonDialog'
import DetailsDrawer from 'components/DetailsDrawer'

const Users: React.FC = () => {
  const { t } = useTranslation()

  return (
    <Fade in>
      <PageHeaderAndContentGrid>
        <PageHeader title={t('user_plural')}>
          <AddUserButtonDialog />
        </PageHeader>
        <MainContentGridArea>
          <DetailsDrawer>
            <UsersTable />
          </DetailsDrawer>
        </MainContentGridArea>
      </PageHeaderAndContentGrid>
    </Fade>
  )
}

export default Users
