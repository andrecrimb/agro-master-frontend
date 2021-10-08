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
  RadioGroup
} from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { useForm, Controller } from 'react-hook-form'
import LoadingButton from 'components/LoadingButton'
import useAddGreenhouse from 'hooks/useAddGreenhouse'
import { GreenhouseType } from 'types/greenhouse'
import { OwnerProperty } from 'types/property'
import { muiTheme } from 'theme'

const FORM_DEFAULT_VALUES = {
  label: '',
  type: 'seedling' as GreenhouseType
}

type Props = { ownerProperty: OwnerProperty }

const AddGreenhouseButtonDialog: React.FC<Props> = ({ ownerProperty }) => {
  const { t } = useTranslation()
  const [open, setOpen] = React.useState(false)

  const addNewGreenhouse = useAddGreenhouse()

  const { handleSubmit, control, register, formState, setError, reset } = useForm<
    typeof FORM_DEFAULT_VALUES
  >({ defaultValues: FORM_DEFAULT_VALUES })

  React.useEffect(() => {
    reset(FORM_DEFAULT_VALUES)
  }, [open === false])

  const { ref: greenhouseLabelRef, ...greenhouseLabel } = register('label')

  return (
    <>
      <Button variant="contained" color="inherit" onClick={() => setOpen(true)}>
        {t('new_greenhouse')}
      </Button>
      {open ? (
        <Dialog open={open} onClose={() => setOpen(false)} aria-labelledby="dialog-title">
          <DialogTitle id="dialog-title">
            <span style={{ color: muiTheme.palette.primary.main }}>
              {ownerProperty.property.name}
            </span>{' '}
            | {t('new_greenhouse')}
          </DialogTitle>
          <form
            style={{ width: '400px' }}
            onSubmit={handleSubmit(values => {
              return addNewGreenhouse.mutate(
                { ...values, ownerPropertyId: ownerProperty.id },
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
                    error={!!formState.errors.label}
                    helperText={t(formState.errors.label?.message || '')}
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
                  addNewGreenhouse.isLoading
                }
                type="submit"
                isLoading={addNewGreenhouse.isLoading}
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

export default AddGreenhouseButtonDialog
