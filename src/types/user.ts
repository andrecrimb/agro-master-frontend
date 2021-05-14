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
}

export type User = AuthUser

export type AddUserRequest = {
  firstName: string
  lastName: string
  nickname: string
  email: string
  password: string
  isSuperuser: boolean
  isEmployee: boolean
  active: boolean
  phoneNumbers?: {
    label: string
    number: string
  }[]
}
