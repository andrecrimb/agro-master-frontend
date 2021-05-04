export type Dialog = {
  id?: number
  title?: string
  message: string
  closeButton?: {
    text: string
    onClick?: () => void
  }
  confirmationButton?: {
    text: string
    onClick: () => Promise<any> | void
  }
}
