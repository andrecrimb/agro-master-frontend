import React from 'react'
import { FindInPageRounded as NotFoundIcon } from '@material-ui/icons'
import ScreenPlaceholder from './ScreenPlaceholder'
import { useTranslation } from 'react-i18next'

const PageNotFoundPlaceholder: React.FC = () => {
  const { t } = useTranslation()
  return (
    <ScreenPlaceholder
      title={t('notFound')}
      description={t('pageDoesNotExist')}
      Icon={NotFoundIcon}
    />
  )
}

export default PageNotFoundPlaceholder
