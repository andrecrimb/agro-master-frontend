import React from 'react'
import { Fade } from '@material-ui/core'
import { PageHeaderAndContentGrid, MainContentGridArea } from 'components/GridLayout'
import PageHeader from 'components/PageHeader'
import { useTranslation } from 'react-i18next'
import HeaderTabs from 'components/HeaderTabs'
import { TabProps } from '@material-ui/core/Tab'
import AddOrderButtonDialog from 'screens/Orders/AddOrderButtonDialog'
import DetailsDrawer from 'components/DetailsDrawer'
import FruitsOrdersTable from './fruits/FruitsOrdersTable'
import SeedlingsOrdersTable from './seedlings/SeedlingsOrdersTable'
import BorbulhasOrdersTable from './borbulhas/BorbulhaOrdersTable'
import SeedsOrdersTable from './seeds/SeedsOrdersTable'
import RootstocksOrdersTable from './rootstocks/RootstockOrdersTable'
import { OrderType } from 'types/orders'
import { StringParam, useQueryParam } from 'use-query-params'

const Orders: React.FC = () => {
  const { t } = useTranslation()
  const [ordersTypeParam, setOrdersType] = useQueryParam('ordersType', StringParam)
  const ordersType = ordersTypeParam as OrderType | null | undefined

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
            {ordersType === 'seedling' ? <SeedlingsOrdersTable /> : null}
            {ordersType === 'fruit' ? <FruitsOrdersTable /> : null}
            {ordersType === 'borbulha' ? <BorbulhasOrdersTable /> : null}
            {ordersType === 'seed' ? <SeedsOrdersTable /> : null}
            {ordersType === 'rootstock' ? <RootstocksOrdersTable /> : null}
          </DetailsDrawer>
        </MainContentGridArea>
      </PageHeaderAndContentGrid>
    </Fade>
  )
}

export default Orders
