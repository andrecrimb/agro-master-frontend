import DetailsDrawerWrapper from 'components/DetailsDrawerWrapper'
import InfoTable from 'components/InfoTable'
import React from 'react'
import EditPropertyButtonDialog from './EditPropertyButtonDialog'
import { useTranslation } from 'react-i18next'
import { Box, Divider, Grid, Typography } from '@material-ui/core'
import useOwnerProperty from 'hooks/useOwnerProperty'
import NumberFormat from 'react-number-format'

type Props = { id: number }

const OwnerPropertyDetails: React.FC<Props> = ({ id }) => {
  const { t } = useTranslation()
  const { data } = useOwnerProperty(id)

  if (!data) return null

  return (
    <DetailsDrawerWrapper
      header={{
        title: t('property') + ' | ',
        highlightTitle: data.property.name,
        RightActions: <EditPropertyButtonDialog ownerProperty={data} />
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
                      [t('name'), data.property.name],
                      [
                        t('address'),
                        `${data.property.address}, ${data.property.city}-${data.property.state}`
                      ],
                      [
                        t('cep'),
                        <NumberFormat
                          displayType="text"
                          key={'zip-' + data.property.zip}
                          value={data.property.zip}
                          format="#####-###"
                        />
                      ],
                      [
                        t('cnpj'),
                        <NumberFormat
                          displayType="text"
                          key={'cnpj-' + data.property.cnpj}
                          value={data.property.cnpj}
                          format="##.###.###/####-##"
                        />
                      ],
                      [
                        t('ie'),
                        <NumberFormat
                          displayType="text"
                          key={'ie-' + data.property.ie}
                          value={data.property.ie}
                          format="###.###.###.###"
                        />
                      ],
                      [
                        t('cpf'),
                        <NumberFormat
                          displayType="text"
                          key={'cpf-' + data.property.cpf}
                          value={data.property.cpf}
                          format="###.###.###-##"
                        />
                      ],
                      [t('producer'), data.property.producerName]
                    ]}
                  />
                </Grid>
              </Grid>
            </Box>
          )
        }
      ]}
    />
  )
}

export default OwnerPropertyDetails
