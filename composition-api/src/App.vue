<script>
import { ref, computed, watch, reactive } from "vue"

let timeout = null

export default {
  setup() {
    const currentBalance = ref(0)
    const inUSD = computed(
      () => (currentBalance.value * 1.14).toFixed(2)
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
    watch(history.value, () => console.log(`New history entry added - store it somewhere...`))
    watch(() => exchangeRecords.highestBalance, () => console.log(`Record changed, save it somewhere...`));

    return {
      currentBalance,
      inUSD,
      sessionCounter,
      history,
      exchangeRecords
    }
  }
}
</script>

<template>
  <div>Money in bank? {{ currentBalance }} 💶</div>
  <div>This means (🇺🇸) {{ inUSD }} 💵</div>
  <div>
    <input type="text" v-model.number="currentBalance" />
  </div>
</template>
