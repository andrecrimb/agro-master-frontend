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
  MenuItem,
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
import useCustomer from 'hooks/useCustomer'
import useEditCustomer from 'hooks/useEditCustomer'
import useZipSearch from 'hooks/useZipSearch'
import useDeleteCustomer from 'hooks/useDeleteCustomer'
import useDialog from 'hooks/useDialog'

const FORM_DEFAULT_VALUES = {
  firstName: '',
  lastName: '',
  nickname: '',
  active: true,
  address: '',
  zip: '',
  city: '',
  state: '',
  phoneNumbers: [{ label: '', number: '' }]
}

type Props = { customerId: number; onClick: () => void }

const EditCustomerButtonDialog: React.FC<Props> = ({ customerId, onClick }) => {
  const { t } = useTranslation()
  const [open, setOpen] = React.useState(false)
  const { newDialog } = useDialog()

  const { data: customerSelected } = useCustomer(customerId)

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

  const { ref: firstNameRef, ...firstName } = register('firstName')
  const { ref: lastNameRef, ...lastName } = register('lastName')
  const { ref: nicknameRef, ...nickname } = register('nickname')
  const { ref: zipRef, onBlur: zipOnBlur, ...zip } = register('zip')
  const { ref: addressRef, ...address } = register('address')
  const { ref: cityRef, ...city } = register('city')
  const { ref: stateRef, ...state } = register('state')

  const onClose = () => setOpen(false)

  React.useEffect(() => {
    if (customerSelected && open) {
      reset(customerSelected)
    }
  }, [customerSelected === undefined, open])

  return (
    <>
      <MenuItem
        onClick={() => {
          setOpen(true)
          onClick()
        }}
      >
        {t('edit_customer')}
      </MenuItem>
      <Dialog open={open} fullWidth maxWidth="sm" onClose={onClose} aria-labelledby="dialog-title">
        <DialogTitle id="dialog-title">
          {t('edit_customer')} |{' '}
          <span style={{ color: muiTheme.palette.primary.main }}>
            {customerSelected?.firstName} {customerSelected?.lastName}
          </span>
        </DialogTitle>
        {customerSelected ? (
          <form
            onSubmit={handleSubmit(values => {
              const dataToEdit = Object.keys(formState.dirtyFields).reduce(
                (prev, next) => ({ ...prev, [next]: values[next] }),
                {} as Partial<typeof FORM_DEFAULT_VALUES>
              )
              return editCustomer.mutate(
                { id: customerId, data: dataToEdit },
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
                    id="firstName"
                    type="text"
                    size="small"
                    fullWidth
                    required
                    variant="filled"
                    label={t('firstName')}
                    inputRef={firstNameRef}
                    {...firstName}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="lastName"
                    type="text"
                    size="small"
                    fullWidth
                    variant="filled"
                    label={t('lastName')}
                    inputRef={lastNameRef}
                    {...lastName}
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
                  <TextField
                    id="zip"
                    type="text"
                    size="small"
                    fullWidth
                    error={!!formState.errors.zip?.message}
                    helperText={t(formState.errors.zip?.message || '')}
                    variant="filled"
                    label={t('zip')}
                    onBlur={ev => {
                      zipOnBlur(ev)
                      ev.target.value !== '' &&
                        searchZip.mutateAsync(ev.target.value, {
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
                    inputRef={zipRef}
                    {...zip}
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
                      message: t('delete_question', {
                        item: customerSelected.firstName
                      }),
                      confirmationButton: {
                        text: t('delete'),
                        onClick: () =>
                          deleteCustomer.mutateAsync(
                            { customerId: customerSelected.id },
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
        ) : null}
      </Dialog>
    </>
  )
}

export default EditCustomerButtonDialog
