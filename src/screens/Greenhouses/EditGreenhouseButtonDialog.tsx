import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Button,
  Grid,
  FormControlLabel,
  TextField,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  MenuItem,
  Select,
  InputLabel
} from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { useForm, Controller } from 'react-hook-form'
import LoadingButton from 'components/LoadingButton'
import useEditGreenhouse from 'hooks/useEditGreenhouse'
import useGreenhouse from 'hooks/useGreenhouse'
import { GreenhouseType } from 'types/greenhouse'
import useOwnerProperties from 'hooks/useOwnerProperties'
import { muiTheme } from 'theme'

const FORM_DEFAULT_VALUES = {
  label: '',
  type: 'seedling' as GreenhouseType,
  ownerPropertyId: ''
}

type Props = { greenhouseId: number; onClick: () => void }

const EditGreenhouseButtonDialog: React.FC<Props> = ({ greenhouseId, onClick }) => {
  const { t } = useTranslation()
  const [open, setOpen] = React.useState(false)

  const { data: ownerProperties = [] } = useOwnerProperties()
  const { data: greenhouse } = useGreenhouse(greenhouseId)

  const editGreenhouse = useEditGreenhouse()

  const { handleSubmit, control, register, formState, setError, reset } = useForm<
    typeof FORM_DEFAULT_VALUES
  >({
    defaultValues: FORM_DEFAULT_VALUES
  })

  const onClose = () => setOpen(false)

  React.useEffect(() => {
    if (greenhouse && open) {
      reset({
        label: greenhouse.label,
        type: greenhouse.type,
        ownerPropertyId: greenhouse.ownerProperty.property.id + ''
      })
    }
  }, [open, greenhouse === undefined])

  const { ref: greenhouseLabelRef, ...greenhouseLabel } = register('label')

  return (
    <>
      <MenuItem
        onClick={() => {
          setOpen(true)
          onClick()
        }}
      >
        {t('edit_greenhouse')}
      </MenuItem>
      <Dialog open={open} onClose={onClose} aria-labelledby="dialog-title">
        <DialogTitle id="dialog-title">
          {t('edit_greenhouse')} |{' '}
          <span style={{ color: muiTheme.palette.primary.main }}>{greenhouse?.label}</span>
        </DialogTitle>
        {greenhouse ? (
          <form
            style={{ width: '400px' }}
            onSubmit={handleSubmit(({ ownerPropertyId, ...other }) => {
              return editGreenhouse.mutate(
                { id: greenhouse.id, data: { ...other, ownerPropertyId: +ownerPropertyId } },
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
                  <TextField
                    autoFocus
                    id="label"
                    type="text"
                    size="small"
                    fullWidth
                    required
                    placeholder={t('estufa1')}
                    variant="filled"
                    label={t('name')}
                    inputRef={greenhouseLabelRef}
                    {...greenhouseLabel}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Controller
                    control={control}
                    name="ownerPropertyId"
                    render={({ field }) => (
                      <FormControl fullWidth variant="filled" required>
                        <InputLabel id="property-select-label">{t('property')}</InputLabel>
                        <Select
                          value={field.value}
                          onBlur={() => field.onBlur()}
                          onChange={ev => field.onChange(ev.target.value)}
                          labelId="property-select-label"
                          id="property-select"
                        >
                          <MenuItem value={''}>{t('select')}</MenuItem>
                          {ownerProperties.map(p => (
                            <MenuItem key={p.id} value={p.id}>
                              {p.property.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    )}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Controller
                    control={control}
                    name="type"
                    render={({ field }) => (
                      <FormControl component="fieldset" required>
                        <FormLabel component="legend">{t('greenhouse_type')}</FormLabel>
                        <RadioGroup
                          row
                          aria-label="greenhouse_type"
                          value={field.value}
                          onChange={ev => field.onChange(ev.target.value as GreenhouseType)}
                        >
                          <FormControlLabel
                            value="seedling"
                            control={<Radio />}
                            label={t('seedling')}
                          />
                          <FormControlLabel
                            value="borbulha"
                            control={<Radio />}
                            label={t('borbulha')}
                          />
                        </RadioGroup>
                      </FormControl>
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
                  editGreenhouse.isLoading
                }
                type="submit"
                isLoading={editGreenhouse.isLoading}
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

export default EditGreenhouseButtonDialog
