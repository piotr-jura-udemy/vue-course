<template>
  <div class="flex items-center">
    <input
      type="checkbox"
      class="flex-none h-4 w-4 text-indigo-600 border-gray-300 rounded mr-2"
      :checked="modelValue"
      @change="onChange"
    />
    <label>
      <slot>Checkbox</slot>
    </label>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["update:modelValue"]);
const onChange = () => emit("update:modelValue", !props.modelValue);
</script>
