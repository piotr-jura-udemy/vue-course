<template>
  <form @submit.prevent="submit">
    <div>
      <input name="username" type="text"
        v-model="username" />
    </div>
    <div>
      <input name="password" type="password"
        v-model="password" />
    </div>
    <div id="submitted" v-if="submitted">
      Data is OK!
    </div>
    <div>
      <button type="submit">Submit</button>
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue'
const username = ref('')
const password = ref('')
const submitted = ref(false)

const submit = () => {
  if (username.value && password.value) {
    submitted.value = true
  }
}
</script>