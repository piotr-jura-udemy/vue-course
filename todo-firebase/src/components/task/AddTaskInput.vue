<template>
  <input
    type="text"
    ref="input"
    placeholder="Enter task and hit enter"
    @keyup.enter="add"
    v-model="task"
    class="block w-full rounded-md shadow-sm text-lg p-4"
  />
</template>

<script setup>
import { ref, onMounted } from "vue";
const emit = defineEmits(["added"]);
const task = ref("");
const add = () => {
  emit("added", task.value);
  task.value = "";
};
const input = ref(null);
onMounted(() => input.value.focus());
</script>
