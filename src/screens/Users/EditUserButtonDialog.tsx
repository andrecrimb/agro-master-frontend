import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  IconButton,
  Button,
  Grid,
  Switch,
  Typography,
  FormControlLabel,
  TextField,
  Divider,
  Tooltip
} from '@material-ui/core'
import {
  PhoneRounded as PhoneIcon,
  ClearRounded as ClearIcon,
  EditRounded as EditIcon
} from '@material-ui/icons'
import { useTranslation } from 'react-i18next'
import { useForm, Controller, useFieldArray } from 'react-hook-form'
import LoadingButton from 'components/LoadingButton'
import useEditUser from 'hooks/useEditUser'
import { muiTheme } from 'theme'
import { User } from 'types/user'

const FORM_DEFAULT_VALUES = {
  name: '',
  email: '',
  password: '',
  passwordRepeat: '',
  active: true,
  isSuperuser: true,
  phoneNumbers: [{ label: '', number: '' }]
}

type Props = { user: User }

const EditUserButtonDialog: React.FC<Props> = ({ user }) => {
  const { t } = useTranslation()
  const [open, setOpen] = React.useState(false)

  const editUser = useEditUser()

  const { handleSubmit, control, register, formState, setError, reset } = useForm({
    defaultValues: FORM_DEFAULT_VALUES
  })

  const { fields, append, remove } = useFieldArray({
    name: 'phoneNumbers',
    control
  })

  const { ref: nameRef, ...name } = register('name')
  const { ref: emailRef, ...email } = register('email')
  const { ref: passwordRef, ...password } = register('password')
  const { ref: passwordRepeatRef, ...passwordRepeat } = register('passwordRepeat')

  React.useEffect(() => {
    if (open) {
      reset(user)
    }
  }, [open])

  return (
    <>
      <Tooltip arrow title={t('edit') + ''}>
        <IconButton onClick={() => setOpen(true)}>
          <EditIcon />
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        fullWidth
        maxWidth="sm"
        onClose={() => setOpen(false)}
        aria-labelledby="dialog-title"
      >
        <DialogTitle id="dialog-title">
          {t('edit_user')} |{' '}
          <span style={{ color: muiTheme.palette.primary.main }}>{user.name}</span>
        </DialogTitle>
        <form
          onSubmit={handleSubmit(({ passwordRepeat, ...formValues }) => {
            const {
              password: dirtyPassword,
              passwordRepeat: dirtyPassRepeat,
              ...dirtyFields
            } = formState.dirtyFields

            const shouldUpdatePassword = dirtyPassword && formValues.password !== ''

            if (passwordRepeat !== formValues.password) {
              setError('password', { message: 'passwords_dont_match' })
              return setError('passwordRepeat', { message: 'passwords_dont_match' })
            }

            const dataToEdit = Object.keys(
              shouldUpdatePassword ? formState.dirtyFields : dirtyFields
            ).reduce((prev, next) => ({ ...prev, [next]: formValues[next] }), {})

            if (!Object.keys(dataToEdit).length) {
              return reset({ passwordRepeat, ...formValues })
            }
            return editUser.mutate(
              { id: user.id, data: dataToEdit },
              {
                onSuccess: () => {
                  setOpen(false)
                },
                onError: e => {
                  const apiErrors = e?.response?.data.errors || []
                  for (const apiError of apiErrors) {
                    setError(apiError.param, { message: apiError.msg })
                  }
                }
              }
            )
          })}
        >
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography color="textSecondary" display="block" variant="subtitle1">
                  {t('generalData')}
                </Typography>
                <Divider />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="name"
                  type="text"
                  size="small"
                  fullWidth
                  variant="filled"
                  label={t('name')}
                  inputRef={nameRef}
                  {...name}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="email"
                  type="email"
                  size="small"
                  fullWidth
                  required
                  error={!!formState.errors.email}
                  helperText={t(formState.errors.email?.message || '')}
                  variant="filled"
                  label={t('email')}
                  inputRef={emailRef}
                  {...email}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography color="textSecondary" display="block" variant="subtitle1">
                  {t('change_password')}
                </Typography>
                <Divider />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="password"
                  type="password"
                  size="small"
                  fullWidth
                  error={!!formState.errors.password}
                  helperText={t(formState.errors.password?.message || '')}
                  variant="filled"
                  label={t('password')}
                  inputRef={passwordRef}
                  {...password}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="passwordRepeat"
                  type="password"
                  size="small"
                  fullWidth
                  error={!!formState.errors.passwordRepeat}
                  helperText={t(formState.errors.passwordRepeat?.message || '')}
                  variant="filled"
                  label={t('passwordRepeat')}
                  inputRef={passwordRepeatRef}
                  {...passwordRepeat}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography color="textSecondary" display="block" variant="subtitle1">
                  {t('contact')}
                </Typography>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={2} alignItems="center">
                  {fields.map((field, index) => (
                    <React.Fragment key={field.id}>
                      <Grid item xs={6}>
                        <Controller
                          control={control}
                          name={`phoneNumbers.${index}.label` as const}
                          defaultValue={field.label}
                          render={({ field }) => (
                            <TextField
                              id={`phoneNumbers.${index}.label`}
                              type="text"
                              size="small"
                              fullWidth
                              required
                              placeholder={t('labelExample')}
                              variant="filled"
                              label={t('label')}
                              {...field}
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={5}>
                        <Controller
                          control={control}
                          name={`phoneNumbers.${index}.number` as const}
                          defaultValue={field.number}
                          render={({ field }) => (
                            <TextField
                              id={`phoneNumbers.${index}.number`}
                              type="text"
                              size="small"
                              fullWidth
                              required
                              variant="filled"
                              label={t('phoneNumber')}
                              {...field}
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={1}>
                        <IconButton color="inherit" size="small" onClick={() => remove(index)}>
                          <ClearIcon />
                        </IconButton>
                      </Grid>
                    </React.Fragment>
                  ))}
                  <Grid item xs={12}>
                    <Button
                      variant="outlined"
                      startIcon={<PhoneIcon />}
                      onClick={() => append({ label: '', number: '' })}
                    >
                      {t('newPhoneNumber')}
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={4}>
                <Controller
                  control={control}
                  name="active"
                  render={({ field }) => (
                    <FormControlLabel
                      control={
                        <Switch
                          checked={field.value}
                          onChange={ev => field.onChange(ev.target.checked)}
                          color="secondary"
                        />
                      }
                      label={t('activeUser')}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={4}>
                <Controller
                  control={control}
                  name="isSuperuser"
                  render={({ field }) => (
                    <FormControlLabel
                      control={
                        <Switch
                          checked={field.value}
                          onChange={ev => field.onChange(ev.target.checked)}
                          color="secondary"
                        />
                      }
                      label={t('superUser')}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              variant="outlined"
              color="primary"
              data-testid="button_cancel"
              onClick={() => setOpen(false)}
            >
              {t('cancel')}
            </Button>
            <LoadingButton
              color="primary"
              variant="contained"
              data-testid="button_save"
              disabled={
                !formState.isDirty || !!Object.keys(formState.errors).length || editUser.isLoading
              }
              type="submit"
              isLoading={editUser.isLoading}
            >
              {t('save')}
            </LoadingButton>
          </DialogActions>
        </form>
      </Dialog>
    </>
  )
}

export default EditUserButtonDialog
