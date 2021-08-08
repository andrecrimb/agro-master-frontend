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
  InputLabel,
  IconButton,
  Switch,
  Typography,
  Divider,
  FormHelperText
} from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { useForm, Controller, useFieldArray } from 'react-hook-form'
import LoadingButton from 'components/LoadingButton'
import useAddFruitOrder from 'hooks/useAddFruitOrder'
import useOwnerProperties from 'hooks/useOwnerProperties'
import { AddFruitOrderRequest } from 'types/orders'
import useCustomers from 'hooks/useCustomers'
import { Customer } from 'types/customer'
import _ from 'utils/lodash'
import { DatePicker } from '@material-ui/pickers'
import {
  LocalAtmRounded as PaymentIcon,
  PostAddRounded as OrderItemIcon,
  ClearRounded as ClearIcon
} from '@material-ui/icons'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import DayUtils from '@date-io/dayjs'
import useCustomer from 'hooks/useCustomer'
import styled from 'styledComponents'
import { muiTheme } from 'theme'

//#region Styles
const TotalValueBox = styled.div`
  position: absolute;
  top: 20px;
  right: 24px;
  border-radius: 4px;
  background: ${muiTheme.palette.grey[200]};
  padding: 10px 40px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  h6 {
    font-weight: 500;
    color: ${muiTheme.palette.grey[600]};
    span {
      color: ${muiTheme.palette.text.primary};
    }
  }
`
//#endregion

const FORM_DEFAULT_VALUES: AddFruitOrderRequest = {
  type: 'fruit',
  orderDate: new Date().toISOString(),
  deliveryDate: new Date().toISOString(),
  nfNumber: '',
  installmentsNumber: 1,
  customerPropertyId: 0,
  payments: [],
  fruitOrderItems: [
    {
      name: '',
      quantity: 0,
      boxPrice: 0
    }
  ]
}

type Props = { onClose: () => void }

