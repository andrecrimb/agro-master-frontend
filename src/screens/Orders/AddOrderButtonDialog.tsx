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
  InputLabel,
  IconButton,
  FormHelperText
} from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { useForm, Controller } from 'react-hook-form'
import LoadingButton from 'components/LoadingButton'
import useAddOrder from 'hooks/useAddOrder'
import useCustomers from 'hooks/useCustomers'
import _ from 'utils/lodash'
import { DatePicker } from '@material-ui/pickers'
import { AddRounded as AddIcon } from '@material-ui/icons'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import DayUtils from '@date-io/dayjs'
import useCustomer from 'hooks/useCustomer'
import { OrderRequest } from 'types/orders'
import useUrlSearch from 'hooks/useUrlSearch'

const FORM_DEFAULT_VALUES: OrderRequest = {
  type: 'seedling',
  orderDate: new Date().toISOString(),
  deliveryDate: new Date().toISOString(),
  nfNumber: '',
  customerPropertyId: 0
}

const AddOrderButtonDialog: React.FC = () => {
  const { t } = useTranslation()
  const { setParams } = useUrlSearch({ params: [] })
  const [open, setOpen] = React.useState(false)
  const addOrder = useAddOrder()

  const [selectedCustomer, setSelectedCustomers] = React.useState(0)
  const { data: customers = {} } = useCustomers({ select: d => _.mapKeys(d, 'id') })
  const { data: customer } = useCustomer(selectedCustomer, { enabled: selectedCustomer > 0 })

  const { handleSubmit, control, register, formState, setValue, setError, reset } = useForm<
    typeof FORM_DEFAULT_VALUES
  >({ defaultValues: FORM_DEFAULT_VALUES })

  React.useEffect(() => {
    reset(FORM_DEFAULT_VALUES)
    setSelectedCustomers(0)
  }, [open === false])

  const { ref: nfNumberRef, ...nfNumber } = register('nfNumber')

  return (
    <>
      <IconButton color="inherit" onClick={() => setOpen(true)}>
        <AddIcon />
      </IconButton>
      {open ? (
        <MuiPickersUtilsProvider utils={DayUtils}>
          <Dialog open aria-labelledby="dialog-title" onClose={() => setOpen(false)}>
            <DialogTitle id="dialog-title">{t('add_new_order')}</DialogTitle>
            <form
              onSubmit={handleSubmit(values => {
                return addOrder.mutate(values, {
                  onSuccess: response => {
                    setOpen(false)
                    setParams({ drawer: values.type + 'Order', drawerTab: null, id: response.id })
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
                  <Grid item xs={4}>
                    <Controller
                      control={control}
                      name="type"
                      render={({ field }) => (
                        <FormControl fullWidth variant="filled" required>
                          <InputLabel id="order-type">{t('order_type')}</InputLabel>
                          <Select
                            value={field.value}
                            onBlur={() => field.onBlur()}
                            onChange={ev => field.onChange(ev.target.value)}
                            labelId="order-type"
                          >
                            <MenuItem value="seedling">{t('seedling_plural')}</MenuItem>
                            <MenuItem value="borbulha">{t('borbulha_plural')}</MenuItem>
                            <MenuItem value="rootstock">{t('rootstock_plural')}</MenuItem>
                            <MenuItem value="fruit">{t('fruit_plural')}</MenuItem>
                            <MenuItem value="seed">{t('seed_plural')}</MenuItem>
                          </Select>
                        </FormControl>
                      )}
                    />
                  </Grid>
                  <Grid item xs={8}></Grid>

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
                          <FormControl
                            error={!!formState.errors.customerPropertyId}
                            fullWidth
                            variant="filled"
                            required
                          >
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
                            <FormHelperText error>
                              {t(formState.errors.customerPropertyId?.message || '')}
                            </FormHelperText>
                          </FormControl>
                        )}
                      />
                    </Grid>
                  ) : null}
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
                    addOrder.isLoading
                  }
                  type="submit"
                  isLoading={addOrder.isLoading}
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

export default AddOrderButtonDialog
