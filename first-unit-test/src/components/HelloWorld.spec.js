import { test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import HelloWorld from './HelloWorld.vue'

test('The component can be used', () => {
  expect(HelloWorld).toBeTruthy()
})

test('The component renders welcome message', () => {
  const wrapper = mount(HelloWorld, {
    props: {
      msg: 'This message comes from a test'
    }
  })
  expect(wrapper.text()).toContain(
    'This message comes from a test'
  )
})

test('Counter should be increased when the button is pressed', async () => {
  const wrapper = mount(HelloWorld, {
    props: {
      msg: null
    }
  })
  const button = wrapper.get('button')
  expect(button.text()).toContain(
    'count is: 0'
  )
  await button.trigger('click')
  expect(button.text()).toContain(
    'count is: 1'
  )
})