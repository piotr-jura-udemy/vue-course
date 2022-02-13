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

<script>
import BaseTextButton from "../base/BaseTextButton.vue";
import BaseSmallListButton from "./../base/BaseSmallListButton.vue";
import { mapState, mapActions } from "vuex";
import { MOVE_TASK } from "./../../store/actions-types";

export default {
  components: {
    BaseTextButton,
    BaseSmallListButton,
  },
  inject: ["task", "projectId"],
  emits: ["closed"],
  methods: {
    ...mapActions('project', [MOVE_TASK]),
    taskMoved(toProjectId) {
      this[MOVE_TASK]({
        taskId: this.task.id,
        fromProjectId: this.projectId,
        toProjectId
      });
      this.$emit("closed");
    }
  },
  computed: mapState({
    projects(state) {
      return state.project.projects.filter(
        project => project.id !== this.projectId
      );
    }
  })
};
</script>