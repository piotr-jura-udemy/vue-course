<template>
  <ProjectAdd />
  <ProjectListItem v-for="project in projects" :project="project" :key="project.id" />
</template>

<script setup>
import ProjectListItem from "./ProjectListItem.vue"
import ProjectAdd from "./ProjectAdd.vue"

defineProps({
  projects: Array,
});
</script>
