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
  Tooltip,
  Box
} from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import LoadingButton from 'components/LoadingButton'
import { useHistory } from 'react-router-dom'
import { muiTheme } from 'theme'
import routes from 'routes'
import useRootstocks from 'hooks/useRootstocks'
import useEditRootstock from 'hooks/useEditRootstock'
import useDeleteRootstock from 'hooks/useDeleteRootstock'
import { Delete as DeleteIcon } from '@material-ui/icons'
import useDialog from 'hooks/useDialog'

const FORM_DEFAULT_VALUES = { name: '' }

const EditUserDialog: React.FC = () => {
  const { t } = useTranslation()
  const history = useHistory()
  const { newDialog } = useDialog()

  const rootstockId = +history.location.pathname.replace(`${routes.rootstocks}/`, '')
  const { data: rootstockSelected } = useRootstocks({
    select: d => d.find(rootstock => rootstock.id === rootstockId)
  })

  const editRootstock = useEditRootstock()
  const deleteRootstock = useDeleteRootstock()

  const { handleSubmit, register, formState, setError, reset } = useForm<
    typeof FORM_DEFAULT_VALUES
  >({
    defaultValues: FORM_DEFAULT_VALUES
  })

  const { ref: nameRef, ...name } = register('name')

  const onClose = () => history.push(routes.rootstocks)

  React.useEffect(() => {
    if (rootstockSelected) {
      reset(rootstockSelected)
    }
  }, [rootstockSelected === undefined])

  return (
    <Dialog open maxWidth="sm" onClose={onClose} aria-labelledby="dialog-title">
      <DialogTitle id="dialog-title">
        {t('edit_rootstock')} |{' '}
        <span style={{ color: muiTheme.palette.primary.main }}>{rootstockSelected?.name}</span>
      </DialogTitle>
      {rootstockSelected ? (
        <form
          onSubmit={handleSubmit(values => {
            return editRootstock.mutate(
              { id: rootstockId, data: values },
              {
                onSuccess: () => {
                  onClose()
                },
                onError: e => {
                  const apiErrors = e?.response?.data.errors || []
                  for (const apiError of apiErrors) {
                    setError(apiError.param, { message: apiError.msg })
                  }
                }
              }
            )
          })}
        >
          <DialogContent>
            <Box minWidth="360px">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoFocus
                    id="name"
                    type="text"
                    size="small"
                    fullWidth
                    required
                    variant="filled"
                    error={!!formState.errors.name}
                    helperText={t(formState.errors.name?.message || '')}
                    label={t('name')}
                    inputRef={nameRef}
                    {...name}
                  />
                </Grid>
              </Grid>
            </Box>
          </DialogContent>
          <DialogActions>
            <Tooltip title={t('delete_rootstock') + ''} arrow placement="left">
              <IconButton
                onClick={() =>
                  newDialog({
                    title: t('warning') + '!',
                    message: t('delete_question', { item: rootstockSelected.name }),
                    confirmationButton: {
                      text: t('delete'),
                      onClick: () =>
                        deleteRootstock.mutateAsync(
                          { rootstockId: rootstockSelected.id },
                          { onSuccess: () => onClose() }
                        )
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
                editRootstock.isLoading
              }
              type="submit"
              isLoading={editRootstock.isLoading}
            >
              {t('save')}
            </LoadingButton>
          </DialogActions>
        </form>
      ) : null}
    </Dialog>
  )
}

export default EditUserDialog
