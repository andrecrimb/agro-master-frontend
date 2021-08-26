import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  IconButton,
  Button,
  Grid,
  Typography,
  TextField,
  Divider
} from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import LoadingButton from 'components/LoadingButton'
import { Controller, useForm } from 'react-hook-form'
import { AddRounded as AddIcon } from '@material-ui/icons'
import useZipSearch from 'hooks/useZipSearch'
import useAddOwnerProperty from 'hooks/useAddOwnerProperty'
import NumberFormat from 'react-number-format'
import { unmaskNumber } from 'utils/utils'

const FORM_DEFAULT_VALUES = {
  producerName: '',
  name: '',
  cnpj: '',
  cpf: '',
  ie: '',
  address: '',
  zip: '',
  city: '',
  state: ''
}

const AddPropertyButtonDialog: React.FC = () => {
  const { t } = useTranslation()
  const [open, setOpen] = React.useState(false)

  const addProperty = useAddOwnerProperty()
  const searchZip = useZipSearch()

  const {
    handleSubmit,
    setValue,
    register,
    formState,
    reset,
    clearErrors,
    setError,
    control
  } = useForm<typeof FORM_DEFAULT_VALUES>({
    defaultValues: FORM_DEFAULT_VALUES
  })

  const { ref: producerNameRef, ...producerName } = register('producerName')
  const { ref: nameRef, ...name } = register('name')
  const { ref: addressRef, ...address } = register('address')
  const { ref: cityRef, ...city } = register('city')
  const { ref: stateRef, ...state } = register('state')

  React.useEffect(() => {
    reset(FORM_DEFAULT_VALUES)
    searchZip.reset()
  }, [open === false])

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
          <DialogTitle id="dialog-title">{t('new_property')}</DialogTitle>
          <form
            onSubmit={handleSubmit(
              ({ ie: ieMasked, cnpj: cnpjMasked, cpf: cpfMasked, zip: zipMasked, ...values }) => {
                addProperty.mutate(
                  {
                    ie: unmaskNumber(ieMasked),
                    cnpj: unmaskNumber(cnpjMasked),
                    zip: unmaskNumber(zipMasked),
                    cpf: unmaskNumber(cpfMasked),
                    ...values
                  },
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
              }
            )}
          >
            <DialogContent>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography color="textSecondary" display="block" variant="subtitle1">
                    {t('generalData')}
                  </Typography>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="name"
                    autoFocus
                    type="text"
                    size="small"
                    fullWidth
                    required
                    variant="filled"
                    label={t('propertyName')}
                    inputRef={nameRef}
                    {...name}
                  />
                </Grid>

                <Grid item xs={6}>
                  <Controller
                    name="cnpj"
                    control={control}
                    render={({ field }) => (
                      <NumberFormat
                        id="cnpj"
                        size={'small' as any}
                        fullWidth
                        required
                        error={!!formState.errors.cnpj}
                        helperText={t(formState.errors.cnpj?.message || '')}
                        label={t('cnpj')}
                        variant="filled"
                        customInput={TextField}
                        type="tel"
                        format="##.###.###/####-##"
                        mask="_"
                        getInputRef={field.ref}
                        {...field}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Controller
                    name="cpf"
                    control={control}
                    render={({ field }) => (
                      <NumberFormat
                        id="cpf"
                        size={'small' as any}
                        fullWidth
                        required
                        label={t('cpf')}
                        variant="filled"
                        customInput={TextField}
                        type="tel"
                        format="###.###.###-##"
                        mask="_"
                        getInputRef={field.ref}
                        {...field}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Controller
                    name="ie"
                    control={control}
                    render={({ field }) => (
                      <NumberFormat
                        id="ie"
                        size={'small' as any}
                        fullWidth
                        required
                        label={t('ie')}
                        variant="filled"
                        customInput={TextField}
                        type="tel"
                        format="###.###.###.###"
                        mask="_"
                        getInputRef={field.ref}
                        {...field}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="producerName"
                    type="text"
                    size="small"
                    fullWidth
                    required
                    variant="filled"
                    label={t('producerName')}
                    inputRef={producerNameRef}
                    {...producerName}
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
                        required
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
                        required
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
                        required
                        InputProps={{ readOnly: true }}
                        variant="filled"
                        label={t('state')}
                        inputRef={stateRef}
                        {...state}
                      />
                    </Grid>
                  </>
                ) : null}
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
                  addProperty.isLoading
                }
                type="submit"
                isLoading={addProperty.isLoading}
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

export default AddPropertyButtonDialog
