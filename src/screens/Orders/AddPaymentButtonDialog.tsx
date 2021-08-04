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
  Divider,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  FormControlLabel,
  Switch
} from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import LoadingButton from 'components/LoadingButton'
import { Controller, useForm } from 'react-hook-form'
import useAddOrderPayment from 'hooks/useAddOrderPayment'
import { PaymentMethod } from 'types/orders'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import DayUtils from '@date-io/dayjs'
import { DatePicker } from '@material-ui/pickers'

const FORM_DEFAULT_VALUES = {
  amount: 0,
  method: 'money' as PaymentMethod,
  scheduledDate: new Date().toISOString(),
  received: false
}

type Props = { orderId: number; onClick: () => void }

const AddPaymentButtonDialog: React.FC<Props> = ({ orderId, onClick }) => {
  const { t } = useTranslation()
  const [open, setOpen] = React.useState(false)

  const addPayment = useAddOrderPayment(orderId)

  const { handleSubmit, setValue, register, formState, reset, control, setError } = useForm<
    typeof FORM_DEFAULT_VALUES
  >({
    defaultValues: FORM_DEFAULT_VALUES
  })

  const { ref: amountRef, ...amount } = register('amount')

  React.useEffect(() => {
    reset(FORM_DEFAULT_VALUES)
  }, [open === false])

  return (
    <>
      <MenuItem
        onClick={() => {
          setOpen(true)
          onClick()
        }}
      >
        {t('add_payment')}
      </MenuItem>
      {open ? (
        <MuiPickersUtilsProvider utils={DayUtils}>
          <Dialog
            disableBackdropClick
            open={open}
            fullWidth
            maxWidth="sm"
            onClose={() => setOpen(false)}
            aria-labelledby="dialog-title"
          >
            <DialogTitle id="dialog-title">{t('add_payment_to_order')}</DialogTitle>
            <form
              onSubmit={handleSubmit(values => {
                addPayment.mutate(values, {
                  onSuccess: () => {
                    setOpen(false)
                  },
                  onError: e => {
                    const apiErrors = e?.response?.data.errors || []
                    for (const apiError of apiErrors) {
                      setError(apiError.param, { message: apiError.msg })
                    }
                  }
                })
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
                      type="number"
                      size="small"
                      autoFocus
                      fullWidth
                      required
                      variant="filled"
                      label={t('amount')}
                      inputRef={amountRef}
                      {...amount}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Controller
                      control={control}
                      name="method"
                      render={({ field }) => (
                        <FormControl fullWidth variant="filled" required>
                          <InputLabel id="payment-method-label">{t('rootstock')}</InputLabel>
                          <Select
                            value={field.value}
                            onBlur={() => field.onBlur()}
                            onChange={ev => field.onChange(ev.target.value)}
                            labelId="payment-method-label"
                          >
                            <MenuItem value="cheque">{t('cheque')}</MenuItem>
                            <MenuItem value="money">{t('money')}</MenuItem>
                          </Select>
                        </FormControl>
                      )}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Controller
                      control={control}
                      name="scheduledDate"
                      render={({ field }) => (
                        <DatePicker
                          autoOk
                          format="DD/MM/YYYY"
                          fullWidth
                          required
                          invalidDateMessage={t('invalid_date')}
                          inputVariant="filled"
                          label={t('scheduled_date')}
                          value={new Date(field.value)}
                          onBlur={field.onBlur}
                          onChange={d => field.onChange(d?.toISOString())}
                          cancelLabel={t('cancel')}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Controller
                      control={control}
                      name="received"
                      render={({ field }) => (
                        <FormControlLabel
                          control={
                            <Switch
                              checked={field.value}
                              onChange={ev => field.onChange(ev.target.checked)}
                              color="secondary"
                            />
                          }
                          label={t('received')}
                        />
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
                    addPayment.isLoading
                  }
                  type="submit"
                  isLoading={addPayment.isLoading}
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

export default AddPaymentButtonDialog
