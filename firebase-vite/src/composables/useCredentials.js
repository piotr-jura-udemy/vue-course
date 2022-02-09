import { reactive, ref } from "vue"

export const useCredentials = () => {
  const credentials = reactive({
    email: "",
    password: ""
  })
  const error = ref(null)
  const perform = (callback) => async () => {
    try {
      error.value = null
      await callback()
    } catch (e) {
      error.value = e.message
    }
  }

  return { credentials, error, perform }
}