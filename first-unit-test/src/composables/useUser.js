import { ref, onMounted } from 'vue'

const fetchGitHubProfileIntoRef = async (user) => {
  const response = await fetch(
    'https://api.github.com/users/piotr-jura-udemy'
  )
  user.value = await response.json();
}

export const useUser = () => {
  const user = ref(null)
  onMounted(() => fetchGitHubProfileIntoRef(user))
  return { user }
}

export const useUserSimple = (username) => {
  const user = ref(null)
  const loadUser = async () => fetchGitHubProfileIntoRef(user)

  return {
    user, loadUser
  }
}