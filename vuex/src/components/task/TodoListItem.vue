<template>
  <div
    class="bg-white shadow-sm rounded-md text-gray-700 flex flex-col"
    :class="{ 'opacity-25 line-through': task.done }"
  >
    <div class="p-4 border-b border-gray-100">{{ task.description }}</div>
    <div class="p-4 bg-white flex-grow">
      <BaseCheckbox
        class="mb-2"
        @update:model-value="$emit('update:done', $event)"
        :model-value="done"
      >Done</BaseCheckbox>
      <BaseCheckbox
        @update:model-value="$emit('update:priority', $event)"
        :model-value="priority"
      >Prioritized</BaseCheckbox>
    </div>
    <TodoListItemMenu />
  </div>
</template>

<script>
import BaseCheckbox from "../base/BaseCheckbox.vue";
import TodoListItemMenu from "./TodoListItemMenu.vue";
import { computed } from "vue";

export default {
  components: {
    BaseCheckbox,
    TodoListItemMenu
  },
  props: {
    task: {
      type: Object,
      required: true,
    },
    projectId: Number,
    done: Boolean,
    priority: Boolean,
  },
  provide() {
    return {
      task: computed(() => this.task),
      projectId: computed(() => this.projectId)
    }
  },
  emits: ["update:done", "update:priority"],
};
</script>
