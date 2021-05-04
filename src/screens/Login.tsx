import React from 'react'
import styled from 'styledComponents'
import { useForm } from 'react-hook-form'
import { TextField, Fade, Button, Grid } from '@material-ui/core'
import LoadingButton from 'components/LoadingButton'
import { useTranslation } from 'react-i18next'
import { LoginGrid, LoginFormGridArea, LoginInfoGridArea } from 'components/GridLayout'

const FormWrapper = styled.div`
  text-align: center;
  max-width: 300px;
  #app-logo {
    margin-bottom: 26px;
    height: 46px;
  }
`

type LoginForm = { email: string; password: string }

const Login: React.FC = () => {
  const { t } = useTranslation()

  const { register, handleSubmit } = useForm<LoginForm>({
    defaultValues: { email: '', password: '' }
  })

  return (
    <LoginGrid>
      <LoginFormGridArea>
        <Fade in>
          <FormWrapper>
            <img
              id="app-logo"
              src={`${process.env.PUBLIC_URL}/logo_full.svg`}
              alt={`${process.env.REACT_APP_NAME}`}
            />
            <form onSubmit={handleSubmit(data => console.log(data))}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    {...register('email')}
                    id="email"
                    autoFocus
                    fullWidth
                    required
                    variant="outlined"
                    label={t('email')}
                    type="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    {...register('password')}
                    id="password"
                    fullWidth
                    required
                    variant="outlined"
                    label={t('password')}
                    type="password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <LoadingButton fullWidth size="large" color="secondary" variant="contained">
                    {t('login')}
                  </LoadingButton>
                </Grid>
                <Grid item xs={12}>
                  <Button fullWidth size="large" variant="outlined">
                    {t('forgotPassword')}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </FormWrapper>
        </Fade>
      </LoginFormGridArea>
      <LoginInfoGridArea></LoginInfoGridArea>
    </LoginGrid>
  )
}

export default Login
