export type Login = {
  email: string
  password: string
}

export type User = {
  id: number
  createdAt: string
  updatedAt: string
  firstName: string
  lastName: string
  nickname: string
  email: string
  password: string
  isSuperuser: boolean
  isEmployee: boolean
  active: boolean
}
