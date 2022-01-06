<script>
const CURRENCY = {
  USD: '💵',
  EUR: '💶'
}

export default {
  props: ["currency", "balance"],
  setup(props) {
    console.log(props)
    return { CURRENCY }
  }
}
</script>

<template>
  <div>Cash in {{ currency }}: {{ balance }} {{ CURRENCY[currency] }}</div>
</template>