import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Button,
  Grid,
  TextField,
  FormControl,
  MenuItem,
  Select,
  InputLabel
} from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { useForm, Controller } from 'react-hook-form'
import LoadingButton from 'components/LoadingButton'
import useAddBench from 'hooks/useAddBench'
import useRootstocks from 'hooks/useRootstocks'
import useUsers from 'hooks/useUsers'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import DayUtils from '@date-io/dayjs'
import { DatePicker } from '@material-ui/pickers'

const FORM_DEFAULT_VALUES = {
  label: '',
  quantity: 0,
  lastPlantingDate: new Date().toISOString(),
  firstPaymentDate: new Date().toISOString(),
  rootstockId: '',
  userId: ''
}

type Props = {
  greenhouseId: number
  onClick: () => void
}

const AddBenchButtonDialog: React.FC<Props> = ({ greenhouseId, onClick }) => {
  const { t } = useTranslation()
  const [open, setOpen] = React.useState(false)

  const { data: rootstocks = [] } = useRootstocks()
  const { data: users = [] } = useUsers()
  const addBench = useAddBench()

  const { handleSubmit, control, register, formState, setError, reset } = useForm<
    typeof FORM_DEFAULT_VALUES
  >({
    defaultValues: FORM_DEFAULT_VALUES
  })

  React.useEffect(() => {
    reset(FORM_DEFAULT_VALUES)
  }, [open === false])

  const { ref: benchLabelRef, ...benchLabel } = register('label')
  const { ref: benchQuantityRef, ...benchQuantity } = register('quantity', {
    min: { value: 1, message: t('invalid_quantity') }
  })

  return (
    <>
      <MenuItem
        onClick={() => {
          setOpen(true)
          onClick()
        }}
      >
        {t('add_new_bench')}
      </MenuItem>
      {open ? (
        <MuiPickersUtilsProvider utils={DayUtils}>
          <Dialog
            open={open}
            fullWidth
            onClose={() => setOpen(false)}
            aria-labelledby="dialog-title"
          >
            <DialogTitle id="dialog-title">{t('add_new_bench')}</DialogTitle>
            <form
              onSubmit={handleSubmit(({ userId, rootstockId, ...other }) => {
                return addBench.mutate(
                  {
                    greenhouseId: +greenhouseId,
                    data: { userId: +userId, rootstockId: +rootstockId, ...other }
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
                  <Grid item xs={6}>
                    <TextField
                      autoFocus
                      id="label"
                      type="text"
                      size="small"
                      fullWidth
                      required
                      placeholder="Ex: 1B"
                      error={!!formState.errors.label}
                      helperText={t(formState.errors.label?.message || '')}
                      variant="filled"
                      label={t('label')}
                      inputRef={benchLabelRef}
                      {...benchLabel}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <TextField
                      id="quantity"
                      type="number"
                      size="small"
                      fullWidth
                      required
                      variant="filled"
                      label={t('quantity')}
                      inputRef={benchQuantityRef}
                      error={!!formState.errors.quantity}
                      helperText={t(formState.errors.quantity?.message || '')}
                      {...benchQuantity}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <Controller
                      control={control}
                      name="firstPaymentDate"
                      render={({ field }) => (
                        <DatePicker
                          autoOk
                          format="DD/MM/YYYY"
                          fullWidth
                          required
                          invalidDateMessage={t('invalid_date')}
                          inputVariant="filled"
                          label={t('first_payment_date')}
                          value={new Date(field.value)}
                          onBlur={field.onBlur}
                          onChange={d => field.onChange(d?.toISOString())}
                          cancelLabel={t('cancel')}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <Controller
                      control={control}
                      name="lastPlantingDate"
                      render={({ field }) => (
                        <DatePicker
                          autoOk
                          format="DD/MM/YYYY"
                          fullWidth
                          required
                          invalidDateMessage={t('invalid_date')}
                          inputVariant="filled"
                          label={t('last_planting_date')}
                          value={new Date(field.value)}
                          onBlur={field.onBlur}
                          onChange={d => field.onChange(d?.toISOString())}
                          cancelLabel={t('cancel')}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <Controller
                      control={control}
                      name="rootstockId"
                      render={({ field }) => (
                        <FormControl fullWidth variant="filled" required>
                          <InputLabel id="rootstock-select-label">{t('rootstock')}</InputLabel>
                          <Select
                            value={field.value}
                            onBlur={() => field.onBlur()}
                            onChange={ev => field.onChange(ev.target.value)}
                            labelId="rootstock-select-label"
                            id="rootstock-select"
                          >
                            <MenuItem value={''}>{t('select')}</MenuItem>
                            {rootstocks.map(p => (
                              <MenuItem key={p.id} value={p.id}>
                                {p.name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      )}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Controller
                      control={control}
                      name="userId"
                      render={({ field }) => (
                        <FormControl fullWidth variant="filled" required>
                          <InputLabel id="user-select-label">{t('responsible')}</InputLabel>
                          <Select
                            value={field.value}
                            onBlur={() => field.onBlur()}
                            onChange={ev => field.onChange(ev.target.value)}
                            labelId="user-select-label"
                            id="user-select"
                          >
                            <MenuItem value={''}>{t('select')}</MenuItem>
                            {users.map(p => (
                              <MenuItem key={p.id} value={p.id}>
                                {`${p.name}`}
                              </MenuItem>
                            ))}
                          </Select>
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
                    addBench.isLoading
                  }
                  type="submit"
                  isLoading={addBench.isLoading}
                >
                  {t('save')}
                </LoadingButton>
              </DialogActions>
            </form>
          </Dialog>
        </MuiPickersUtilsProvider>
      ) : null}
    </>
  )
}

export default AddBenchButtonDialog
