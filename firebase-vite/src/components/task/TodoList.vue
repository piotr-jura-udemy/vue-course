<template>
  <div class="grid grid-cols-1 gap-4 lg:grid-cols-3">
    <TodoListItem
      v-for="task in displayedTasks"
      :task="task"
      :project-id="projectId"
      :key="task.id"
      :done="task.done"
      :priority="task.priority"
      @update:done="taskUpdated(task, { done: $event })"
      @update:priority="taskUpdated(task, { priority: $event })"
    />
  </div>
</template>

<script setup>
import { watch, computed, onBeforeUnmount } from "vue"
import { useStore } from "vuex"
import { useProjectTasks, updateTask } from "./../../firebase"
import TodoListItem from "./TodoListItem.vue"
import {
  SET_TASKS
} from "./../../store/mutation-types"

const props = defineProps({
  onlyPending: Boolean,
  projectId: String
})
const store = useStore()

const tasks = computed(() => store.state.project.tasks)
const activeProjectId = computed(() => props.projectId)
let beforeUnmountHandler = () => { }

onBeforeUnmount(() => {
  console.log(`TodoList: unmounted!`)
  beforeUnmountHandler()
})

watch(activeProjectId, (projectId, oldProjectId) => {
  if (projectId === oldProjectId || projectId === undefined) {
    return
  }

  console.log('TodoList: Project id changed!')
  const { taskList, unsubProjectTasks } = useProjectTasks(projectId)
  beforeUnmountHandler = unsubProjectTasks

  watch(taskList, (tasks) => {
    store.commit(`project/${SET_TASKS}`, tasks)
  })
})

const displayedTasks = computed(() =>
  [...tasks.value]
    .sort((a, b) => Number(b.priority) - Number(a.priority))
    .filter((task) => !props.onlyPending || !task.done)
)

import { UPDATE_TASK } from "./../../store/mutation-types"

const taskUpdated = async (data, changes) => {
  console.log(`TodoList: task updated`)
  const task = Object.assign(data, changes)
  const payload = {
    projectId: activeProjectId.value,
    task
  }
  await updateTask(payload)
  store.commit(`project/${UPDATE_TASK}`, payload)
}
</script>