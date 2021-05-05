import React from 'react'
import { Fade } from '@material-ui/core'
import { PageHeaderAndContentGrid, MainContentGridArea } from 'components/GridLayout'
import PageHeader from 'components/PageHeader'
import { useTranslation } from 'react-i18next'

const Users: React.FC = () => {
  const { t } = useTranslation()

  return (
    <Fade in>
      <PageHeaderAndContentGrid>
        <PageHeader title={t('user_plural')} />
        <MainContentGridArea>
          <h1>testeeee</h1>
        </MainContentGridArea>
      </PageHeaderAndContentGrid>
    </Fade>
  )
}

export default Users
