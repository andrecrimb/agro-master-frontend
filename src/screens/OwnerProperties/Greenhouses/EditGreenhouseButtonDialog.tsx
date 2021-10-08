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
  IconButton,
  Tooltip
} from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { useForm, Controller } from 'react-hook-form'
import LoadingButton from 'components/LoadingButton'
import useEditGreenhouse from 'hooks/useEditGreenhouse'
import useDeleteGreenhouse from 'hooks/useDeleteGreenhouse'
import { Greenhouse, GreenhouseType } from 'types/greenhouse'
import { muiTheme } from 'theme'
import useDialog from 'hooks/useDialog'
import { Delete as DeleteIcon } from '@material-ui/icons'

const FORM_DEFAULT_VALUES = {
  label: '',
  type: 'seedling' as GreenhouseType
}

type Props = { greenhouse: Greenhouse; ownerPropertyId: number }

const EditGreenhouseButtonDialog: React.FC<Props> = ({ greenhouse, ownerPropertyId }) => {
  const { t } = useTranslation()
  const { newDialog } = useDialog()
  const [open, setOpen] = React.useState(false)

  const deleteGreenhouse = useDeleteGreenhouse()
  const editGreenhouse = useEditGreenhouse()

  const { handleSubmit, control, register, formState, setError, reset } = useForm<
    typeof FORM_DEFAULT_VALUES
  >({ defaultValues: FORM_DEFAULT_VALUES })

  const onClose = () => setOpen(false)

  React.useEffect(() => {
    if (greenhouse && open) {
      reset({
        label: greenhouse.label,
        type: greenhouse.type
      })
    }
  }, [open, greenhouse === undefined])

  const { ref: greenhouseLabelRef, ...greenhouseLabel } = register('label')

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        {t('edit_greenhouse')}
      </Button>
      <Dialog open={open} onClose={onClose} aria-labelledby="dialog-title">
        <DialogTitle id="dialog-title">
          {t('edit_greenhouse')} |{' '}
          <span style={{ color: muiTheme.palette.primary.main }}>{greenhouse?.label}</span>
        </DialogTitle>
        {greenhouse ? (
          <form
            style={{ width: '400px' }}
            onSubmit={handleSubmit(values => {
              return editGreenhouse.mutate(
                {
                  id: greenhouse.id,
                  data: { ...values, ownerPropertyId }
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
                    name="type"
                    render={({ field }) => (
                      <FormControl
                        component="fieldset"
                        required
                        disabled={!!greenhouse.seedlingBenches.length}
                      >
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
              <Tooltip title={t('delete_greenhouse') + ''} arrow placement="left">
                <IconButton
                  onClick={() => {
                    newDialog({
                      title: t('warning') + '!',
                      message: t('delete_question', {
                        item: greenhouse?.label
                      }),
                      confirmationButton: {
                        text: t('delete'),
                        onClick: () =>
                          deleteGreenhouse.mutateAsync(
                            { greenhouseId: greenhouse.id },
                            { onSuccess: () => setOpen(false) }
                          )
                      }
                    })
                  }}
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
