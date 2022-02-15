<template>
  <div>
    <div class="uppercase text:lg md:text-xs text-gray-400 mb-2">Move where?</div>
    <div class="mb-2">
      <div v-for="project in projects" :key="project.id">
        <BaseSmallListButton @click="taskMoved(project.id)">→ {{ project.name }}</BaseSmallListButton>
      </div>
    </div>
    <div>
      <BaseTextButton @click="$emit('closed')" color="red">Cancel</BaseTextButton>
    </div>
  </div>
</template>

<script setup>
import { defineEmits, computed, inject } from "vue";
import { useStore } from "vuex";
import BaseTextButton from "../base/BaseTextButton.vue";
import BaseSmallListButton from "./../base/BaseSmallListButton.vue";
import { MOVE_TASK } from "./../../store/actions-types";

const task = inject("task");
const projectId = inject("projectId");
const emit = defineEmits(["closed"]);
const store = useStore();
const taskMoved = (toProjectId) => {
  store.dispatch(`project/${MOVE_TASK}`, {
    taskId: task.id,
    fromProjectId: projectId,
    toProjectId,
  });
  emit("closed");
};
const projects = computed(() =>
  store.state.project.projects.filter((project) => project.id !== projectId)
);
</script>
