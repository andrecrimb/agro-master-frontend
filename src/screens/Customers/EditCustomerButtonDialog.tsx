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
  Delete as DeleteIcon
} from '@material-ui/icons'
import { useTranslation } from 'react-i18next'
import { useForm, Controller, useFieldArray } from 'react-hook-form'
import LoadingButton from 'components/LoadingButton'
import { muiTheme } from 'theme'
import useEditCustomer from 'hooks/useEditCustomer'
import useZipSearch from 'hooks/useZipSearch'
import useDeleteCustomer from 'hooks/useDeleteCustomer'
import useDialog from 'hooks/useDialog'
import NumberFormat from 'react-number-format'
import { unmaskNumber } from 'utils/utils'
import { Customer } from 'types/customer'

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

type Props = { customer: Customer }

const EditCustomerButtonDialog: React.FC<Props> = ({ customer }) => {
  const { t } = useTranslation()
  const [open, setOpen] = React.useState(false)
  const { newDialog } = useDialog()

  const editCustomer = useEditCustomer()
  const searchZip = useZipSearch()
  const deleteCustomer = useDeleteCustomer()

  const {
    handleSubmit,
    control,
    register,
    formState,
    clearErrors,
    setValue,
    setError,
    reset
  } = useForm<typeof FORM_DEFAULT_VALUES>({
    defaultValues: FORM_DEFAULT_VALUES
  })

  const { fields, append, remove } = useFieldArray({
    name: 'phoneNumbers',
    control
  })

  const { ref: nameRef, ...name } = register('name')
  const { ref: nicknameRef, ...nickname } = register('nickname')
  const { ref: addressRef, ...address } = register('address')
  const { ref: cityRef, ...city } = register('city')
  const { ref: stateRef, ...state } = register('state')

  const onClose = () => setOpen(false)

  React.useEffect(() => {
    if (open) {
      reset(customer)
    }
  }, [open])

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        {t('edit_customer')}
      </Button>
      <Dialog open={open} fullWidth maxWidth="sm" onClose={onClose} aria-labelledby="dialog-title">
        <DialogTitle id="dialog-title">
          {t('edit_customer')} |{' '}
          <span style={{ color: muiTheme.palette.primary.main }}>{customer.name}</span>
        </DialogTitle>
        <form
          onSubmit={handleSubmit(values => {
            const reqBody = Object.keys(formState.dirtyFields).reduce(
              (prev, next) => ({
                ...prev,
                [next]: ['zip'].includes(next) ? unmaskNumber(values[next]) : values[next]
              }),
              {} as Partial<typeof FORM_DEFAULT_VALUES>
            )

            //* Remove phone mask
            if (reqBody.phoneNumbers) {
              reqBody.phoneNumbers = reqBody.phoneNumbers.map(pn => ({
                ...pn,
                number: unmaskNumber(pn.number)
              }))
            }

            return editCustomer.mutate(
              { id: customer.id, data: reqBody },
              {
                onSuccess: () => {
                  onClose()
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
              <Grid item xs={6}>
                <TextField
                  id="address"
                  type="text"
                  size="small"
                  fullWidth
                  variant="filled"
                  label={t('address')}
                  InputLabelProps={formState.dirtyFields.address ? { shrink: true } : {}}
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
                  variant="filled"
                  label={t('city')}
                  InputLabelProps={formState.dirtyFields.city ? { shrink: true } : {}}
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
                  variant="filled"
                  label={t('state')}
                  InputLabelProps={formState.dirtyFields.state ? { shrink: true } : {}}
                  inputRef={stateRef}
                  {...state}
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
                      label={t('active_customer')}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Tooltip title={t('delete_customer') + ''} arrow placement="left">
              <IconButton
                onClick={() =>
                  newDialog({
                    title: t('warning') + '!',
                    message: t('delete_question', { item: customer.name }),
                    confirmationButton: {
                      text: t('delete'),
                      onClick: () =>
                        deleteCustomer.mutateAsync(
                          { customerId: customer.id },
                          { onSuccess: () => onClose() }
                        )
                    }
                  })
                }
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
            <Button
              variant="outlined"
              color="primary"
              data-testid="button_cancel"
              onClick={onClose}
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
                editCustomer.isLoading
              }
              type="submit"
              isLoading={editCustomer.isLoading}
            >
              {t('save')}
            </LoadingButton>
          </DialogActions>
        </form>
      </Dialog>
    </>
  )
}

export default EditCustomerButtonDialog
