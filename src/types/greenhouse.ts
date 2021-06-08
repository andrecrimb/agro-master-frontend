export type GreenhouseType = 'seedling' | 'borbulha'

export type Greenhouse = {
  id: number
  label: string
  type: GreenhouseType
  ownerProperty: {
    property: {
      name: string
    }
  }
}
