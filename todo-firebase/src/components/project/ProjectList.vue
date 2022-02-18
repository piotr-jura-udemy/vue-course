<template>
  <ProjectListItem v-for="project in projects" :project="project" :key="project.id" />
</template>

<script setup>
import ProjectListItem from "./ProjectListItem.vue";

defineProps({
  projects: Array,
});
</script>
