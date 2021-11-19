<template>
  <div
    @click="activateProject(project.id)"
    class="
      rounded-md
      py-2
      px-2
      text-gray-500
      font-semibold
      flex
      justify-between
      cursor-pointer
    "
    :class="{ 'bg-gray-200': isActive }"
  >
    <div>{{ project.name }}</div>
    <div
      class="
        rounded-lg
        bg-gray-300
        text-gray-800
        px-2
        font-normal
        w-8
        text-center
      "
    >
      {{ project.notDoneCount }}
    </div>
  </div>
</template>

<script>
import { SET_ACTIVE_PROJECT } from "./../store/mutation-types";

export default {
  props: { project: Object },
  computed: {
    isActive() {
      return this.$store.state.activeProjectId === this.project.id;
    },
  },
  methods: {
    activateProject(projectId) {
      this.$store.commit(SET_ACTIVE_PROJECT, projectId);
    },
  },
};
</script>
