import { Property } from 'types/property'

export type OrderType = 'seed' | 'seedling' | 'rootstock' | 'borbulha' | 'fruit'
export type PaymentMethod = 'money' | 'cheque'
export type OrderStatus = 'issued' | 'canceled'

export type Payment = {
  id: number
  orderId: number
  amount: number
  method: PaymentMethod
  scheduledDate: string
  received: boolean
}

export type FruitOrderItem = {
  id: number
  orderId: number
  name: string
  quantity: number
  boxPrice: number
}

export type SeedOrderItem = {
  id: number
  orderId: number
  name: string
  quantity: number
  kgPrice: number
}

export type RootstockOrderItem = {
  id: number
  orderId: number
  rootstockId: number
  rootstock: { name: string }
  quantity: number
  unityPrice: number
}

export type BorbulhaOrderItem = {
  id: number
  orderId: number
  name: string
  quantity: number
  unityPrice: number
  greenhouseId: number
  greenhouse: {
    label: string
    ownerProperty: { property: { name: string } }
  }
}

export type SeedlingBenchOrderItem = {
  id: number
  orderId: number
  seedlingBenchId: number
  seedlingBench: {
    label: string
    rootstock: { name: string }
    greenhouse: { label: string; ownerPropertyId: number }
  }
  quantity: number
  unityPrice: number
}

export type Order = {
  id: number
  type: OrderType
  orderDate: string
  deliveryDate: string
  nfNumber: string
  status: OrderStatus
  user: { id: number; name: string }
  customerProperty: {
    customer: {
      id: number
      name: string
      nickname: string
    }
    property: Property
  }
  payments: Payment[]
  fruitOrderItems: FruitOrderItem[]
  seedOrderItems: SeedOrderItem[]
  rootstockOrderItems: RootstockOrderItem[]
  borbulhaOrderItems: BorbulhaOrderItem[]
  seedlingBenchOrderItems: SeedlingBenchOrderItem[]
}

export type OrderRequest = {
  id?: number
  type: OrderType
  nfNumber: string
  deliveryDate: string
  orderDate: string
  customerPropertyId: number
}
