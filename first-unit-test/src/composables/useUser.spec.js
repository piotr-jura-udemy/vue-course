import { test, expect, vi } from 'vitest'
import { useUserSimple } from './useUser'
import nodeFetch from 'node-fetch'

window.fetch = nodeFetch

test('Test simple composable by calling it directly', async () => {
  const { user, loadUser } = useUserSimple('piotr-jura-udemy')
  expect(user.value).toBe(null)
  await loadUser()
  expect(user.value).toHaveProperty('name', 'Piotr Jura')
  expect(user.value).toHaveProperty('id', 39863283)
})

const realTaxRule = (amount) => {
  if (amount < 100) {
    return 0.05
  } else if (amount >= 100 && amount < 200) {
    return 0.10
  } else {
    return 0.20
  }
}
const calculator = {
  tax: (amount, taxRuleFunc) => {
    console.log('Original tax() called: ')

    if (amount === 0) {
      return 0
    }

    return taxRuleFunc(amount) * amount
  },
}

test('Test the calculator without mocking', () => {
  const tax = calculator.tax(100, realTaxRule)
  expect(tax).toBe(10)
})

test('Test the calcultor using mocks', () => {
  const mock = vi.fn().mockReturnValue(0.19)
  expect(calculator.tax(100, mock)).toBe(19)
})