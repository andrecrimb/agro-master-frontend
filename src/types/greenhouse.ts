export type GreenhouseType = 'seedling' | 'borbulha'

export type SeedlingBench = {
  id: number
  updatedAt: string
  label: string
  quantity: number
  lastPlantingDate: string
  firstPaymentDate: string
  rootstock: { name: string; id: number }
  user: { name: string; id: number }
  greenhouseId: number
}

export type Greenhouse = {
  id: number
  label: string
  type: GreenhouseType
  ownerProperty: {
    property: {
      id: number
      name: string
    }
  }
  seedlingBenches: SeedlingBench[]
}

export type ApiFilters = { ownerPropertyId?: number }
