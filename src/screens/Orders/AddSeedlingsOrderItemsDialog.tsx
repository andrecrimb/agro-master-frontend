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
import useAddSeedlingsOrderItems from 'hooks/useAddSeedlingsOrderItems'
import _ from 'utils/lodash'
import { PostAddRounded as OrderItemIcon, ClearRounded as ClearIcon } from '@material-ui/icons'
import styled from 'styledComponents'
import { muiTheme } from 'theme'
import useGreenhouses from 'hooks/useGreenhouses'
import { SeedlingBench } from 'types/greenhouse'
import useOwnerProperties from 'hooks/useOwnerProperties'

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
  seedlingsOrderItems: [
    {
      quantity: 0,
      unityPrice: 0,
      seedlingBenchId: 0
    }
  ]
}

type Props = { onClose: () => void; orderId: number }

const AddSeedlingsOrderItemsDialog: React.FC<Props> = ({ onClose, orderId }) => {
  const { t } = useTranslation()

  const [propertySelected, setPropertySelect] = React.useState(0)
  const [benches, setBenches] = React.useState<SeedlingBench[]>([])

  const { data: properties = [] } = useOwnerProperties()
  const { data: greenhouses = [] } = useGreenhouses({
    select: d => d.filter(gh => gh.type === 'seedling')
  })
  const greenhousesFiltered = React.useMemo(
    () => greenhouses.filter(gh => gh.ownerProperty.property.id === propertySelected) || [],
    [greenhouses, propertySelected]
  )

  const addSeedlingsOrderItems = useAddSeedlingsOrderItems(orderId)

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
    name: 'seedlingsOrderItems',
    control
  })

  const calculateSum = () => {
    const orderItems = getValues('seedlingsOrderItems')
    const total: string = orderItems
      .reduce((prev, next) => prev + next.unityPrice * next.quantity, 0)
      .toFixed(2)
    setOrderSum(total.replace('.', ','))
  }

  console.log(greenhousesFiltered)

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
          return addSeedlingsOrderItems.mutate(values.seedlingsOrderItems, {
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
            <Grid item xs={4}>
              <FormControl fullWidth variant="filled" required>
                <InputLabel id="property-selected">{t('property_plural')}</InputLabel>
                <Select
                  defaultValue={0}
                  onChange={ev => setPropertySelect(ev.target.value as number)}
                  labelId="property-selected"
                  id="property-selected"
                >
                  <MenuItem value={0}>{t('select')}</MenuItem>
                  {properties.map(r => (
                    <MenuItem key={r.id} value={r.id}>
                      {r.property.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth variant="filled" required>
                <InputLabel id="greenhouse-selected">{t('greenhouse_plural')}</InputLabel>
                <Select
                  defaultValue={0}
                  onChange={ev =>
                    setBenches(
                      greenhousesFiltered.find(gh => gh.id === ev.target.value)?.seedlingBenches ||
                        []
                    )
                  }
                  labelId="greenhouse-selected"
                  id="greenhouse-selected"
                >
                  <MenuItem value={0}>{t('select')}</MenuItem>
                  {greenhousesFiltered.map(r => (
                    <MenuItem key={r.id} value={r.id}>
                      {r.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={8} />

            <Grid item xs={12}>
              <Grid container spacing={2} alignItems="center">
                {orderItemsFields.map((field, index) => (
                  <React.Fragment key={field.id}>
                    <Grid item xs={4}>
                      <Controller
                        control={control}
                        name={`seedlingsOrderItems.${index}.seedlingBenchId` as const}
                        defaultValue={field.seedlingBenchId}
                        render={({ field }) => (
                          <FormControl innerRef={field.ref} fullWidth variant="filled" required>
                            <InputLabel id={`seedlingsOrderItems.${index}.seedlingBenchId`}>
                              {t('bench')}
                            </InputLabel>
                            <Select
                              onBlur={field.onBlur}
                              value={field.value}
                              onChange={field.onChange}
                              labelId={`seedlingsOrderItems.${index}.seedlingBenchId`}
                              id={`seedlingsOrderItems.${index}.seedlingBenchId`}
                            >
                              <MenuItem value={0}>{t('select')}</MenuItem>
                              {benches.map(r => (
                                <MenuItem key={r.id} value={r.id}>
                                  B.{r.label}, {r.rootstock.name}
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
                        name={`seedlingsOrderItems.${index}.quantity` as const}
                        defaultValue={field.quantity}
                        render={({ field }) => (
                          <TextField
                            id={`seedlingsOrderItems.${index}.quantity`}
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
                        name={`seedlingsOrderItems.${index}.unityPrice` as const}
                        defaultValue={field.unityPrice}
                        render={({ field }) => (
                          <TextField
                            id={`seedlingsOrderItems.${index}.unityPrice`}
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
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="outlined"
                startIcon={<OrderItemIcon />}
                onClick={() =>
                  appendOrderItem({
                    quantity: 0,
                    unityPrice: 0,
                    seedlingBenchId: 0
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
              addSeedlingsOrderItems.isLoading
            }
            type="submit"
            isLoading={addSeedlingsOrderItems.isLoading}
          >
            {t('save')}
          </LoadingButton>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default AddSeedlingsOrderItemsDialog
