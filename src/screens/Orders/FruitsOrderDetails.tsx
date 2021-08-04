import DetailsDrawerWrapper from 'components/DetailsDrawerWrapper'
import InfoTable from 'components/InfoTable'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Divider, Grid, Typography } from '@material-ui/core'
import PaymentsTable from './PaymentsTable'
import FruitsOrderItemsTable from './FruitsOrderItemsTable'
import useFruitsOrder from 'hooks/useFruitsOrder'
import { formatDate } from 'utils/utils'
import DrawerActions from './DrawerActions'

type Props = { id: number }

const FruitsOrderDetails: React.FC<Props> = ({ id }) => {
  const { t } = useTranslation()
  const { data: fruitsOrder } = useFruitsOrder(id)

  if (!fruitsOrder) return null

  return (
    <DetailsDrawerWrapper
      header={{
        title: t('fruits_order') + ' | ',
        highlightTitle: `${fruitsOrder.customerProperty.customer.firstName} ${
          fruitsOrder.customerProperty.customer.lastName || ''
        } (${formatDate(fruitsOrder.orderDate, 'DD/MM/YYYY')})`,
        RightActions: <DrawerActions orderId={id} />
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
                      [t('order_date'), formatDate(fruitsOrder.orderDate)],
                      [t('delivery_date'), formatDate(fruitsOrder.deliveryDate)],
                      [t('invoice_number'), fruitsOrder.nfNumber],
                      [t('installment_number'), fruitsOrder.installmentsNumber],
                      [
                        t('registered_by'),
                        `${fruitsOrder.user.firstName} ${fruitsOrder.user.lastName}`
                      ]
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
                        `${fruitsOrder.customerProperty.customer.firstName} ${
                          fruitsOrder.customerProperty.customer.lastName
                        } ${
                          fruitsOrder.customerProperty.customer.nickname
                            ? '(' + fruitsOrder.customerProperty.customer.nickname + ')'
                            : ''
                        }`
                      ],
                      [t('property'), fruitsOrder.customerProperty.property.name],
                      [t('producer'), fruitsOrder.customerProperty.property.producerName],
                      [t('cnpj'), fruitsOrder.customerProperty.property.cnpj],
                      [t('ie'), fruitsOrder.customerProperty.property.ie],
                      [
                        t('address'),
                        `${fruitsOrder.customerProperty.property.address}, 
                        ${fruitsOrder.customerProperty.property.city} - ${fruitsOrder.customerProperty.property.state} 
                        ${fruitsOrder.customerProperty.property.zip}`
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
          component: <PaymentsTable payments={fruitsOrder.payments} />
        },
        {
          label: t('order_items'),
          component: <FruitsOrderItemsTable orderItems={fruitsOrder.fruitOrderItems} />
        }
      ]}
    />
  )
}

export default FruitsOrderDetails
