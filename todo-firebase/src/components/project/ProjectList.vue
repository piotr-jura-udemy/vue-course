<template>
  <TransitionGroup name="fade-02">
    <ProjectListItem v-for="project in projects"
      :project="project" :key="project.id" />
  </TransitionGroup>
</template>

<script setup>
import ProjectListItem from "./ProjectListItem.vue";

defineProps({
  projects: Array,
});
</script>
