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
// import { useStore } from "vuex"
import BaseTextButton from "./../base/BaseTextButton.vue"
import TodoListItemMenuMove from "./TodoListItemMenuMove.vue"
// import { REMOVE_TASK } from "./../../store/mutation-types"
import { deleteTask } from "./../../firebase"

// const store = useStore()
const task = inject("task")
const projectId = inject("projectId")
const showMenu = ref(false)
const taskRemoved = async () => {
  await deleteTask({ projectId: projectId, taskId: task.id })
  // store.commit(`project/${REMOVE_TASK}`, {
  //   taskId: task.id,
  //   projectId: projectId,
  // })
}
const toggleMenu = () => (showMenu.value = !showMenu.value)
</script>
