<template>
  <div>
    <div class="uppercase text:lg md:text-xs text-gray-400 mb-2">Move where?</div>
    <div class="mb-2">
      <div v-for="project in projects" :key="project.id">
        <BaseSmallListButton>→ {{ project.name }}</BaseSmallListButton>
      </div>
    </div>
    <div>
      <BaseTextButton @click="$emit('closed')" color="red">Cancel</BaseTextButton>
    </div>
  </div>
</template>

<script>
import BaseTextButton from "../base/BaseTextButton.vue";
import BaseSmallListButton from "./../base/BaseSmallListButton.vue";

export default {
  components: {
    BaseTextButton,
    BaseSmallListButton,
  },
  inject: ['task', 'projectId'],
  emits: ["closed"],
  computed: mapState({
    projects: (state) => state.projects
  })
};
</script>