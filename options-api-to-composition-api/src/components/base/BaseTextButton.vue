<template>
  <button
    class="uppercase font-bold text-lg md:text-xs"
    :class="[`text-${color}-800`]"
    @click="$emit('click')"
  >
    <slot></slot>
  </button>
</template>

<script setup>
import { defineEmits, defineProps } from "vue";

defineProps({ color: { type: String, default: "grey" } });
defineEmits(["click"]);
</script>
