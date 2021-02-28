import { Stack } from '@chakra-ui/react'

import { Rates } from 'hooks/rates'
import Pair from './pair'
import { PAIRS } from './config'

interface Props {
  rates: Rates
}

export default function ExchangeRates({ rates }: Props): React.ReactElement {
  return (
    <Stack spacing={16}>
      {PAIRS.map((pair) => {
        const rate = Number(rates[pair[1].id]?.last)

        if (Number.isNaN(rate)) {
          return null
        }

        return <Pair key={`${pair[0].id}_${pair[1].id}`} pair={pair} rate={rate} />
      })}
    </Stack>
  )
}
