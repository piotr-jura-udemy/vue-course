import { test, expect } from 'vitest'

test('2+2=4', () => {
  expect(2 + 2).toBe(4)
})

const iAmHere = null

test('Testing the API', () => {
  // expect(0.2 + 0.1).toBe(0.3)
  expect(0.2 + 0.1).toBeCloseTo(0.3)
  expect(iAmHere).toBeDefined()
  expect('Hello').toBeTruthy()
})

class Example { }
const example = new Example

test('The object is right', () => {
  expect(example).toBeDefined()
  expect(example).toBeInstanceOf(Example)
})
