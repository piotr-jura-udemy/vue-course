import { ref } from 'vue'

export const useUserSimple = (username) => {
  const user = ref(null)
  const loadUser = async () => {
    const response = await fetch(
      'https://api.github.com/users/piotr-jura-udemy'
    )
    user.value = await response.json();
  }

  return {
    user, loadUser
  }
}