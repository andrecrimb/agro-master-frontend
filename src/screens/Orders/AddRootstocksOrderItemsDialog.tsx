import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Button,
  Grid,
  TextField,
  IconButton,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment
} from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { useForm, Controller, useFieldArray } from 'react-hook-form'
import LoadingButton from 'components/LoadingButton'
import useAddRootstocksOrderItems from 'hooks/useAddRootstocksOrderItems'
import _ from 'utils/lodash'
import { PostAddRounded as OrderItemIcon, ClearRounded as ClearIcon } from '@material-ui/icons'
import styled from 'styledComponents'
import { muiTheme } from 'theme'
import useRootstocks from 'hooks/useRootstocks'
import NumberFormat from 'react-number-format'
import { unmaskNumber } from 'utils/utils'

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

const FORM_DEFAULT_VALUES = {
  rootstocksOrderItems: [
    {
      quantity: '',
      unityPrice: '',
      rootstockId: 0
    }
  ]
}

type Props = { onClose: () => void; orderId: number }

const AddRootstocksOrderItemsDialog: React.FC<Props> = ({ onClose, orderId }) => {
  const { t } = useTranslation()
  const { data: rootstocks = [] } = useRootstocks()

  const addRootstocksOrderItems = useAddRootstocksOrderItems(orderId)

  const [orderSum, setOrderSum] = React.useState(0)

  const { handleSubmit, control, formState, setError, getValues } = useForm<
    typeof FORM_DEFAULT_VALUES
  >({ defaultValues: FORM_DEFAULT_VALUES })

  const {
    fields: orderItemsFields,
    append: appendOrderItem,
    remove: removeOrderItem
  } = useFieldArray({ name: 'rootstocksOrderItems', control })

  const calculateSum = () => {
    const orderItems = getValues('rootstocksOrderItems')
    const total = orderItems.reduce(
      (prev, next) =>
        prev +
        Number(unmaskNumber(next.unityPrice, { thousandSeparator: '.', decimalSeparator: ',' })) *
          Number(unmaskNumber(next.quantity)),
      0
    )
    setOrderSum(total)
  }

  return (
    <Dialog open disableBackdropClick fullWidth onClose={onClose} aria-labelledby="dialog-title">
      <DialogTitle id="dialog-title">{t('add_order_items')}</DialogTitle>
      <TotalValueBox>
        <Typography variant="subtitle1">
          {t('total_value')}:{' '}
          <NumberFormat
            displayType="text"
            value={orderSum}
            prefix={'R$ '}
            allowLeadingZeros
            thousandSeparator="."
            decimalSeparator=","
            decimalScale={2}
          />
        </Typography>
      </TotalValueBox>
      <form
        onSubmit={handleSubmit(({ rootstocksOrderItems }) => {
          const reqBody = rootstocksOrderItems.map(i => ({
            ...i,
            quantity: +unmaskNumber(i.quantity),
            unityPrice: +unmaskNumber(i.unityPrice, {
              thousandSeparator: '.',
              decimalSeparator: ','
            })
          }))
          return addRootstocksOrderItems.mutate(reqBody, {
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
          <Grid container spacing={2} alignItems="center" onBlur={calculateSum}>
            {orderItemsFields.map((field, index) => (
              <React.Fragment key={field.id}>
                <Grid item xs={4}>
                  <Controller
                    control={control}
                    name={`rootstocksOrderItems.${index}.rootstockId` as const}
                    defaultValue={field.rootstockId}
                    render={({ field }) => (
                      <FormControl innerRef={field.ref} fullWidth variant="filled" required>
                        <InputLabel id={`rootstocksOrderItems.${index}.rootstockId`}>
                          {t('rootstock')}
                        </InputLabel>
                        <Select
                          onBlur={field.onBlur}
                          value={field.value}
                          onChange={field.onChange}
                          labelId={`rootstocksOrderItems.${index}.rootstockId`}
                          id={`rootstocksOrderItems.${index}.rootstockId`}
                        >
                          <MenuItem value={0}>{t('select')}</MenuItem>
                          {rootstocks.map(r => (
                            <MenuItem key={r.id} value={r.id}>
                              {r.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    )}
                  />
                </Grid>

                <Grid item xs={4}>
                  <Controller
                    control={control}
                    name={`rootstocksOrderItems.${index}.quantity` as const}
                    rules={{ min: { value: 1, message: t('invalid_quantity') } }}
                    defaultValue={field.quantity}
                    render={({ field }) => (
                      <NumberFormat
                        id={`rootstocksOrderItems.${index}.quantity`}
                        size={'small' as any}
                        fullWidth
                        required
                        error={!!formState.errors.rootstocksOrderItems?.[index]?.quantity}
                        helperText={t(
                          formState.errors.rootstocksOrderItems?.[index]?.quantity?.message || ''
                        )}
                        label={t('quantity')}
                        variant="filled"
                        customInput={TextField}
                        type="text"
                        inputMode="decimal"
                        thousandSeparator="."
                        decimalSeparator=","
                        getInputRef={field.ref}
                        {...field}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={3}>
                  <Controller
                    control={control}
                    name={`rootstocksOrderItems.${index}.unityPrice` as const}
                    defaultValue={field.unityPrice}
                    render={({ field }) => (
                      <NumberFormat
                        id={`rootstocksOrderItems.${index}.unityPrice`}
                        size={'small' as any}
                        fullWidth
                        required
                        error={!!formState.errors.rootstocksOrderItems?.[index]?.unityPrice}
                        helperText={t(
                          formState.errors.rootstocksOrderItems?.[index]?.unityPrice?.message || ''
                        )}
                        label={t('unity_price')}
                        variant="filled"
                        InputProps={{
                          startAdornment: <InputAdornment position="start">R$</InputAdornment>
                        }}
                        customInput={TextField}
                        type="text"
                        inputMode="decimal"
                        thousandSeparator="."
                        decimalSeparator=","
                        getInputRef={field.ref}
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
            <Grid item xs={12}>
              <Button
                variant="outlined"
                startIcon={<OrderItemIcon />}
                onClick={() =>
                  appendOrderItem({
                    quantity: '',
                    unityPrice: '',
                    rootstockId: 0
                  })
                }
              >
                {t('add_item')}
              </Button>
            </Grid>
            <Grid item xs={5} />
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="primary" data-testid="button_cancel" onClick={onClose}>
            {t('cancel')}
          </Button>
          <LoadingButton
            color="primary"
            variant="contained"
            data-testid="button_save"
            disabled={
              !formState.isDirty ||
              !!Object.keys(formState.errors).length ||
              addRootstocksOrderItems.isLoading
            }
            type="submit"
            isLoading={addRootstocksOrderItems.isLoading}
          >
            {t('save')}
          </LoadingButton>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default AddRootstocksOrderItemsDialog
