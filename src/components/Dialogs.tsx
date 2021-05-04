import React from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@material-ui/core'
import styled from '../styledComponents'
import LoadingButton from './LoadingButton'
import { useTranslation } from 'react-i18next'
import useDialogs from 'hooks/useDialogs'
import useDialog from 'hooks/useDialog'

const CloseDialogsButton = styled(Button)`
  && {
    position: fixed;
    bottom: 4%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 9999;
    opacity: 0.6;
  }
`

const Dialogs: React.FC = () => {
  const { t } = useTranslation()
  const { closeAllDialogs, closeDialog } = useDialog()
  const dialogs = useDialogs()
  const [loading, setLoading] = React.useState(false)

  return (
    <>
      {dialogs.map((d, index) => (
        <Dialog
          key={d.id}
          hideBackdrop={index !== dialogs.length - 1}
          open={true}
          onClose={() => closeDialog(Number(d.id))}
          aria-labelledby="dialog-title"
        >
          {d.title ? <DialogTitle id="dialog-title">{d.title}</DialogTitle> : null}
          <DialogContent>
            <DialogContentText>{d.message}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => {
                d.closeButton?.onClick?.()
                closeDialog(Number(d.id))
              }}
            >
              {d.closeButton?.text ?? t('cancel')}
            </Button>
            <LoadingButton
              onClick={async () => {
                if (d.confirmationButton?.onClick) {
                  try {
                    setLoading(true)
                    await d.confirmationButton?.onClick()
                  } finally {
                    setLoading(false)
                  }
                }
                closeDialog(Number(d.id))
              }}
              disabled={loading && index === dialogs.length - 1}
              isLoading={loading && index === dialogs.length - 1}
              variant="contained"
              color="primary"
            >
              {d.confirmationButton?.text}
            </LoadingButton>
          </DialogActions>
        </Dialog>
      ))}
      {dialogs.length > 16 && (
        <CloseDialogsButton onClick={() => closeAllDialogs()} variant="outlined">
          {t('closeAllDialogs')}
        </CloseDialogsButton>
      )}
    </>
  )
}

export default Dialogs
