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
import useAddCustomer from 'hooks/useAddCustomer'
import useZipSearch from 'hooks/useZipSearch'
import NumberFormat from 'react-number-format'
import { unmaskNumber } from 'utils/utils'

const FORM_DEFAULT_VALUES = {
  name: '',
  nickname: '',
  active: true,
  address: '',
  zip: '',
  city: '',
  state: '',
  phoneNumbers: [{ label: '', number: '' }]
}

const AddCustomerButtonDialog: React.FC = () => {
  const { t } = useTranslation()
  const [open, setOpen] = React.useState(false)

  const addNewCustomer = useAddCustomer()
  const searchZip = useZipSearch()

  const {
    handleSubmit,
    control,
    register,
    formState,
    setError,
    reset,
    setValue,
    clearErrors
  } = useForm<typeof FORM_DEFAULT_VALUES>({
    defaultValues: FORM_DEFAULT_VALUES
  })

  const { fields, append, remove } = useFieldArray({
    name: 'phoneNumbers',
    control
  })

  React.useEffect(() => {
    reset(FORM_DEFAULT_VALUES)
    searchZip.reset()
  }, [open === false])

  const { ref: nameRef, ...name } = register('name')
  const { ref: nicknameRef, ...nickname } = register('nickname')
  const { ref: addressRef, ...address } = register('address')
  const { ref: cityRef, ...city } = register('city')
  const { ref: stateRef, ...state } = register('state')

  return (
    <>
      <IconButton color="inherit" onClick={() => setOpen(true)}>
        <AddIcon />
      </IconButton>
      {open ? (
        <Dialog
          disableBackdropClick
          open={open}
          fullWidth
          maxWidth="sm"
          onClose={() => setOpen(false)}
          aria-labelledby="dialog-title"
        >
          <DialogTitle id="dialog-title">{t('add_new_customer')}</DialogTitle>
          <form
            onSubmit={handleSubmit(values => {
              const reqBody = {
                ...values,
                zip: unmaskNumber(values.zip),
                phoneNumbers: values.phoneNumbers.map(pn => ({
                  ...pn,
                  number: unmaskNumber(pn.number)
                }))
              }

              return addNewCustomer.mutate(reqBody, {
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
                    id="nickname"
                    type="text"
                    size="small"
                    fullWidth
                    variant="filled"
                    label={t('nickname')}
                    inputRef={nicknameRef}
                    {...nickname}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography color="textSecondary" display="block" variant="subtitle1">
                    {t('address')}
                  </Typography>
                  <Divider />
                </Grid>
                <Grid item xs={6}>
                  <Controller
                    name="zip"
                    control={control}
                    render={({ field: { onBlur, ...fieldProps } }) => (
                      <NumberFormat
                        id="zip"
                        size={'small' as any}
                        fullWidth
                        required
                        error={!!formState.errors.zip?.message}
                        helperText={t(formState.errors.zip?.message || '')}
                        label={t('zip')}
                        variant="filled"
                        customInput={TextField}
                        type="tel"
                        format="#####-###"
                        mask="_"
                        getInputRef={fieldProps.ref}
                        onBlur={ev => {
                          onBlur()
                          unmaskNumber(ev.target.value) !== '' &&
                            searchZip.mutateAsync(unmaskNumber(ev.target.value), {
                              onSuccess: res => {
                                clearErrors('zip')
                                if (res) {
                                  setValue('state', res.uf, { shouldDirty: true })
                                  setValue('city', res.localidade, { shouldDirty: true })
                                  setValue('address', res.logradouro, { shouldDirty: true })
                                }
                              },
                              onError: () => {
                                setError('zip', { message: 'invalid_zip' })
                                setValue('state', '', { shouldDirty: true })
                                setValue('city', '', { shouldDirty: true })
                                setValue('address', '', { shouldDirty: true })
                              }
                            })
                        }}
                        {...fieldProps}
                      />
                    )}
                  />
                </Grid>
                {searchZip.isSuccess ? (
                  <>
                    <Grid item xs={6}>
                      <TextField
                        id="address"
                        type="text"
                        size="small"
                        fullWidth
                        variant="filled"
                        label={t('address')}
                        inputRef={addressRef}
                        {...address}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        id="city"
                        type="text"
                        size="small"
                        fullWidth
                        InputProps={{ readOnly: true }}
                        variant="filled"
                        label={t('city')}
                        inputRef={cityRef}
                        {...city}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        id="state"
                        type="text"
                        size="small"
                        fullWidth
                        InputProps={{ readOnly: true }}
                        variant="filled"
                        label={t('state')}
                        inputRef={stateRef}
                        {...state}
                      />
                    </Grid>
                  </>
                ) : null}
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
                        label={t('active_customer')}
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
                  addNewCustomer.isLoading
                }
                type="submit"
                isLoading={addNewCustomer.isLoading}
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

export default AddCustomerButtonDialog
