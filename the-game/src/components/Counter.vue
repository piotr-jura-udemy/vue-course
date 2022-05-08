<template>
  <div>Count is {{ store.count }}</div>
  <div>
    <button @click="store.count++">Increase</button>
  </div>
</template>

<script setup>
import { useCounterStore } from './../stores/counter'
const store = useCounterStore()
</script>