const AddFruitOrderButtonDialog: React.FC<Props> = ({ onClose }) => {
  const { t } = useTranslation()
  const addNewFruitOrder = useAddFruitOrder()

  const [orderSum, setOrderSum] = React.useState('0,00')
  const [selectedCustomer, setSelectedCustomers] = React.useState(0)
  const { data: customers = {} } = useCustomers({ select: d => _.mapKeys(d, 'id') })
  const { data: customer } = useCustomer(selectedCustomer, { enabled: selectedCustomer > 0 })

  //! Add validation to fields
  const {
    handleSubmit,
    control,
    register,
    formState,
    setValue,
    setError,
    reset,
    getValues
  } = useForm<typeof FORM_DEFAULT_VALUES>({
    defaultValues: FORM_DEFAULT_VALUES
  })

  const { fields: paymentFields, append: appendPayment, remove: removePayment } = useFieldArray({
    name: 'payments',
    control
  })

  const {
    fields: orderItemsFields,
    append: appendOrderItem,
    remove: removeOrderItem
  } = useFieldArray({
    name: 'fruitOrderItems',
    control
  })

  const { ref: installmentsNumberRef, ...installmentsNumber } = register('installmentsNumber', {
    min: { value: 1, message: t('invalid_quantity') }
  })
  const { ref: nfNumberRef, ...nfNumber } = register('nfNumber')

  const calculateSum = () => {
    const orderItems = getValues('fruitOrderItems')
    const total: string = orderItems
      .reduce((prev, next) => prev + next.boxPrice * next.quantity, 0)
      .toFixed(2)
    setOrderSum(total.replace('.', ','))
  }

  return (
    <MuiPickersUtilsProvider utils={DayUtils}>
      <Dialog
        open
        disableBackdropClick
        fullWidth
        maxWidth="md"
        onClose={onClose}
        aria-labelledby="dialog-title"
      >
        <DialogTitle id="dialog-title">{t('add_new_fruit_order')}</DialogTitle>
        <TotalValueBox>
          <Typography variant="subtitle1">
            {t('total_value')}: <span>R${orderSum}</span>
          </Typography>
        </TotalValueBox>
        <form
          onSubmit={handleSubmit(values => {
            return addNewFruitOrder.mutate(values, {
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
                <Typography color="textSecondary" display="block" variant="subtitle1">
                  {t('order_items')}
                </Typography>
                <Divider />
              </Grid>

              <Grid item xs={12}>
                <Grid container spacing={2} alignItems="center" onBlur={calculateSum}>
                  {orderItemsFields.map((field, index) => (
                    <React.Fragment key={field.id}>
                      <Grid item xs={5}>
                        <Controller
                          control={control}
                          name={`fruitOrderItems.${index}.name` as const}
                          defaultValue={field.name}
                          render={({ field }) => (
                            <TextField
                              id={`fruitOrderItems.${index}.name`}
                              type="text"
                              size="small"
                              fullWidth
                              required
                              variant="filled"
                              label={t('fruit_name')}
                              {...field}
                            />
                          )}
                        />
                      </Grid>

                      <Grid item xs={3}>
                        <Controller
                          control={control}
                          name={`fruitOrderItems.${index}.quantity` as const}
                          defaultValue={field.quantity}
                          render={({ field }) => (
                            <TextField
                              id={`fruitOrderItems.${index}.quantity`}
                              type="number"
                              size="small"
                              fullWidth
                              required
                              variant="filled"
                              label={t('box_quantity')}
                              {...field}
                            />
                          )}
                        />
                      </Grid>

                      <Grid item xs={3}>
                        <Controller
                          control={control}
                          name={`fruitOrderItems.${index}.boxPrice` as const}
                          defaultValue={field.boxPrice}
                          render={({ field }) => (
                            <TextField
                              id={`fruitOrderItems.${index}.boxPrice`}
                              type="number"
                              size="small"
                              fullWidth
                              required
                              variant="filled"
                              label={t('box_price')}
                              {...field}
                            />
                          )}
                        />
                      </Grid>

                      <Grid item xs={1}>
                        <IconButton
                          color="inherit"
                          size="small"
                          disabled={orderItemsFields.length === 1}
                          onClick={() => orderItemsFields.length > 1 && removeOrderItem(index)}
                        >
                          <ClearIcon />
                        </IconButton>
                      </Grid>
                    </React.Fragment>
                  ))}
                  <Grid item xs={3}>
                    <Button
                      variant="outlined"
                      startIcon={<OrderItemIcon />}
                      onClick={() =>
                        appendOrderItem({
                          name: '',
                          quantity: 0,
                          boxPrice: 0
                        })
                      }
                    >
                      {t('add_item')}
                    </Button>
                  </Grid>
                  <Grid item xs={5} />
                  <Grid item xs={3}>
                    <TextField
                      id={installmentsNumber.name}
                      type="number"
                      size="small"
                      fullWidth
                      required
                      variant="filled"
                      label={t('installment_number')}
                      inputRef={installmentsNumberRef}
                      {...installmentsNumber}
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Typography color="textSecondary" display="block" variant="subtitle1">
                  {t('generalData')}
                </Typography>
                <Divider />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  id="nfNumber"
                  type="text"
                  size="small"
                  fullWidth
                  variant="filled"
                  label={t('invoice_number')}
                  inputRef={nfNumberRef}
                  {...nfNumber}
                />
              </Grid>

              <Grid item xs={3}>
                <Controller
                  control={control}
                  name="deliveryDate"
                  render={({ field }) => (
                    <DatePicker
                      autoOk
                      format="DD/MM/YYYY"
                      fullWidth
                      required
                      size="small"
                      invalidDateMessage={t('invalid_date')}
                      inputVariant="filled"
                      label={t('delivery_date')}
                      value={new Date(field.value)}
                      onBlur={field.onBlur}
                      onChange={d => field.onChange(d?.toISOString())}
                      cancelLabel={t('cancel')}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={3}>
                <Controller
                  control={control}
                  name="deliveryDate"
                  render={({ field }) => (
                    <DatePicker
                      autoOk
                      format="DD/MM/YYYY"
                      fullWidth
                      required
                      size="small"
                      invalidDateMessage={t('invalid_date')}
                      inputVariant="filled"
                      label={t('order_date')}
                      value={new Date(field.value)}
                      onBlur={field.onBlur}
                      onChange={d => field.onChange(d?.toISOString())}
                      cancelLabel={t('cancel')}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={6}>
                <FormControl
                  error={!!formState.errors.customerPropertyId}
                  fullWidth
                  variant="filled"
                  required
                >
                  <InputLabel id="select-customer">{t('customer')}</InputLabel>
                  <Select
                    value={customers[selectedCustomer]?.id || 0}
                    onChange={ev => {
                      setSelectedCustomers(ev.target.value as number)
                      setValue('customerPropertyId', 0)
                    }}
                    labelId="select-customer"
                    id="select-customer"
                  >
                    <MenuItem value={0}>{t('select')}</MenuItem>
                    {Object.values(customers).map(c => (
                      <MenuItem key={c.id} value={c.id}>
                        {`${c.name}`}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText error>
                    {t(formState.errors.customerPropertyId?.message || '')}
                  </FormHelperText>
                </FormControl>
              </Grid>

              {selectedCustomer ? (
                <Grid item xs={6}>
                  <Controller
                    control={control}
                    name="customerPropertyId"
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
                          <MenuItem value={0}>{t('select')}</MenuItem>
                          {customer?.properties?.map(p => (
                            <MenuItem key={p.property.id} value={p.property.id}>
                              {p.property.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    )}
                  />
                </Grid>
              ) : null}

              <Grid item xs={12}>
                <Typography color="textSecondary" display="block" variant="subtitle1">
                  {t('payment')}
                </Typography>
                <Divider />
              </Grid>

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
                        {field.received ? (
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
                        ) : null}
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
                          scheduledDate: new Date(),
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
                addNewFruitOrder.isLoading
              }
              type="submit"
              isLoading={addNewFruitOrder.isLoading}
            >
              {t('save')}
            </LoadingButton>
          </DialogActions>
        </form>
      </Dialog>
    </MuiPickersUtilsProvider>
  )
}

export default AddFruitOrderButtonDialog
