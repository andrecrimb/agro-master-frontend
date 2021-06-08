import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  IconButton,
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
import { AddRounded as AddIcon } from '@material-ui/icons'
import { useTranslation } from 'react-i18next'
import { useForm, Controller } from 'react-hook-form'
import LoadingButton from 'components/LoadingButton'
import useAddGreenhouse from 'hooks/useAddGreenhouse'
import { GreenhouseType } from 'types/greenhouse'
import useOwnerProperties from 'hooks/useOwnerProperties'

const FORM_DEFAULT_VALUES = {
  label: '',
  type: 'seedling' as GreenhouseType,
  ownerPropertyId: ''
}

const AddGreenhouseButtonDialog: React.FC = () => {
  const { t } = useTranslation()
  const [open, setOpen] = React.useState(false)

  const { data: ownerProperties = [] } = useOwnerProperties()
  const addNewGreenhouse = useAddGreenhouse()

  const { handleSubmit, control, register, formState, setError, reset } = useForm<
    typeof FORM_DEFAULT_VALUES
  >({
    defaultValues: FORM_DEFAULT_VALUES
  })

  React.useEffect(() => {
    reset(FORM_DEFAULT_VALUES)
  }, [open === false])

  const { ref: greenhouseLabelRef, ...greenhouseLabel } = register('label')

  return (
    <>
      <IconButton color="inherit" onClick={() => setOpen(true)}>
        <AddIcon />
      </IconButton>
      {open ? (
        <Dialog open={open} onClose={() => setOpen(false)} aria-labelledby="dialog-title">
          <DialogTitle id="dialog-title">{t('add_new_greenhouse')}</DialogTitle>
          <form
            style={{ width: '400px' }}
            onSubmit={handleSubmit(({ ownerPropertyId, ...other }) => {
              return addNewGreenhouse.mutate(
                { ...other, ownerPropertyId: +ownerPropertyId },
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
