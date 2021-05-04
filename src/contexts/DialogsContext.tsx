import React, { PropsWithChildren } from 'react'
import { Dialog } from 'types/dialog'

const DialogsContext = React.createContext<Dialog[]>([])
const DialogsActionsContext = React.createContext<any>(undefined)

const DialogsProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const [dialogs, setDialog] = React.useState<Dialog[]>([])
  return (
    <DialogsContext.Provider value={dialogs}>
      <DialogsActionsContext.Provider value={setDialog}>{children}</DialogsActionsContext.Provider>
    </DialogsContext.Provider>
  )
}

export { DialogsProvider, DialogsContext, DialogsActionsContext }
