<template>
  <button
    class="uppercase font-bold text-lg md:text-xs"
    :class="[`text-${color}-800`]"
    @click="$emit('click')"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: { color: { type: String, default: "grey" } },
  emits: ["click"],
};
</script>