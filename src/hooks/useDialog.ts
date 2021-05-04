import { useContext } from 'react'
import { DialogsActionsContext } from 'contexts/DialogsContext'
import { Dialog } from 'types/dialog'

const useDialog = () => {
  const contextSetAction = useContext(DialogsActionsContext)

  const closeAllDialogs = () => contextSetAction([])

  const closeDialog = (dialogId: number) => {
    return contextSetAction(dialogs => dialogs.filter(d => d.id !== dialogId))
  }

  const newDialog = (dialogItem: Dialog) => {
    return contextSetAction(otherDialogs => [...otherDialogs, { ...dialogItem, id: Date.now() }])
  }

  return { newDialog, closeDialog, closeAllDialogs }
}

export default useDialog
