import DetailsDrawerWrapper from 'components/DetailsDrawerWrapper'
import InfoTable from 'components/InfoTable'
import useCustomer from 'hooks/useCustomer'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Divider, Grid, Typography } from '@material-ui/core'
import { Check as CheckIcon, Close as CloseIcon } from '@material-ui/icons'
import PropertiesTable from './PropertiesTable'
import DrawerActions from './DrawerActions'
import NumberFormat from 'react-number-format'

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
                        customer.active ? (
                          <CheckIcon color="primary" />
                        ) : (
                          <CloseIcon color="error" />
                        )
                      ]
                    ]}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography color="textSecondary" display="block" variant="subtitle1">
                    {t('contact')}
                  </Typography>
                  <Divider />
                </Grid>

                {customer.phoneNumbers?.length ? (
                  <Grid item xs={12}>
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
                  </Grid>
                ) : null}
              </Grid>
            </Box>
          )
        },
        {
          label: t('property_plural'),
          component: <PropertiesTable customerId={id} />
        }
      ]}
    />
  )
}

export default CustomerDetails
