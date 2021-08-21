import DetailsDrawerWrapper from 'components/DetailsDrawerWrapper'
import InfoTable from 'components/InfoTable'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Divider, Grid, Typography } from '@material-ui/core'
import BenchesTable from './BenchesTable'
import DrawerActions from './DrawerActions'
import useGreenhouse from 'hooks/useGreenhouse'

type Props = { id: number }

const GreenhouseDetails: React.FC<Props> = ({ id }) => {
  const { t } = useTranslation()
  const { data: greenhouse } = useGreenhouse(id)

  if (!greenhouse) return null

  return (
    <DetailsDrawerWrapper
      header={{
        title: t('greenhouse') + ' | ',
        highlightTitle: `${greenhouse.label} (${greenhouse.ownerProperty.property.name})`,
        RightActions: <DrawerActions greenhouse={greenhouse} />
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
                      [t('name'), greenhouse.label],
                      [t('property'), greenhouse.ownerProperty.property.name],
                      [t('greenhouse_type'), t(greenhouse.type)]
                    ]}
                  />
                </Grid>
              </Grid>
            </Box>
          )
        },
        {
          label: t('bench_plural'),
          component: <BenchesTable greenhouse={greenhouse} />
        }
      ]}
    />
  )
}

export default GreenhouseDetails
