<template>
  <div class="p-4 border-t border-gray-100 flex">
    <div v-if="!showMenu">
      <BaseTextButton @click="toggleMenu" class="mr-2" color="indigo">Move</BaseTextButton>
      <BaseTextButton color="red" @click="taskRemoved">Delete</BaseTextButton>
    </div>

    <TodoListItemMenuMove v-else @closed="toggleMenu" />
  </div>
</template>

<script setup>
import BaseTextButton from "./../base/BaseTextButton.vue";
import TodoListItemMenuMove from "./TodoListItemMenuMove.vue";
import { REMOVE_TASK } from "./../../store/mutation-types";
import { ref, inject } from "vue";
import { useStore } from "vuex";

const showMenu = ref(false);
const toggleMenu = () => (showMenu.value = !showMenu.value);

const task = inject("task");
const projectId = inject("projectId");

const store = useStore();
const taskRemoved = () =>
  store.commit(`project/${REMOVE_TASK}`, {
    taskId: task.value.id,
    projectId: projectId.value,
  });
</script>
