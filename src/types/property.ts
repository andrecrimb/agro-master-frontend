export type Property = {
  id: number
  producerName: string
  name: string
  cnpj: string
  cpf: string
  ie: string
  address: string
  zip: string
  city: string
  state: string
  country: string
}

export type OwnerProperty = {
  id: number
  property: Property
}
