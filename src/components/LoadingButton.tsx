import { Button, IconButton, CircularProgress } from '@material-ui/core'
import React from 'react'
import styled from 'styledComponents'
import { useTranslation } from 'react-i18next'

//#region Interface Props
export type Props = any & {
  isLoading?: boolean
  icon?: React.ReactNode
}
//#endregion

//#region Styles
const ButtonWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`
const Progress = styled(CircularProgress)`
  position: absolute;
`
//#endregion

const LoadingButton: React.FC<Props> = ({ isLoading = false, children, icon, ...other }) => {
  const { t } = useTranslation()

  return (
    <ButtonWrapper>
      {children ? (
        <>
          <Button disabled={isLoading} {...other}>
            {children}
          </Button>
          {isLoading ? <Progress aria-label={t('loading')} size={16} color="secondary" /> : null}
        </>
      ) : (
        <>
          <IconButton disabled={isLoading} {...other}>
            {icon}
          </IconButton>
          {isLoading ? <Progress aria-label={t('loading')} size={16} color="secondary" /> : null}
        </>
      )}
    </ButtonWrapper>
  )
}

export default LoadingButton
