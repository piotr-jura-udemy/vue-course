<template>
  <div class="p-4 border-t border-gray-100 flex">
    <Transition mode="out-in" name="fade-02">
      <div v-if="!showMenu">
        <BaseTextButton @click="toggleMenu" class="mr-2"
          color="indigo">Move</BaseTextButton>
        <BaseTextButton color="red" @click="taskRemoved">
          Delete</BaseTextButton>
      </div>

      <TodoListItemMenuMove v-else @closed="toggleMenu" />
    </Transition>
  </div>
</template>

<script setup>
import BaseTextButton from "./../base/BaseTextButton.vue";
import TodoListItemMenuMove from "./TodoListItemMenuMove.vue";
import { ref, inject } from "vue";
import { deleteTask } from "./../../firebase/project"

const showMenu = ref(false);
const toggleMenu = () => (showMenu.value = !showMenu.value);

const task = inject("task");
const projectId = inject("projectId");

const taskRemoved = () => deleteTask(
  projectId, task.id
)

</script>