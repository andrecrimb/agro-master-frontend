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
  Radio,
  RadioGroup,
  FormControlLabel,
  Switch,
  IconButton,
  FormLabel
} from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import LoadingButton from 'components/LoadingButton'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import useAddOrderPayment from 'hooks/useAddOrderPayment'
import { PaymentMethod } from 'types/orders'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import DayUtils from '@date-io/dayjs'
import { DatePicker } from '@material-ui/pickers'
import { LocalAtmRounded as PaymentIcon, ClearRounded as ClearIcon } from '@material-ui/icons'

const FORM_DEFAULT_VALUES = {
  payments: [
    {
      amount: 0,
      method: 'money' as PaymentMethod,
      scheduledDate: new Date().toISOString(),
      received: false
    }
  ]
}

type Props = { orderId: number; onClose: () => void }

const AddPaymentButtonDialog: React.FC<Props> = ({ orderId, onClose }) => {
  const { t } = useTranslation()

  const addPayment = useAddOrderPayment(orderId)

  const { handleSubmit, formState, control, setError } = useForm<typeof FORM_DEFAULT_VALUES>({
    defaultValues: FORM_DEFAULT_VALUES
  })

  const { fields: paymentFields, append: appendPayment, remove: removePayment } = useFieldArray({
    name: 'payments',
    control
  })

  return (
    <MuiPickersUtilsProvider utils={DayUtils}>
      <Dialog
        disableBackdropClick
        open
        maxWidth="md"
        onClose={onClose}
        aria-labelledby="dialog-title"
      >
        <DialogTitle id="dialog-title">{t('add_payments_to_order')}</DialogTitle>
        <form
          onSubmit={handleSubmit(values => {
            addPayment.mutate(values.payments, {
              onSuccess: () => {
                onClose()
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
                <Grid container spacing={2} alignItems="center">
                  {paymentFields.map((field, index) => (
                    <React.Fragment key={field.id}>
                      <Grid item xs={3}>
                        <Controller
                          control={control}
                          name={`payments.${index}.method` as const}
                          defaultValue={field.method}
                          render={({ field, formState }) => (
                            <FormControl component="fieldset" fullWidth>
                              <FormLabel component="legend">{t('payment_method')}</FormLabel>
                              <RadioGroup
                                style={{ flexDirection: 'row' }}
                                aria-label={t('payment_method')}
                                name={field.name}
                                value={field.value}
                                onChange={ev => field.onChange(ev.target.value)}
                              >
                                <FormControlLabel
                                  value="cheque"
                                  control={<Radio />}
                                  label={t('cheque')}
                                />
                                <FormControlLabel
                                  value="money"
                                  control={<Radio />}
                                  label={t('money')}
                                />
                              </RadioGroup>
                            </FormControl>
                          )}
                        />
                      </Grid>

                      <Grid item xs={3}>
                        <Controller
                          control={control}
                          name={`payments.${index}.amount` as const}
                          defaultValue={field.amount}
                          render={({ field }) => (
                            <TextField
                              id={`payments.${index}.amount`}
                              type="text"
                              size="small"
                              fullWidth
                              required
                              variant="filled"
                              label={t('amount')}
                              {...field}
                            />
                          )}
                        />
                      </Grid>

                      <Grid item xs={3}>
                        <Controller
                          control={control}
                          name={`payments.${index}.scheduledDate` as const}
                          defaultValue={field.scheduledDate}
                          render={({ field }) => (
                            <DatePicker
                              autoOk
                              format="DD/MM/YYYY"
                              fullWidth
                              required
                              size="small"
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

                      <Grid item xs={2}>
                        <Controller
                          control={control}
                          name={`payments.${index}.received` as const}
                          defaultValue={field.received}
                          render={({ field }) => (
                            <FormControlLabel
                              control={
                                <Switch
                                  checked={field.value}
                                  onChange={ev => field.onChange(ev.target.checked)}
                                  name={field.name}
                                />
                              }
                              label={t('received')}
                            />
                          )}
                        />
                      </Grid>

                      <Grid item xs={1}>
                        <IconButton
                          color="inherit"
                          size="small"
                          onClick={() => removePayment(index)}
                        >
                          <ClearIcon />
                        </IconButton>
                      </Grid>
                    </React.Fragment>
                  ))}
                  <Grid item xs={12}>
                    <Button
                      variant="outlined"
                      startIcon={<PaymentIcon />}
                      onClick={() =>
                        appendPayment({
                          amount: 0,
                          method: 'cheque',
                          scheduledDate: new Date().toISOString(),
                          received: true
                        })
                      }
                    >
                      {t('add_payment')}
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              variant="outlined"
              color="primary"
              data-testid="button_cancel"
              onClick={() => onClose()}
            >
              {t('cancel')}
            </Button>
            <LoadingButton
              color="primary"
              variant="contained"
              data-testid="button_save"
              disabled={
                !formState.isDirty || !!Object.keys(formState.errors).length || addPayment.isLoading
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
  )
}

export default AddPaymentButtonDialog
