<template>
  <form @submit.prevent="signup" class="h-full w-full">
    <div class="h-full flex flex-col items-center justify-center text-lg">
      <div
        class="w-4/5 md:w-1/2 mb-4 rounded-md bg-red-50 border border-red-100 p-2"
        v-if="error"
      >{{ error }}</div>
      <div class="w-4/5 md:w-1/2">
        <label for="email-address" class="sr-only">Email address</label>
        <input
          id="email-address"
          name="email"
          type="email"
          autocomplete="email"
          required
          class="appearance-none w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
          placeholder="Email address"
          v-model="credentials.email"
        />
      </div>
      <div class="w-4/5 md:w-1/2 mt-4">
        <label for="password" class="sr-only">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          autocomplete="password"
          required
          class="appearance-none w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
          placeholder="Password"
          v-model="credentials.password"
        />
      </div>

      <div class="w-4/5 md:w-1/2 mt-4">
        <button class="w-full block rounded-md bg-indigo-500 text-white p-2" type="submit">Signup</button>
      </div>

      <div class="w-4/5 md:w-1/2 mt-4 text-center">
        Already have an account?
        <RouterLink :to="{ name: 'login' }" class="text-gray-500 underline">Login</RouterLink>
      </div>
    </div>
  </form>
</template>

<script setup>
import { reactive, ref } from "vue"
import { useRouter, RouterLink } from 'vue-router'
import { createUser } from "./../firebase/user"

const credentials = reactive({
  email: "",
  password: ""
})
const error = ref(null)
const router = useRouter()

const signup = async () => {
  try {
    error.value = null
    await createUser(
      credentials.email, credentials.password
    )
    router.push({ name: 'project' })
  } catch (e) {
    error.value = e.message
  }
}
</script>