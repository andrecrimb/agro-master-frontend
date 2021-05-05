import React from 'react'
import { FindInPageRounded as NotFoundIcon } from '@material-ui/icons'
import styled from 'styledComponents'
import ScreenPlaceholder from './ScreenPlaceholder'
import { useTranslation } from 'react-i18next'

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 5%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const PageNotFoundPlaceholder: React.FC = () => {
  const { t } = useTranslation()
  return (
    <Wrapper>
      <ScreenPlaceholder
        children={t('notFound')}
        description={t('pageDoesNotExist')}
        icon={NotFoundIcon}
      />
    </Wrapper>
  )
}

export default PageNotFoundPlaceholder
