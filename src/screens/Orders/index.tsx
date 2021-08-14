import React from 'react'
import { Fade } from '@material-ui/core'
import { PageHeaderAndContentGrid, MainContentGridArea } from 'components/GridLayout'
import PageHeader from 'components/PageHeader'
import { useTranslation } from 'react-i18next'
import HeaderTabs from 'components/HeaderTabs'
import { TabProps } from '@material-ui/core/Tab'
import AddOrderButtonDialog from 'screens/Orders/AddOrderButtonDialog'
import DetailsDrawer from 'components/DetailsDrawer'
import FruitOrdersTable from './FruitOrdersTable'
import SeedlingOrdersTable from './SeedlingOrdersTable'
import BorbulhaOrdersTable from './BorbulhaOrdersTable'
import SeedOrdersTable from './SeedOrdersTable'
import RootstockOrdersTable from './RootstockOrdersTable'
import { OrderType } from 'types/orders'

const Orders: React.FC = () => {
  const { t } = useTranslation()
  const [ordersType, setOrdersType] = React.useState<OrderType>('seedling')

  const tabs: TabProps[] = React.useMemo(
    () => [
      {
        label: t('seedling_plural'),
        value: 'seedling'
      },
      {
        label: t('borbulha_plural'),
        value: 'borbulha'
      },
      {
        label: t('seed_plural'),
        value: 'seed'
      },
      {
        label: t('fruit_plural'),
        value: 'fruit'
      },
      {
        label: t('rootstock_plural'),
        value: 'rootstock'
      }
    ],
    []
  )

  return (
    <Fade in>
      <PageHeaderAndContentGrid>
        <PageHeader title={t('sale_plural')}>
          <HeaderTabs tabs={tabs} value={ordersType} onChange={v => setOrdersType(v)} />
          <AddOrderButtonDialog />
        </PageHeader>
        <MainContentGridArea>
          <DetailsDrawer>
            {ordersType === 'seedling' ? <SeedlingOrdersTable /> : null}
            {ordersType === 'fruit' ? <FruitOrdersTable /> : null}
            {ordersType === 'borbulha' ? <BorbulhaOrdersTable /> : null}
            {ordersType === 'seed' ? <SeedOrdersTable /> : null}
            {ordersType === 'rootstock' ? <RootstockOrdersTable /> : null}
          </DetailsDrawer>
        </MainContentGridArea>
      </PageHeaderAndContentGrid>
    </Fade>
  )
}

export default Orders