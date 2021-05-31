import DetailsDrawerWrapper from 'components/DetailsDrawerWrapper'
import InfoTable from 'components/InfoTable'
import useUser from 'hooks/useUser'
import React from 'react'
import EditUserButtonDialog from './EditUserButtonDialog'
import { useTranslation } from 'react-i18next'
import { Box, Divider, Grid, Typography } from '@material-ui/core'
import { Check as CheckIcon, Close as CloseIcon } from '@material-ui/icons'

type Props = { id: number }

const UserDetails: React.FC<Props> = ({ id }) => {
  const { t } = useTranslation()
  const { data: user } = useUser(id)

  if (!user) return null

  return (
    <DetailsDrawerWrapper
      header={{
        title: t('user') + ' | ',
        highlightTitle: `${user.firstName} ${user.lastName || ''} ${
          user.nickname !== '' ? `(${user.nickname})` : ''
        }`
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
                        `${user.firstName} ${user.lastName} ${
                          user.nickname ? '(' + user.nickname + ')' : ''
                        }`
                      ],
                      [t('email'), user.email],
                      [
                        t('superUser'),
                        user.isSuperuser ? (
                          <CheckIcon color="primary" />
                        ) : (
                          <CloseIcon color="error" />
                        )
                      ],
                      [
                        t('active'),
                        user.active ? <CheckIcon color="primary" /> : <CloseIcon color="error" />
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
                {user.phoneNumbers?.length ? (
                  <Grid item xs={12}>
                    <InfoTable
                      entries={user.phoneNumbers.map(phoneNumber => [
                        phoneNumber.label,
                        phoneNumber.number
                      ])}
                    />
                  </Grid>
                ) : null}
                <Grid item xs={12}>
                  <Box textAlign="right">
                    <EditUserButtonDialog userId={id} />
                  </Box>
                </Grid>
              </Grid>
            </Box>
          )
        }
      ]}
    />
  )
}

export default UserDetails
