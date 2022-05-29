import { test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Form from './Form.vue'

test('The component can be used', () => {
  expect(Form).toBeTruthy()
})

document.body.innerHTML = `<div id="app"></div>`

test('The firm is being rendered and can be submitted', async () => {
  const wrapper = mount(Form, {
    attachTo: document.getElementById('app')
  })
  const username = wrapper.get('input[name="username"]')
  const password = wrapper.get('input[name="password"]')
  const button = wrapper.get('button[type="submit"]')

  expect(username.element.value).toBe('')
  expect(password.element.value).toBe('')

  username.setValue('test')
  password.setValue('test')

  expect(wrapper.find('#submitted').exists()).toBe(false)
  await button.trigger('click')
  expect(wrapper.emitted()).toHaveProperty('submit')
  expect(wrapper.find('#submitted').exists()).toBe(true)
})