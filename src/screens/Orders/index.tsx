import React from 'react'
import { Fade } from '@material-ui/core'
import { PageHeaderAndContentGrid, MainContentGridArea } from 'components/GridLayout'
import PageHeader from 'components/PageHeader'
import { useTranslation } from 'react-i18next'
import HeaderTabs from 'components/HeaderTabs'
import { TabProps } from '@material-ui/core/Tab'
import AddNewOrderMenu from 'screens/Orders/AddNewOrderMenu'
import DetailsDrawer from 'components/DetailsDrawer'
import FruitsOrdersTable from './FruitsOrdersTable'

const Orders: React.FC = () => {
  const { t } = useTranslation()
  const [ordersType, setOrdersType] = React.useState('fruits')

  const tabs: TabProps[] = React.useMemo(
    () => [
      {
        label: t('seedling_plural'),
        value: 'seedlings'
      },
      {
        label: t('borbulha_plural'),
        value: 'borbulhas'
      },
      {
        label: t('seeds'),
        value: 'seeds'
      },
      {
        label: t('fruit_plural'),
        value: 'fruits'
      },
      {
        label: t('rootstock_plural'),
        value: 'rootstocks'
      }
    ],
    []
  )

  return (
    <Fade in>
      <PageHeaderAndContentGrid>
        <PageHeader title={t('sale_plural')}>
          <HeaderTabs tabs={tabs} value={ordersType} onChange={v => setOrdersType(v)} />
          <AddNewOrderMenu />
        </PageHeader>
        <MainContentGridArea>
          <DetailsDrawer>
            <FruitsOrdersTable />
          </DetailsDrawer>
        </MainContentGridArea>
      </PageHeaderAndContentGrid>
    </Fade>
  )
}

export default Orders
