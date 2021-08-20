import DetailsDrawerWrapper from 'components/DetailsDrawerWrapper'
import InfoTable from 'components/InfoTable'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Divider, Grid, Typography, Chip } from '@material-ui/core'
import PaymentsTable from './PaymentsTable'
import BorbulhasOrderItemsTable from './BorbulhasOrderItemsTable'
import useOrder from 'hooks/useOrder'
import { formatDate } from 'utils/utils'
import DrawerActions from './DrawerActions'

type Props = { id: number }

const BorbulhasOrderDetails: React.FC<Props> = ({ id }) => {
  const { t } = useTranslation()
  const { data: order } = useOrder(id)

  if (!order) return null

  return (
    <DetailsDrawerWrapper
      header={{
        title: t('borbulhas_order') + ' | ',
        highlightTitle: `${order.customerProperty.customer.name} (${formatDate(
          order.orderDate,
          'DD/MM/YYYY'
        )})`,
        RightActions:
          order.status === 'issued' ? <DrawerActions orderType="borbulha" orderId={id} /> : null
      }}
      tabs={[
        {
          label: t('general'),
          component: (
            <Box padding="16px">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography color="textSecondary" display="block" variant="subtitle1">
                    {t('generalData')}
                  </Typography>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  <InfoTable
                    entries={[
                      [t('order_date'), formatDate(order.orderDate)],
                      [t('delivery_date'), formatDate(order.deliveryDate)],
                      [t('invoice_number'), order.nfNumber],
                      [t('status'), <Chip key="order-status" label={t(order.status)} />],
                      [t('registered_by'), `${order.user.name}`]
                    ]}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography color="textSecondary" display="block" variant="subtitle1">
                    {t('customer_info')}
                  </Typography>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  <InfoTable
                    entries={[
                      [
                        t('customer'),
                        `${order.customerProperty.customer.name} ${
                          order.customerProperty.customer.nickname
                            ? '(' + order.customerProperty.customer.nickname + ')'
                            : ''
                        }`
                      ],
                      [t('property'), order.customerProperty.property.name],
                      [t('producer'), order.customerProperty.property.producerName],
                      [t('cnpj'), order.customerProperty.property.cnpj],
                      [t('ie'), order.customerProperty.property.ie],
                      [
                        t('address'),
                        `${order.customerProperty.property.address}, 
                        ${order.customerProperty.property.city} - ${order.customerProperty.property.state} 
                        ${order.customerProperty.property.zip}`
                      ]
                    ]}
                  />
                </Grid>
              </Grid>
            </Box>
          )
        },
        {
          label: t('payment_plural'),
          component: <PaymentsTable payments={order.payments} />
        },
        {
          label: t('order_items'),
          component: <BorbulhasOrderItemsTable orderItems={order.borbulhaOrderItems} />
        }
      ]}
    />
  )
}

export default BorbulhasOrderDetails
