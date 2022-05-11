<template>
  <h2>🏆 Hall of Fame</h2>
  <div v-for="score in store.sortedByBest"
    :key="score.when">
    <div>Points {{ score.score }}, scored
      {{ score.when.toUTCString() }}</div>
  </div>
</template>

<script setup>
import { useCounterStore } from './../stores/counter'
const store = useCounterStore()
</script>