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
// import { REMOVE_TASK } from "./../../store/mutation-types";
// import { mapMutations } from "vuex";
import { ref, inject } from "vue";

const showMenu = ref(false);
const toggleMenu = () => showMenu.value = !showMenu.value;

const task = inject("task");
const projectId = inject("projectId");

const taskRemoved = () => console.log(`The task ${task.id} was removed from the project ${projectId}`);
</script>