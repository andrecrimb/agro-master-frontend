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

export type FruitsOrderItem = {
  id: number
  orderId: number
  name: string
  quantity: number
  boxPrice: number
}

export type FruitsOrder = {
  id: number
  type: OrderType
  orderDate: string
  deliveryDate: string
  nfNumber: string
  installmentsNumber: number
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
  fruitOrderItems: FruitsOrderItem[]
}

export type AddFruitOrderRequest = {
  type: OrderType
  orderDate: string
  deliveryDate: string
  nfNumber: string
  installmentsNumber: number
  customerPropertyId: number
  payments: {
    amount: number
    method: PaymentMethod
    scheduledDate: Date
    received: boolean
  }[]
  fruitOrderItems: {
    name: string
    quantity: number
    boxPrice: number
  }[]
}
