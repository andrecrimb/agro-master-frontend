import { useContext } from 'react'
import { DialogsContext } from 'contexts/DialogsContext'

const useDialogs = () => useContext(DialogsContext)

export default useDialogs
