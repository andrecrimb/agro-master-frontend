export type Dictionary<T> = {
  [key: string]: T
}

export type TabItem = {
  label: string
  component: React.ReactNode
}

export type DrawerState = {
  type: DrawerType | null
  id: number | null
  open: boolean
}

export type DrawerType =
  | 'user'
  | 'property'
  | 'customer'
  | 'fruitOrder'
  | 'seedOrder'
  | 'seedlingOrder'
  | 'rootstockOrder'
  | 'borbulhaOrder'
