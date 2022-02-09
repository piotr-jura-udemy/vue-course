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
import { ref, inject } from "vue"
import BaseTextButton from "@/components/base/BaseTextButton.vue"
import TodoListItemMenuMove from "@/components/task/TodoListItemMenuMove.vue"
import { deleteTask } from "@/firebase/project"

const task = inject("task")
const projectId = inject("projectId")
const showMenu = ref(false)
const taskRemoved = async () => {
  await deleteTask({ projectId: projectId, taskId: task.id })
}
const toggleMenu = () => (showMenu.value = !showMenu.value)
</script>
