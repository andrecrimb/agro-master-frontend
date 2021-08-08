export type Login = {
  email: string
  password: string
}

export type AuthUser = {
  id: number
  name: string
  email: string
  password: string
  isSuperuser: boolean
  active: boolean
  phoneNumbers?: {
    id: number
    number: string
    label: string
  }[]
}

export type User = AuthUser
