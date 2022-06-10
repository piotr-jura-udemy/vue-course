import { test, expect } from 'vitest'
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