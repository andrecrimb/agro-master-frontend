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
  Box
} from '@material-ui/core'
import { AddRounded as AddIcon } from '@material-ui/icons'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import LoadingButton from 'components/LoadingButton'
import useAddRootstock from 'hooks/useAddRootstock'

const FORM_DEFAULT_VALUES = { name: '' }

const AddRootstockButtonDialog: React.FC = () => {
  const { t } = useTranslation()
  const [open, setOpen] = React.useState(false)

  const addNewRootstock = useAddRootstock()

  const { handleSubmit, register, formState, setError, reset } = useForm<
    typeof FORM_DEFAULT_VALUES
  >({
    defaultValues: FORM_DEFAULT_VALUES
  })

  React.useEffect(() => {
    reset(FORM_DEFAULT_VALUES)
  }, [open === false])

  const { ref: nameRef, ...name } = register('name')

  return (
    <>
      <IconButton color="inherit" onClick={() => setOpen(true)}>
        <AddIcon />
      </IconButton>
      {open ? (
        <Dialog
          open={open}
          maxWidth="sm"
          onClose={() => setOpen(false)}
          aria-labelledby="dialog-title"
        >
          <DialogTitle id="dialog-title">{t('add_new_rootstock')}</DialogTitle>
          <form
            onSubmit={handleSubmit(values => {
              return addNewRootstock.mutate(values, {
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
                  addNewRootstock.isLoading
                }
                type="submit"
                isLoading={addNewRootstock.isLoading}
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

export default AddRootstockButtonDialog
