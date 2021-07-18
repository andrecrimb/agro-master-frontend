import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Button,
  Grid,
  Typography,
  Tooltip,
  TextField,
  Divider,
  IconButton
} from '@material-ui/core'
import { Delete as DeleteIcon, EditRounded as EditIcon } from '@material-ui/icons'
import { useTranslation } from 'react-i18next'
import LoadingButton from 'components/LoadingButton'
import { useForm } from 'react-hook-form'
import useZipSearch from 'hooks/useZipSearch'
import { muiTheme } from 'theme'
import useEditCustomerProperty from 'hooks/useEditCustomerProperty'
import useDeleteCustomerProperty from 'hooks/useDeleteCustomerProperty'
import useDialog from 'hooks/useDialog'
import { Property } from 'types/property'

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

type Props = { customerId: number; property: Property }

const EditPropertyDialog: React.FC<Props> = ({ property, customerId }) => {
  const { t } = useTranslation()
  const [open, setOpen] = React.useState(false)
  const { newDialog } = useDialog()

  const editProperty = useEditCustomerProperty()
  const deleteProperty = useDeleteCustomerProperty()
  const searchZip = useZipSearch()

  const { handleSubmit, setValue, register, formState, reset, clearErrors, setError } = useForm<
    typeof FORM_DEFAULT_VALUES
  >({
    defaultValues: FORM_DEFAULT_VALUES
  })

  const { ref: producerNameRef, ...producerName } = register('producerName')
  const { ref: nameRef, ...name } = register('name')
  const { ref: cnpjRef, ...cnpj } = register('cnpj')
  const { ref: cpfRef, ...cpf } = register('cpf')
  const { ref: ieRef, ...ie } = register('ie')
  const { ref: zipRef, onBlur: zipOnBlur, ...zip } = register('zip')
  const { ref: addressRef, ...address } = register('address')
  const { ref: cityRef, ...city } = register('city')
  const { ref: stateRef, ...state } = register('state')

  React.useEffect(() => {
    if (open) reset(property)
  }, [open])

  return (
    <>
      <IconButton size="small" onClick={() => setOpen(true)}>
        <EditIcon />
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
          <DialogTitle id="dialog-title">
            {t('edit_property')} |{' '}
            <span style={{ color: muiTheme.palette.primary.main }}>{property.name}</span>
          </DialogTitle>
          <form
            onSubmit={handleSubmit(values => {
              const dataToEdit = Object.keys(formState.dirtyFields).reduce(
                (prev, next) => ({ ...prev, [next]: values[next] }),
                {} as Partial<typeof FORM_DEFAULT_VALUES>
              )
              editProperty.mutate(
                { propertyId: property.id, customerId: customerId, data: dataToEdit },
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
                <Grid item xs={12}>
                  <TextField
                    id="name"
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
                  <TextField
                    id="cnpj"
                    type="text"
                    size="small"
                    fullWidth
                    required
                    error={!!formState.errors.cnpj}
                    helperText={t(formState.errors.cnpj?.message || '')}
                    variant="filled"
                    label={t('cnpj')}
                    inputRef={cnpjRef}
                    {...cnpj}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="cpf"
                    type="text"
                    size="small"
                    fullWidth
                    variant="filled"
                    label={t('cpf')}
                    inputRef={cpfRef}
                    {...cpf}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="ie"
                    type="text"
                    size="small"
                    fullWidth
                    required
                    variant="filled"
                    label={t('ie')}
                    inputRef={ieRef}
                    {...ie}
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
                  <TextField
                    id="zip"
                    type="text"
                    size="small"
                    fullWidth
                    required
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
                {(formState.dirtyFields.zip && searchZip.isSuccess) || !searchZip.isError ? (
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
                        InputLabelProps={{ shrink: true }}
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
                        InputLabelProps={{ shrink: true }}
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
              <Tooltip title={t('delete_property') + ''} arrow placement="left">
                <IconButton
                  onClick={() =>
                    newDialog({
                      title: t('warning') + '!',
                      message: t('delete_question', { item: property.name }),
                      confirmationButton: {
                        text: t('delete'),
                        onClick: () =>
                          deleteProperty.mutateAsync(
                            { propertyId: property.id, customerId: customerId },
                            { onSuccess: () => setOpen(false) }
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
                  editProperty.isLoading
                }
                type="submit"
                isLoading={editProperty.isLoading}
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

export default EditPropertyDialog
