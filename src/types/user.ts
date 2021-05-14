export type Login = {
  email: string
  password: string
}

export type AuthUser = {
  id: number
  firstName: string
  lastName: string
  nickname: string
  email: string
  password: string
  isSuperuser: boolean
  isEmployee: boolean
  active: boolean
  phoneNumbers?: {
    id: number
    number: string
    label: string
  }[]
}

export type User = AuthUser
