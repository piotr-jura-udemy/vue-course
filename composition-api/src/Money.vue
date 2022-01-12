<script>
import { computed, toRefs } from "vue"
import { useStore } from "vuex"
const CURRENCY = {
  USD: '💵',
  EUR: '💶'
}

export default {
  props: ["currency", "balance"],
  emits: ["updated"],
  setup(props, { emit }) {
    const { balance } = toRefs(props)
    const store = useStore()
    const rate = computed(() => store.state.rate)
    const formatted = computed(
      () => Number(balance.value).toFixed(2)
    )
    const pressed = () => emit("updated", 100)
    return { CURRENCY, formatted, pressed, rate }
  }
}
</script>

<template>
  <div>Cash in {{ currency }}: {{ formatted }} {{ CURRENCY[currency] }}</div>
  <div>
    <small>(The current rate is {{ rate }})</small>
  </div>
  <div>
    <button @click="pressed">Emit!</button>
  </div>
</template>