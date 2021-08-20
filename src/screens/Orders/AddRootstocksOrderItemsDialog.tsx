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
  MenuItem
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
      quantity: 0,
      unityPrice: 0,
      rootstockId: 0
    }
  ]
}

type Props = { onClose: () => void; orderId: number }

const AddRootstocksOrderItemsDialog: React.FC<Props> = ({ onClose, orderId }) => {
  const { t } = useTranslation()
  const { data: rootstocks = [] } = useRootstocks()

  const addRootstocksOrderItems = useAddRootstocksOrderItems(orderId)

  const [orderSum, setOrderSum] = React.useState('0,00')

  const { handleSubmit, control, formState, setError, getValues } = useForm<
    typeof FORM_DEFAULT_VALUES
  >({
    defaultValues: FORM_DEFAULT_VALUES
  })

  const {
    fields: orderItemsFields,
    append: appendOrderItem,
    remove: removeOrderItem
  } = useFieldArray({
    name: 'rootstocksOrderItems',
    control
  })

  const calculateSum = () => {
    const orderItems = getValues('rootstocksOrderItems')
    const total: string = orderItems
      .reduce((prev, next) => prev + next.unityPrice * next.quantity, 0)
      .toFixed(2)
    setOrderSum(total.replace('.', ','))
  }

  return (
    <Dialog open disableBackdropClick fullWidth onClose={onClose} aria-labelledby="dialog-title">
      <DialogTitle id="dialog-title">{t('add_order_items')}</DialogTitle>
      <TotalValueBox>
        <Typography variant="subtitle1">
          {t('total_value')}: <span>R${orderSum}</span>
        </Typography>
      </TotalValueBox>
      <form
        onSubmit={handleSubmit(values => {
          return addRootstocksOrderItems.mutate(values.rootstocksOrderItems, {
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
                    defaultValue={field.quantity}
                    render={({ field }) => (
                      <TextField
                        id={`rootstocksOrderItems.${index}.quantity`}
                        type="number"
                        size="small"
                        fullWidth
                        required
                        variant="filled"
                        label={t('quantity')}
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
                      <TextField
                        id={`rootstocksOrderItems.${index}.unityPrice`}
                        type="number"
                        size="small"
                        fullWidth
                        required
                        variant="filled"
                        label={t('unity_price')}
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
                    quantity: 0,
                    unityPrice: 0,
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
