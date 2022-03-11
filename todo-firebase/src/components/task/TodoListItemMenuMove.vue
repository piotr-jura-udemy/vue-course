<template>
  <div>
    <div class="uppercase text:lg md:text-xs text-gray-400 mb-2">Move where?</div>
    <div class="mb-2">
      <div v-for="project in moveToProjects" :key="project.id">
        <BaseSmallListButton @click="taskMoved(project.id)">→ {{ project.name }}</BaseSmallListButton>
      </div>
    </div>
    <div>
      <BaseTextButton @click="$emit('closed')" color="red">Cancel</BaseTextButton>
    </div>
  </div>
</template>

<script setup>
import { computed, inject } from "vue"
import BaseTextButton from "../base/BaseTextButton.vue"
import BaseSmallListButton from "./../base/BaseSmallListButton.vue"
import { moveTask } from "./../../firebase/project"

const task = inject("task")
const projectId = inject("projectId")
const emit = defineEmits(["closed"])
const taskMoved = (toProjectId) => {
  moveTask(projectId, toProjectId, task.id)
  emit("closed")
}
const projects = inject("projects")
const moveToProjects = computed(
  () => projects.value.filter(
    project => project.id !== projectId
  )
)
</script>
