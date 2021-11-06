<template>
  <div
    class="bg-white shadow-sm rounded-md text-gray-700 text-xs md:text-sm p-4"
    :class="{ 'opacity-25 line-through': task.done }"
  >
    <div>{{ task.description }}</div>
    <div class="py-4 bg-white">
      <BaseCheckbox
        class="mb-2"
        @update:model-value="$emit('update:done', $event)"
        :model-value="done"
        >Done</BaseCheckbox
      >
      <BaseCheckbox
        @update:model-value="$emit('update:priority', $event)"
        :model-value="priority"
        >Prioritized</BaseCheckbox
      >
    </div>
  </div>
</template>

<script>
import BaseCheckbox from "./BaseCheckbox.vue";

export default {
  components: {
    BaseCheckbox,
  },
  props: {
    task: {
      type: Object,
      required: true,
    },
    done: Boolean,
    priority: Boolean,
  },
  emits: ["update:done", "update:priority"],
};
</script>
