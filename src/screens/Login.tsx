import React from 'react'
import styled from 'styledComponents'
import { useForm, Controller } from 'react-hook-form'
import { TextField, Fade, Button, Grid } from '@material-ui/core'
import LoadingButton from 'components/LoadingButton'
import { useTranslation } from 'react-i18next'
import { LoginGrid, LoginFormGridArea, LoginInfoGridArea } from 'components/GridLayout'
import useLogin from 'hooks/useLogin'

const FormWrapper = styled.div`
  text-align: center;
  max-width: 300px;
  margin-top: -10%;
  #app-logo {
    margin-bottom: 26px;
    height: 46px;
  }
`

type LoginForm = { email: string; password: string }

const Login: React.FC = () => {
  const { t } = useTranslation()
  const loginAuth = useLogin()

  const { handleSubmit, control } = useForm<LoginForm>({
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
            <form onSubmit={handleSubmit(data => loginAuth.mutate(data))}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Controller
                    control={control}
                    name="email"
                    render={({ field }) => (
                      <TextField
                        id="email"
                        type="email"
                        autoFocus
                        fullWidth
                        required
                        variant="outlined"
                        label={t('email')}
                        {...field}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    control={control}
                    name="password"
                    render={({ field }) => (
                      <TextField
                        id="password"
                        type="password"
                        fullWidth
                        required
                        variant="outlined"
                        label={t('password')}
                        {...field}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <LoadingButton
                    fullWidth
                    size="large"
                    color="secondary"
                    variant="contained"
                    isLoading={loginAuth.isLoading}
                    type="submit"
                  >
                    {t('login')}
                  </LoadingButton>
                </Grid>
                <Grid item xs={12}>
                  <Button fullWidth size="large" variant="outlined" disabled={loginAuth.isLoading}>
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
