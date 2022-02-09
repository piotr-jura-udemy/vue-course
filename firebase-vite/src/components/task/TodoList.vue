<template>
  <div class="grid grid-cols-1 gap-4 lg:grid-cols-3" v-if="activeProjectId && tasksLeft">
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
  <div
    v-if="!activeProjectId && !tasksLeft"
    class="text-xl text-gray-400 px-2 md:px-1"
  >No active project</div>
  <div v-if="activeProjectId && !tasksLeft" class="text-xl text-gray-400 px-1">No tasks left!</div>
</template>

<script setup>
import { computed, ref, toRef, inject } from "vue"
import { updateTask } from "@/firebase/project"
import TodoListItem from "@/components/task/TodoListItem.vue"

const props = defineProps({
  tasks: Array,
  onlyPending: Boolean,
  projectId: String
})

// Make the projectId from props a ref.
// Otherwise, this would just read the value once
const activeProjectId = toRef(props, "projectId")
const updatingTask = ref(false)
const tasks = inject("tasks")
const displayedTasks = computed(() =>
  [...tasks.value]
    .filter(t => t)
    .sort((a, b) => Number(b.priority) - Number(a.priority))
    .filter((task) => !props.onlyPending || !task.done)
)
const tasksLeft = computed(() => displayedTasks.value.length)

const taskUpdated = async (data, changes) => {
  if (updatingTask.value) { return }

  updatingTask.value = true
  const task = Object.assign(data, changes)
  const payload = {
    projectId: activeProjectId.value,
    task
  }
  await updateTask(payload)
  updatingTask.value = false
}
</script>