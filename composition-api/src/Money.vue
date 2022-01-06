<script>
import { computed, toRefs } from "vue"
const CURRENCY = {
  USD: '💵',
  EUR: '💶'
}

export default {
  props: ["currency", "balance"],
  setup(props) {
    console.log(props)
    const { balance } = toRefs(props)
    // const balance = ref(props.balance)
    const formatted = computed(
      () => Number(balance.value).toFixed(2)
    )
    return { CURRENCY, formatted }
  }
}
</script>

<template>
  <div>Cash in {{ currency }}: {{ formatted }} {{ CURRENCY[currency] }}</div>
</template>