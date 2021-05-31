export type Dictionary<T> = {
  [key: string]: T
}

export type TabItem = {
  label: string
  component: React.ReactNode
}
