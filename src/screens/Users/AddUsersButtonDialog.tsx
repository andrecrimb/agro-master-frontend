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

const AddUsersButtonDialog: React.FC = () => {
  const { t } = useTranslation()
  const [open, setOpen] = React.useState(false)

  const editGroup = { isLoading: false }

  const { handleSubmit, control, formState } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      nickname: '',
      email: '',
      password: '',
      passwordRepeat: '',
      active: false,
      isSuperuser: false,
      phoneNumbers: [{ label: '', number: '' }]
    }
  })

  const { fields, append, remove } = useFieldArray({
    name: 'phoneNumbers',
    control
  })

  return (
    <>
      <IconButton color="inherit" onClick={() => setOpen(true)}>
        <AddIcon />
      </IconButton>
      <Dialog
        open={open}
        fullWidth
        maxWidth="sm"
        onClose={() => setOpen(false)}
        aria-labelledby="dialog-title"
      >
        <DialogTitle id="dialog-title">{t('createNewUser')}</DialogTitle>
        <form onSubmit={handleSubmit(values => console.log(values))}>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography color="textSecondary" display="block" variant="subtitle1">
                  {t('generalData')}
                </Typography>
                <Divider />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  control={control}
                  name="firstName"
                  render={({ field }) => (
                    <TextField
                      id="firstName"
                      type="text"
                      size="small"
                      fullWidth
                      required
                      variant="outlined"
                      label={t('firstName')}
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  control={control}
                  name="lastName"
                  render={({ field }) => (
                    <TextField
                      id="lastName"
                      type="text"
                      size="small"
                      fullWidth
                      variant="outlined"
                      label={t('lastName')}
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  control={control}
                  name="nickname"
                  render={({ field }) => (
                    <TextField
                      id="nickname"
                      type="text"
                      size="small"
                      fullWidth
                      variant="outlined"
                      label={t('nickname')}
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  control={control}
                  name="email"
                  render={({ field }) => (
                    <TextField
                      id="email"
                      type="email"
                      size="small"
                      fullWidth
                      required
                      variant="outlined"
                      label={t('email')}
                      {...field}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={6}>
                <Controller
                  control={control}
                  name="password"
                  render={({ field }) => (
                    <TextField
                      id="password"
                      type="password"
                      size="small"
                      fullWidth
                      required
                      variant="outlined"
                      label={t('password')}
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  control={control}
                  name="passwordRepeat"
                  render={({ field }) => (
                    <TextField
                      id="passwordRepeat"
                      type="password"
                      size="small"
                      fullWidth
                      required
                      variant="outlined"
                      label={t('passwordRepeat')}
                      {...field}
                    />
                  )}
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
                      <Grid item xs={5}>
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
                              variant="outlined"
                              label={t('label')}
                              {...field}
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={6}>
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
                              variant="outlined"
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
                !formState.isDirty || !!Object.keys(formState.errors).length || editGroup.isLoading
              }
              type="submit"
              isLoading={editGroup.isLoading}
            >
              {t('save')}
            </LoadingButton>
          </DialogActions>
        </form>
      </Dialog>
    </>
  )
}

export default AddUsersButtonDialog
