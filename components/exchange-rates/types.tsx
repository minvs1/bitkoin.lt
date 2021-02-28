export interface CurrencyType {
  id: string
  placeholder: string
  precision: number
  symbol: string
}

export type Pair = [CurrencyType, CurrencyType]
