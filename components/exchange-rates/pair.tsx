import { useState, useEffect } from 'react'
import { Box, Flex, useMediaQuery } from '@chakra-ui/react'
import { ArrowRightIcon, ArrowLeftIcon } from '@chakra-ui/icons'

import AmountField, { format } from './amount-field'
import { Pair } from './types'

interface Props {
  pair: Pair
  rate: number
}

type FixedSate = 'left' | 'right'
type ValueState = { [K in FixedSate]: string | number }

export default function CurrencyPair({ pair, rate }: Props): React.ReactElement {
  const [leftC, rightC] = pair

  const [value, setValue] = useState<ValueState>({
    left: '1',
    right: `${rate}`,
  })
  const [fixed, setFixed] = useState<FixedSate>('left')
  const [isLargerThan768] = useMediaQuery('(min-width: 768px)')

  const onChange = (side: FixedSate) => (value: string | number) => {
    setFixed(side)

    const val = Number(value)
    let left, right

    if (side === 'left') {
      left = value
      right = `${val * rate}`
    } else {
      left = `${val / rate}`
      right = value
    }

    setValue({ left: format(left, leftC.precision), right: format(right, rightC.precision) })
  }

  useEffect(() => {
    onChange(fixed)(value[fixed])
  }, [rate])

  const rotateDeg = (fixed === 'left' ? 0 : 180) + (isLargerThan768 ? 0 : 90)
  const arrowStyle = {
    margin: '1rem 1.5rem',
    transform: `rotate(${rotateDeg}deg)`,
    transition: 'transform 0.8s',
  }

  return (
    <Flex align="center" direction={isLargerThan768 ? 'row' : 'column'}>
      <Box flex="1">
        <AmountField value={value.left} onChange={onChange('left')} currency={leftC} />
      </Box>
      <ArrowRightIcon sx={arrowStyle} />
      <Box flex="1">
        <AmountField value={value.right} onChange={onChange('right')} currency={rightC} />
      </Box>
    </Flex>
  )
}
