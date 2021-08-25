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
  Divider
} from '@material-ui/core'
import {
  AddRounded as AddIcon,
  PhoneRounded as PhoneIcon,
  ClearRounded as ClearIcon
} from '@material-ui/icons'
import { useTranslation } from 'react-i18next'
import { useForm, Controller, useFieldArray } from 'react-hook-form'
import LoadingButton from 'components/LoadingButton'
import useAddUser from 'hooks/useAddUser'
import NumberFormat from 'react-number-format'
import { unmaskNumber } from 'utils/utils'

const FORM_DEFAULT_VALUES = {
  name: '',
  email: '',
  password: '',
  passwordRepeat: '',
  active: true,
  isSuperuser: true,
  phoneNumbers: [{ label: '', number: '' }]
}

const AddUserButtonDialog: React.FC = () => {
  const { t } = useTranslation()
  const [open, setOpen] = React.useState(false)
  const addNewUser = useAddUser()

  const { handleSubmit, control, register, formState, setError, reset } = useForm({
    defaultValues: FORM_DEFAULT_VALUES
  })

  const { fields, append, remove } = useFieldArray({
    name: 'phoneNumbers',
    control
  })

  React.useEffect(() => {
    reset(FORM_DEFAULT_VALUES)
  }, [open === false])

  const { ref: nameRef, ...name } = register('name')
  const { ref: emailRef, ...email } = register('email')
  const { ref: passwordRef, ...password } = register('password')
  const { ref: passwordRepeatRef, ...passwordRepeat } = register('passwordRepeat')

  return (
    <>
      <IconButton color="inherit" onClick={() => setOpen(true)}>
        <AddIcon />
      </IconButton>
      {open ? (
        <Dialog
          open={open}
          fullWidth
          maxWidth="sm"
          onClose={() => setOpen(false)}
          aria-labelledby="dialog-title"
        >
          <DialogTitle id="dialog-title">{t('createNewUser')}</DialogTitle>
          <form
            onSubmit={handleSubmit(({ passwordRepeat, ...newUserData }) => {
              if (passwordRepeat !== newUserData.password) {
                setError('password', { message: 'passwords_dont_match' })
                return setError('passwordRepeat', { message: 'passwords_dont_match' })
              }

              const reqBody = {
                ...newUserData,
                //* Unmask phone numbers
                phoneNumbers: newUserData.phoneNumbers.map(pn => ({
                  ...pn,
                  number: unmaskNumber(pn.number)
                }))
              }

              return addNewUser.mutate(reqBody, {
                onSuccess: () => {
                  setOpen(false)
                },
                onError: e => {
                  const apiErrors = e?.response?.data.errors || []
                  for (const apiError of apiErrors) {
                    setError(apiError.param, { message: apiError.msg })
                  }
                }
              })
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
                    autoFocus
                    id="name"
                    type="text"
                    size="small"
                    fullWidth
                    required
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
                <Grid item xs={6}>
                  <TextField
                    id="password"
                    type="password"
                    size="small"
                    fullWidth
                    required
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
                    required
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
                              <NumberFormat
                                id={`phoneNumbers.${index}.number`}
                                size={'small' as any}
                                fullWidth
                                required
                                variant="filled"
                                label={t('phoneNumber')}
                                customInput={TextField}
                                type="tel"
                                format="(##) #########"
                                getInputRef={field.ref}
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
                  !formState.isDirty ||
                  !!Object.keys(formState.errors).length ||
                  addNewUser.isLoading
                }
                type="submit"
                isLoading={addNewUser.isLoading}
              >
                {t('save')}
              </LoadingButton>
            </DialogActions>
          </form>
        </Dialog>
      ) : null}
    </>
  )
}

export default AddUserButtonDialog
