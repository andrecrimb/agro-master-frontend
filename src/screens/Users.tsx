import React from 'react'
import { Fade, IconButton } from '@material-ui/core'
import { PageHeaderAndContentGrid, MainContentGridArea } from 'components/GridLayout'
import PageHeader from 'components/PageHeader'
import { useTranslation } from 'react-i18next'
import HeaderTabs from 'components/HeaderTabs'
import { AddRounded as AddIcon } from '@material-ui/icons'

const Users: React.FC = () => {
  const { t } = useTranslation()
  const [active, setActive] = React.useState(1)

  return (
    <Fade in>
      <PageHeaderAndContentGrid>
        <PageHeader title={t('user_plural')}>
          <HeaderTabs
            value={active}
            onChange={v => setActive(v)}
            tabs={[
              { label: 'Tab1', value: 1 },
              { label: 'Tab2', value: 2 },
              { label: 'Tab3', value: 3 },
              { label: 'Tab4', value: 4 }
            ]}
          />
          <IconButton color="inherit">
            <AddIcon />
          </IconButton>
        </PageHeader>
        <MainContentGridArea>
          <h1>Loading ....</h1>
        </MainContentGridArea>
      </PageHeaderAndContentGrid>
    </Fade>
  )
}

export default Users
