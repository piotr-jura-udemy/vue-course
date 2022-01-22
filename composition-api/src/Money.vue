<script>
console.log(`Im the script`)
</script>

<script setup>
console.log(`Im the script-setup`)
import { computed, toRefs } from "vue"
// import { useStore } from "vuex"
import { useRate } from "./composables/useRate"

const CURRENCY = {
  USD: '💵',
  EUR: '💶'
}

const props = defineProps(["currency", "balance"])
const emit = defineEmits(["updated"])

const { balance } = toRefs(props)
// const store = useStore()
// const rate = computed(() => store.state.rate)
const { rate } = useRate()
const formatted = computed(
  () => Number(balance.value).toFixed(2)
)
const pressed = () => emit("updated", 100)
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