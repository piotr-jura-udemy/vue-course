<template>
  <ProjectListItem
    v-for="project in projects"
    :project="project"
    :active-id="userProfile.activeProjectId"
    :key="project.id"
  />
</template>

<script setup>
import ProjectListItem from "./ProjectListItem.vue"
import { useQueryUserProfile } from "./../../firebase/user"

defineProps({
  projects: Array,
})

const userProfile = useQueryUserProfile()
</script>
