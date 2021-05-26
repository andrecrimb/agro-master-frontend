export type Customer = {
  id: number

  firstName: string
  lastName: string
  nickname: string
  active: boolean

  address: string
  zip: string
  city: string
  state: string
  country: string

  phoneNumbers?: {
    id: number
    number: string
    label: string
  }[]
}
