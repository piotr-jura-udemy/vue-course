<template>
  <div class="grid grid-cols-1 gap-4 lg:grid-cols-3" v-if="!loadingTasks && displayedTasks.length">
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
  <div v-if="loadingTasks" class="text-xl text-gray-400 px-1">Loading...</div>
  <div
    v-if="!loadingTasks && 0 === displayedTasks.length"
    class="text-xl text-gray-400 px-1"
  >No tasks left!</div>
</template>

<script setup>
import { watch, computed, onBeforeUnmount, ref } from "vue"
import { useStore } from "vuex"
import { useProjectTasks, updateTask } from "./../../firebase/project"
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
  beforeUnmountHandler()
  console.log(`Emptying task list!`)
  store.commit(`project/${SET_TASKS}`, [])
})

const loadingTasks = ref(false)

watch(activeProjectId, (projectId, oldProjectId) => {
  if (projectId === oldProjectId || projectId === undefined) {
    return
  }

  loadingTasks.value = true

  const { taskList, unsubProjectTasks } = useProjectTasks(projectId)
  beforeUnmountHandler = unsubProjectTasks

  watch(taskList, (tasks) => {
    store.commit(`project/${SET_TASKS}`, tasks)
    loadingTasks.value = false
  })
})

const displayedTasks = computed(() =>
  [...tasks.value]
    .filter(t => t)
    .sort((a, b) => Number(b.priority) - Number(a.priority))
    .filter((task) => !props.onlyPending || !task.done)
)

import { UPDATE_TASK } from "./../../store/mutation-types"
const updatingTask = ref(false)

const taskUpdated = async (data, changes) => {
  if (updatingTask.value) { return }

  updatingTask.value = true
  const task = Object.assign(data, changes)
  const payload = {
    projectId: activeProjectId.value,
    task
  }
  await updateTask(payload)
  store.commit(`project/${UPDATE_TASK}`, payload)
  updatingTask.value = false
}
</script>