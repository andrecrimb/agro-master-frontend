import DetailsDrawerWrapper from 'components/DetailsDrawerWrapper'
import InfoTable from 'components/InfoTable'
import useCustomer from 'hooks/useCustomer'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Check as CheckIcon, Close as CloseIcon } from '@material-ui/icons'
import PropertiesTable from './PropertiesTable'
import DrawerActions from './DrawerActions'
import NumberFormat from 'react-number-format'
import CleanAccordion from 'components/CleanAccordion'
type Props = { id: number }

const CustomerDetails: React.FC<Props> = ({ id }) => {
  const { t } = useTranslation()
  const { data: customer } = useCustomer(id)

  if (!customer) return null

  return (
    <DetailsDrawerWrapper
      header={{
        title: t('customer') + ' | ',
        highlightTitle: `${customer.name} ${
          customer.nickname !== '' ? `(${customer.nickname})` : ''
        }`,
        RightActions: <DrawerActions customer={customer} />
      }}
      tabs={[
        {
          label: '',
          component: (
            <>
              <CleanAccordion id="generalData" header={t('generalData')}>
                <InfoTable
                  entries={[
                    [
                      t('name'),
                      `${customer.name} ${customer.nickname ? '(' + customer.nickname + ')' : ''}`
                    ],
                    [t('address'), `${customer.address}, ${customer.city}-${customer.state}`],
                    [
                      t('cep'),
                      <NumberFormat
                        displayType="text"
                        key={'zip-' + customer.zip}
                        value={customer.zip}
                        format="#####-###"
                      />
                    ],
                    [
                      t('active'),
                      customer.active ? <CheckIcon color="primary" /> : <CloseIcon color="error" />
                    ]
                  ]}
                />
              </CleanAccordion>
              <CleanAccordion id="contact" header={t('contact')}>
                {customer.phoneNumbers?.length ? (
                  <InfoTable
                    entries={customer.phoneNumbers.map(phoneNumber => [
                      phoneNumber.label,
                      <NumberFormat
                        displayType="text"
                        key={'phone-' + phoneNumber.number}
                        value={phoneNumber.number}
                        format="(##) #########"
                      />
                    ])}
                  />
                ) : null}
              </CleanAccordion>
              <CleanAccordion
                childrenPadding={false}
                id="property_plural"
                header={t('property_plural')}
              >
                <PropertiesTable customerId={id} />
              </CleanAccordion>
            </>
          )
        }
      ]}
    />
  )
}

export default CustomerDetails
