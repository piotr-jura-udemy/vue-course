<template>
  <button
    @click="setActiveProjectId(project.id)"
    class="w-full rounded-md py-2 px-2 text-gray-500 font-semibold flex justify-between text-left items-center cursor-pointer"
    :class="{ 'bg-gray-200': isActive }"
  >
    <div class>{{ project.name }}</div>
    <div class="rounded-lg bg-gray-300 text-gray-800 px-2 font-normal w-8 text-center">{{ notDone }}</div>
  </button>
</template>

<script setup>
import { computed } from "vue";
import { setActiveProjectId } from "./../../firebase/user"

const props = defineProps({ project: Object, activeId: String })
const isActive = computed(() => props.activeId === props.project.id)
const notDone = computed(() => props.project.taskCount - props.project.taskDoneCount)
</script>
