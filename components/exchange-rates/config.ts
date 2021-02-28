import { CurrencyType, Pair } from './types'

const BTC: CurrencyType = {
  id: 'BTC',
  placeholder: 'BTC',
  precision: 8,
  symbol: '₿',
}

const USD: CurrencyType = {
  id: 'USD',
  placeholder: 'USD',
  precision: 2,
  symbol: '$',
}

const EUR: CurrencyType = {
  id: 'EUR',
  placeholder: 'EUR',
  precision: 2,
  symbol: '€',
}

export const PAIRS: Pair[] = [
  [BTC, USD],
  [BTC, EUR],
]
