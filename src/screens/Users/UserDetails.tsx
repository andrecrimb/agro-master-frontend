import DetailsDrawerWrapper from 'components/DetailsDrawerWrapper'
import InfoTable from 'components/InfoTable'
import useUser from 'hooks/useUser'
import React from 'react'
import EditUserButtonDialog from './EditUserButtonDialog'
import { useTranslation } from 'react-i18next'
import { Check as CheckIcon, Close as CloseIcon } from '@material-ui/icons'
import NumberFormat from 'react-number-format'
import CleanAccordion from 'components/CleanAccordion'

type Props = { id: number }

const UserDetails: React.FC<Props> = ({ id }) => {
  const { t } = useTranslation()
  const { data: user } = useUser(id)

  if (!user) return null

  return (
    <DetailsDrawerWrapper
      header={{
        title: t('user') + ' | ',
        highlightTitle: user.name,
        RightActions: <EditUserButtonDialog user={user} />
      }}
      tabs={[
        {
          label: t('general'),
          component: (
            <>
              <CleanAccordion id="general_data" header={t('generalData')}>
                <InfoTable
                  entries={[
                    [t('name'), user.name],
                    [t('email'), user.email],
                    [
                      t('superUser'),
                      user.isSuperuser ? <CheckIcon color="primary" /> : <CloseIcon color="error" />
                    ],
                    [
                      t('active'),
                      user.active ? <CheckIcon color="primary" /> : <CloseIcon color="error" />
                    ]
                  ]}
                />
              </CleanAccordion>
              <CleanAccordion id="contact" header={t('contact')}>
                {user.phoneNumbers?.length ? (
                  <InfoTable
                    entries={user.phoneNumbers.map(phoneNumber => [
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
            </>
          )
        }
      ]}
    />
  )
}

export default UserDetails
