<template>
  <div class="border-b border-gray-200 text-gray-600 mb-4 pb-4">
    <div class="text-base md:text-sm text-gray-500 mt-2 px-2">{{ user?.email ?? 'Loading...' }}</div>

    <div class="text-base md:text-sm text-gray-500 mt-2 px-2">
      <button class="w-full text-left" @click="doLogout">Logout</button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router"
import { user, logout } from "./../../firebase/user"

const router = useRouter()
const doLogout = async () => {
  await logout()
  router.push({ name: 'login' })
}
</script>