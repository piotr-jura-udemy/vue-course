import { test, expect, beforeEach } from 'vitest'

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

test('Checking some objects', () => {
  const object1 = {
    name: 'Piotr',
    type: 'Instructor',
    grade: 1
  }
  const object2 = {
    name: 'Piotr',
    grade: 1,
    type: 'Instructor',
  }

  const subset = {
    type: 'Instructor'
  }

  expect(object1).toEqual(object2)
  expect(object1).toMatchObject(subset)
})

test('Testing arrays', () => {
  expect([1, 2]).toEqual([1, 2])
  expect([1, 2, 3]).toContain(2)
})

let fakeData = [2, 1, 3]

beforeEach(() => {
  fakeData = [2, 1, 3]
})

test('Item is removed from array', () => {
  const value = fakeData.shift()
  expect(value).toBe(2)
  expect(fakeData).toHaveLength(2)
})

test('Test the basic array', () => {
  expect(fakeData).toHaveLength(3)
})