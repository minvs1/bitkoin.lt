import { useState } from 'react'
import useSWR from 'swr'

import { fetcher } from 'utils'

const TICKER_URL = 'https://blockchain.info/ticker'
const TICKER_REFRESH_INTERVAL_MS = 1000

export interface Rates {
  [currency: string]: {
    last: string | number
  }
}

interface RatesHook {
  rates: Rates
  loading: boolean
  error: any
}

export function useRates(): RatesHook {
  const [loading, setLoading] = useState(true)

  const { data, error } = useSWR(TICKER_URL, fetcher, {
    refreshInterval: TICKER_REFRESH_INTERVAL_MS,
    onSuccess: () => setLoading(false),
    onError: () => setLoading(false),
  })

  return { rates: data, loading, error }
}
