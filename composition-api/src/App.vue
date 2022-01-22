<script setup>
import { ref, computed, watch, reactive, onMounted } from "vue"
import Money from "./Money.vue"
// import { useStore } from "vuex"
import { useRate } from "./composables/useRate"

let timeout = null

const { rate, setRate } = useRate()
const currentBalance = ref(0)
const inUSD = computed(
  // () => (currentBalance.value * store.state.rate)
  () => (currentBalance.value * rate.value)
)
const sessionCounter = ref(0)
const history = ref([])
const exchangeRecords = reactive({
  highestBalance: null
})
watch(currentBalance, (newValue, oldValue) => {
  clearTimeout(timeout)
  timeout = setTimeout(() => {
    sessionCounter.value++
    history.value.push(newValue)

    if (currentBalance.value > exchangeRecords.highestBalance) {
      exchangeRecords.highestBalance = currentBalance.value
    }
  }, 500)
})
watch(
  history.value,
  () => console.log(`New history entry added - store it somewhere...`)
)
watch(
  () => exchangeRecords.highestBalance,
  () => console.log(`Record changed, save it somewhere...`)
);
// const store = useStore()
onMounted(
  () => setInterval(
    // () => store.commit('setRate', [1.13, 1.14, 1.15][Math.floor(Math.random() * 3)]),
    () => setRate([1.13, 1.14, 1.15][Math.floor(Math.random() * 3)]),
    1000
  )
)
</script>

<template>
  <Money currency="EUR" :balance="currentBalance" />
  <Money currency="USD" :balance="inUSD" />

  <div>
    <input type="text" v-model.number="currentBalance" />
  </div>
</template>
