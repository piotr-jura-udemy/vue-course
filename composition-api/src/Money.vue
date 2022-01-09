<script>
import { computed, toRefs } from "vue"
const CURRENCY = {
  USD: '💵',
  EUR: '💶'
}

export default {
  props: ["currency", "balance"],
  emits: ["updated"],
  setup(props, { emit }) {
    const { balance } = toRefs(props)
    const formatted = computed(
      () => Number(balance.value).toFixed(2)
    )
    const pressed = () => emit("updated", 100)
    return { CURRENCY, formatted, pressed }
  }
}
</script>

<template>
  <div>Cash in {{ currency }}: {{ formatted }} {{ CURRENCY[currency] }}</div>
  <div>
    <button @click="pressed">Emit!</button>
  </div>
</template>