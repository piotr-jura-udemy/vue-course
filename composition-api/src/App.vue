<script>
import { ref, computed, reactive } from "vue"
const START_FROM = 10
export default {
  setup() {
    const counter = ref(0)
    const multiplied = computed(
      {
        get() {
          return counter.value * 10
        },
        set(newValue) {
          console.log(`Setter was called with ${newValue}`)
        }
      }
    )
    // multiplied.value = 10
    const x2 = computed(
      () => multiplied.value * counter.value + xxx.counter
    )
    const xxx = reactive({
      counter: 10
    })
    const ra = ref([1, 2, 3])
    const replaceArray = () => ra.value = [4, 5, 6]
    const increase = () => counter.value++
    return {
      counter, multiplied, START_FROM,
      increase, xxx, replaceArray, ra,
      x2
    }
  }
}
</script>

<template>
  <div>Hello! {{ counter }}</div>
  <button @click="increase">Increase</button>

  <button @click="replaceArray">Replace</button>

  <div>{{ xxx.counter }}</div>
  <div>{{ ra }}</div>
</template>
