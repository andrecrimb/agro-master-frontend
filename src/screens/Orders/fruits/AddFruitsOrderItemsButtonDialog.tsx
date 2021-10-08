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
  InputAdornment
} from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { useForm, Controller, useFieldArray } from 'react-hook-form'
import LoadingButton from 'components/LoadingButton'
import useAddFruitOrderItems from 'hooks/useAddFruitOrderItems'
import _ from 'utils/lodash'
import { PostAddRounded as OrderItemIcon, ClearRounded as ClearIcon } from '@material-ui/icons'
import styled from 'styledComponents'
import { muiTheme } from 'theme'
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
  fruitOrderItems: [
    {
      name: '',
      quantity: '',
      boxPrice: ''
    }
  ]
}

type Props = { orderId: number }

const AddFruitsOrderItemsButtonDialog: React.FC<Props> = ({ orderId }) => {
  const { t } = useTranslation()
  const addFruitOrderItems = useAddFruitOrderItems(orderId)
  const [open, setOpen] = React.useState(false)
  const [orderSum, setOrderSum] = React.useState(0)

  const { handleSubmit, control, formState, setError, getValues } = useForm<
    typeof FORM_DEFAULT_VALUES
  >({ defaultValues: FORM_DEFAULT_VALUES })

  const {
    fields: orderItemsFields,
    append: appendOrderItem,
    remove: removeOrderItem
  } = useFieldArray({ name: 'fruitOrderItems', control })

  const calculateSum = () => {
    const orderItems = getValues('fruitOrderItems')
    const total = orderItems.reduce(
      (prev, next) =>
        prev +
        Number(unmaskNumber(next.boxPrice, { thousandSeparator: '.', decimalSeparator: ',' })) *
          Number(unmaskNumber(next.quantity)),
      0
    )
    setOrderSum(total)
  }

  return (
    <>
      <Button onClick={() => setOpen(true)} variant="contained">
        {t('add_item')}
      </Button>
      <Dialog
        open={open}
        disableBackdropClick
        fullWidth
        onClose={() => setOpen(false)}
        aria-labelledby="dialog-title"
      >
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
          onSubmit={handleSubmit(({ fruitOrderItems }) => {
            const reqBody = fruitOrderItems.map(i => ({
              ...i,
              quantity: +unmaskNumber(i.quantity),
              boxPrice: +unmaskNumber(i.boxPrice, { thousandSeparator: '.', decimalSeparator: ',' })
            }))
            return addFruitOrderItems.mutate(reqBody, {
              onSuccess: () => setOpen(false),
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

                  <Grid item xs={4}>
                    <Controller
                      control={control}
                      name={`fruitOrderItems.${index}.quantity` as const}
                      rules={{ min: { value: 1, message: t('invalid_quantity') } }}
                      defaultValue={field.quantity}
                      render={({ field }) => (
                        <NumberFormat
                          id={`fruitOrderItems.${index}.quantity`}
                          size={'small' as any}
                          fullWidth
                          required
                          error={!!formState.errors.fruitOrderItems?.[index]?.quantity}
                          helperText={t(
                            formState.errors.fruitOrderItems?.[index]?.quantity?.message || ''
                          )}
                          label={t('quantity')}
                          variant="filled"
                          customInput={TextField}
                          type="tel"
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
                      name={`fruitOrderItems.${index}.boxPrice` as const}
                      defaultValue={field.boxPrice}
                      render={({ field }) => (
                        <NumberFormat
                          id={`fruitOrderItems.${index}.boxPrice`}
                          size={'small' as any}
                          fullWidth
                          required
                          error={!!formState.errors.fruitOrderItems?.[index]?.boxPrice}
                          helperText={t(
                            formState.errors.fruitOrderItems?.[index]?.boxPrice?.message || ''
                          )}
                          label={t('unity_price')}
                          variant="filled"
                          InputProps={{
                            startAdornment: <InputAdornment position="start">R$</InputAdornment>
                          }}
                          customInput={TextField}
                          type="tel"
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
                      name: '',
                      quantity: '',
                      boxPrice: ''
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
                addFruitOrderItems.isLoading
              }
              type="submit"
              isLoading={addFruitOrderItems.isLoading}
            >
              {t('save')}
            </LoadingButton>
          </DialogActions>
        </form>
      </Dialog>
    </>
  )
}

export default AddFruitsOrderItemsButtonDialog
