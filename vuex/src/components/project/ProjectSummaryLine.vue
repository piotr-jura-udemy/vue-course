<template>
  <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
    <div class="bg-white border border-gray-200 rounded-md text-xs md:text-sm p-4">
      <div class="font-semibold text-gray-400">Total</div>
      <div class="font-bold text-3xl mt-1">{{ total }}</div>
    </div>
    <div class="bg-white border border-gray-200 rounded-md text-xs md:text-sm p-4">
      <div class="font-semibold text-gray-400">Completion</div>
      <div class="font-bold text-3xl mt-1">{{ completion }}%</div>
    </div>
    <div class="bg-white border border-gray-200 rounded-md text-xs md:text-sm p-4">
      <div class="font-semibold text-gray-400">Prioritized</div>
      <div class="font-bold text-3xl mt-1">{{ prioritzed }}</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters('project', {
      tasks: "activeProjectTasks",
    }),
    // tasks() {
    //   return this.$store.getters.activeProject?.tasks ?? [];
    // },
    total() {
      return this.tasks.length;
    },
    completion() {
      return Math.ceil(
        (this.tasks.filter((task) => task.done).length / this.total) * 100
      );
    },
    prioritzed() {
      return this.tasks.filter((task) => task.priority).length;
    },
  },
};
</script>
