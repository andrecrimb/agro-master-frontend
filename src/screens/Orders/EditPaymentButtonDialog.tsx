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
  Tooltip,
  FormControlLabel,
  Switch
} from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import LoadingButton from 'components/LoadingButton'
import { Controller, useForm } from 'react-hook-form'
import useEditOrderPayment from 'hooks/useEditOrderPayment'
import { Payment, PaymentMethod } from 'types/orders'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import DayUtils from '@date-io/dayjs'
import { DatePicker } from '@material-ui/pickers'
import { EditRounded as EditIcon, Delete as DeleteIcon } from '@material-ui/icons'
import useDialog from 'hooks/useDialog'
import { formatDate } from 'utils/utils'
import useDeletePayment from 'hooks/useDeletePayment'

const FORM_DEFAULT_VALUES = {
  amount: 0,
  method: 'money' as PaymentMethod,
  scheduledDate: new Date().toISOString(),
  received: false
}

type Props = { payment: Payment }

const EditPaymentButtonDialog: React.FC<Props> = ({ payment }) => {
  const { t } = useTranslation()
  const [open, setOpen] = React.useState(false)
  const { newDialog } = useDialog()

  const editPayment = useEditOrderPayment(payment.id, payment.orderId)
  const deletePayment = useDeletePayment(payment.id, payment.orderId)

  const { handleSubmit, register, formState, reset, control, setError } = useForm<
    typeof FORM_DEFAULT_VALUES
  >({
    defaultValues: FORM_DEFAULT_VALUES
  })

  const { ref: amountRef, ...amount } = register('amount')

  React.useEffect(() => {
    reset(payment)
  }, [open === false])

  return (
    <>
      <IconButton onClick={() => setOpen(true)}>
        <EditIcon />
      </IconButton>
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
            <DialogTitle id="dialog-title">{t('edit_payment')}</DialogTitle>
            <form
              onSubmit={handleSubmit(values => {
                editPayment.mutate(values, {
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
                      inputProps={{ step: 0.01 }}
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
                <Tooltip title={t('delete_payment') + ''} arrow placement="left">
                  <IconButton
                    onClick={() =>
                      newDialog({
                        title: t('warning') + '!',
                        message: t('delete_question', { item: t('this_payment') }),
                        confirmationButton: {
                          text: t('delete'),
                          onClick: () =>
                            deletePayment.mutateAsync(undefined, {
                              onSuccess: () => setOpen(false)
                            })
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
                    editPayment.isLoading
                  }
                  type="submit"
                  isLoading={editPayment.isLoading}
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

export default EditPaymentButtonDialog
