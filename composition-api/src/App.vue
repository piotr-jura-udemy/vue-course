<script>
import { ref, computed } from "vue"
const START_FROM = 10
export default {
  // data() {
  //   return {
  //     counter: 0
  //   }
  // },
  // computed: {
  //   multiplied() {
  //     return this.counter * 10;
  //   }
  // },
  setup() {
    const counter = ref(0)
    const multiplied = computed(
      () => counter.value * 10
    )
    const increase = () => counter.value++
    return {
      counter, multiplied, START_FROM,
      increase
    }
  }
}
</script>

<template>
  <div>Hello! {{ counter }}</div>
  <button @click="increase">Increase</button>
</template>
