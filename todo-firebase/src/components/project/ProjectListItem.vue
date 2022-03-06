<template>
  <div
    @click="setActiveProjectId(project.id)"
    class="rounded-md py-2 px-2 text-gray-500 font-semibold flex justify-between cursor-pointer"
    :class="{ 'bg-gray-200': isActive }"
  >
    <div>{{ project.name }}</div>
    <div class="rounded-lg bg-gray-300 text-gray-800 px-2 font-normal w-8 text-center">{{ notDone }}</div>
  </div>
</template>

<script setup>
import { computed, inject } from "vue";
import { setActiveProjectId } from "./../../firebase/user"

const props = defineProps({ project: Object });
const activeProjectId = inject("activeProjectId")
const isActive = computed(() => activeProjectId.value === props.project.id);
const notDone = computed(
  () => props.project.taskCount - props.project.taskDoneCount
)
</script>
