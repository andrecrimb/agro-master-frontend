import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Button,
  Grid,
  Typography,
  TextField,
  Divider
} from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import LoadingButton from 'components/LoadingButton'
import { useForm } from 'react-hook-form'
import useZipSearch from 'hooks/useZipSearch'
import { useHistory } from 'react-router-dom'
import routes from 'routes'
import useOwnerProperties from 'hooks/useOwnerProperties'
import { muiTheme } from 'theme'
import useEditOwnerProperty from 'hooks/useEditOwnerProperty'

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

const EditPropertyDialog: React.FC = () => {
  const { t } = useTranslation()
  const history = useHistory()
  const ownerPropertyId = +history.location.pathname.replace(`${routes.properties}/`, '')
  const { data: propertySelected } = useOwnerProperties({
    select: d => d.find(property => property.id === ownerPropertyId)
  })

  const editProperty = useEditOwnerProperty()
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

  const onClose = () => history.push(routes.properties)

  React.useEffect(() => {
    if (propertySelected) {
      reset(propertySelected.property)
    }
  }, [propertySelected === undefined])

  return (
    <Dialog
      disableBackdropClick
      open
      fullWidth
      maxWidth="sm"
      onClose={onClose}
      aria-labelledby="dialog-title"
    >
      <DialogTitle id="dialog-title">
        {t('edit_owner_property')} |{' '}
        <span style={{ color: muiTheme.palette.primary.main }}>
          {propertySelected?.property.name}
        </span>
      </DialogTitle>
      {propertySelected ? (
        <form
          onSubmit={handleSubmit(values => {
            editProperty.mutate(
              { id: ownerPropertyId, data: values },
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
                            setValue('state', res.uf)
                            setValue('city', res.localidade)
                            setValue('address', res.logradouro)
                          }
                        },
                        onError: () => {
                          setError('zip', { message: 'invalid_zip' })
                          setValue('state', '')
                          setValue('city', '')
                          setValue('address', '')
                        }
                      })
                  }}
                  inputRef={zipRef}
                  {...zip}
                />
              </Grid>
              {(formState.dirtyFields.zip && searchZip.isSuccess) ||
              (propertySelected && !searchZip.isError) ? (
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
                editProperty.isLoading
              }
              type="submit"
              isLoading={editProperty.isLoading}
            >
              {t('save')}
            </LoadingButton>
          </DialogActions>
        </form>
      ) : null}
    </Dialog>
  )
}

export default EditPropertyDialog
