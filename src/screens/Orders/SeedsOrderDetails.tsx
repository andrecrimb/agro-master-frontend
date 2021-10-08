import DetailsDrawerWrapper from 'components/DetailsDrawerWrapper'
import InfoTable from 'components/InfoTable'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Chip } from '@material-ui/core'
import PaymentsTable from './PaymentsTable'
import SeedsOrderItemsTable from './SeedsOrderItemsTable'
import useOrder from 'hooks/useOrder'
import { formatDate } from 'utils/utils'
import DrawerActions from './DrawerActions'
import NumberFormat from 'react-number-format'
import CleanAccordion from 'components/CleanAccordion'

type Props = { id: number }

const SeedsOrderDetails: React.FC<Props> = ({ id }) => {
  const { t } = useTranslation()
  const { data: order } = useOrder(id)

  if (!order) return null

  return (
    <DetailsDrawerWrapper
      header={{
        title: t('seeds_order') + ' | ',
        highlightTitle: `${order.customerProperty.customer.name} (${formatDate(
          order.orderDate,
          'DD/MM/YYYY'
        )})`,
        RightActions: order.status === 'issued' ? <DrawerActions order={order} /> : null
      }}
      tabs={[
        {
          label: t('generalData'),
          component: (
            <>
              <CleanAccordion id="general_data" header={t('generalData')}>
                <InfoTable
                  entries={[
                    [t('order_date'), formatDate(order.orderDate)],
                    [t('delivery_date'), formatDate(order.deliveryDate)],
                    [t('invoice_number'), order.nfNumber],
                    [t('status'), <Chip key="order-status" label={t(order.status)} />],
                    [t('registered_by'), `${order.user.name}`]
                  ]}
                />
              </CleanAccordion>
              <CleanAccordion id="customer_info" header={t('customer_info')}>
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
                    [
                      t('cnpj'),
                      <NumberFormat
                        displayType="text"
                        key={'cnpj-' + order.customerProperty.property.cnpj}
                        value={order.customerProperty.property.cnpj}
                        format="##.###.###/####-##"
                      />
                    ],
                    [
                      t('cpf'),
                      <NumberFormat
                        displayType="text"
                        key={'cpf-' + order.customerProperty.property.cpf}
                        value={order.customerProperty.property.cpf}
                        format="###.###.###-##"
                      />
                    ],
                    [
                      t('ie'),
                      <NumberFormat
                        displayType="text"
                        key={'ie-' + order.customerProperty.property.ie}
                        value={order.customerProperty.property.ie}
                        format="###.###.###.###"
                      />
                    ],
                    [
                      t('address'),
                      `${order.customerProperty.property.address}, 
                        ${order.customerProperty.property.city} - ${order.customerProperty.property.state}`
                    ],
                    [
                      t('cep'),
                      <NumberFormat
                        displayType="text"
                        key={'zip-' + order.customerProperty.property.zip}
                        value={order.customerProperty.property.zip}
                        format="#####-###"
                      />
                    ]
                  ]}
                />
              </CleanAccordion>
              <CleanAccordion id="order_items" header={t('order_items')} childrenPadding={false}>
                <SeedsOrderItemsTable orderItems={order.seedOrderItems} />
              </CleanAccordion>
              <CleanAccordion
                id="payment_plural"
                header={t('payment_plural')}
                childrenPadding={false}
              >
                <PaymentsTable payments={order.payments} />
              </CleanAccordion>
            </>
          )
        }
      ]}
    />
  )
}

export default SeedsOrderDetails
