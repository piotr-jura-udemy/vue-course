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

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const tasks = computed(() => store.getters[`project/activeProjectTasks`]);
const total = computed(() => tasks.value.length);
const completion = computed(() =>
  Math.ceil(
    (tasks.value.filter((task) => task.done).length / total.value) * 100
  )
);
const prioritzed = computed(
  () => tasks.value.filter((task) => task.priority).length
);
</script>
