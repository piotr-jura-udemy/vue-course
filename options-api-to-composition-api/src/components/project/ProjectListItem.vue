<template>
  <div
    @click="activateProject(project.id)"
    class="rounded-md py-2 px-2 text-gray-500 font-semibold flex justify-between cursor-pointer"
    :class="{ 'bg-gray-200': isActive }"
  >
    <div>{{ project.name }}</div>
    <div
      class="rounded-lg bg-gray-300 text-gray-800 px-2 font-normal w-8 text-center"
    >{{ project.notDoneCount }}</div>
  </div>
</template>

<script setup>
import { computed, defineProps } from "vue";
import { useStore } from "vuex";
import { SET_ACTIVE_PROJECT } from "../../store/mutation-types";

const props = defineProps({ project: Object });
const store = useStore();
const activeProjectId = computed(() => store.state.project.activeProjectId);
const isActive = computed(() => activeProjectId.value === props.project.id);
const activateProject = (projectId) =>
  store.commit(`project/${SET_ACTIVE_PROJECT}`, projectId);
</script>
