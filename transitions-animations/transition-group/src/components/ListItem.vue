<template>
  <div class="item">
    {{ item.name }} for {{ item.price }}
  </div>
</template>

<style scoped>
.item {
  border: 1px darkviolet solid;
  padding: 0.5em;
}
</style>

<script setup>
defineProps({ item: Object })
</script>