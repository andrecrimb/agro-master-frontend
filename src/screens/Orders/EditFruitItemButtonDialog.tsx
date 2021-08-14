import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  IconButton,
  Button,
  Grid,
  TextField,
  Tooltip
} from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import LoadingButton from 'components/LoadingButton'
import { useForm } from 'react-hook-form'
import useEditOrderFruitItem from 'hooks/useEditOrderFruitItem'
import { FruitOrderItem } from 'types/orders'
import { EditRounded as EditIcon, Delete as DeleteIcon } from '@material-ui/icons'
import useDialog from 'hooks/useDialog'
import useDeleteOrderFruitItem from 'hooks/useDeleteOrderFruitItem'

const FORM_DEFAULT_VALUES = {
  name: '',
  quantity: 0,
  boxPrice: 0
}

type Props = { fruitOrderItem: FruitOrderItem }

const EditOrderFruitItemButtonDialog: React.FC<Props> = ({ fruitOrderItem }) => {
  const { t } = useTranslation()
  const [open, setOpen] = React.useState(false)
  const { newDialog } = useDialog()

  const editOrderFruitItem = useEditOrderFruitItem(fruitOrderItem.id, fruitOrderItem.orderId)
  const deleteOrderFruitItem = useDeleteOrderFruitItem(fruitOrderItem.id, fruitOrderItem.orderId)

  const { handleSubmit, register, formState, reset, setError } = useForm<
    typeof FORM_DEFAULT_VALUES
  >({
    defaultValues: FORM_DEFAULT_VALUES
  })

  const { ref: nameRef, ...name } = register('name')
  const { ref: quantityRef, ...quantity } = register('quantity')
  const { ref: boxPriceRef, ...boxPrice } = register('boxPrice')

  React.useEffect(() => {
    reset({
      name: fruitOrderItem.name,
      quantity: fruitOrderItem.quantity,
      boxPrice: fruitOrderItem.boxPrice
    })
  }, [open === false])

  return (
    <>
      <IconButton size="small" onClick={() => setOpen(true)}>
        <EditIcon />
      </IconButton>
      {open ? (
        <Dialog open={open} onClose={() => setOpen(false)} aria-labelledby="dialog-title">
          <DialogTitle id="dialog-title">{t('edit_order_item')}</DialogTitle>
          <form
            onSubmit={handleSubmit(values => {
              editOrderFruitItem.mutate(values, {
                onSuccess: () => {
                  setOpen(false)
                }
              })
            })}
          >
            <DialogContent>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    id="name"
                    type="text"
                    size="small"
                    autoFocus
                    fullWidth
                    required
                    variant="filled"
                    label={t('fruit_name')}
                    inputRef={nameRef}
                    {...name}
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
                    label={t('box_quantity')}
                    inputRef={quantityRef}
                    {...quantity}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="boxPrice"
                    type="number"
                    size="small"
                    fullWidth
                    required
                    variant="filled"
                    label={t('box_price')}
                    inputRef={boxPriceRef}
                    {...boxPrice}
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Tooltip title={t('delete_item') + ''} arrow placement="left">
                <IconButton
                  onClick={() =>
                    newDialog({
                      title: t('warning') + '!',
                      message: t('delete_order_item_question'),
                      confirmationButton: {
                        text: t('delete'),
                        onClick: () =>
                          deleteOrderFruitItem.mutateAsync(undefined, {
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
                  editOrderFruitItem.isLoading
                }
                type="submit"
                isLoading={editOrderFruitItem.isLoading}
              >
                {t('save')}
              </LoadingButton>
            </DialogActions>
          </form>
        </Dialog>
      ) : null}
    </>
  )
}

export default EditOrderFruitItemButtonDialog
