import {
  InputLeftElement,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react'

import { CurrencyType } from './types'

interface Props {
  currency: CurrencyType
  value: string | number
  onChange: (value: string) => void
}

export const format = (value: string, precision?: number): string | number => {
  if (!precision || !value) {
    return value
  }

  const decs = value?.split('.')

  if (!decs || !decs[1]) {
    return value
  }

  if (decs[1].length > precision) {
    return +Number(value).toFixed(precision)
  }

  return value
}
const step = (precision?: number) => (precision && 1 / 10 ** precision) || 0.01

export default function AmountField({ value, onChange, currency }: Props): React.ReactElement {
  return (
    <NumberInput value={value} clampValueOnBlur={false} onChange={onChange} step={step(currency.precision)} size="lg">
      <InputLeftElement pointerEvents="none" color="gray.300" fontSize="1.2em">
        {currency.symbol}
      </InputLeftElement>
      <NumberInputField pl="2.5rem" pr="2.5rem" placeholder={currency.placeholder} />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>
  )
}
