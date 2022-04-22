<template>
  <div class="flex flex-col md:flex-row">
    <div
      class="w-full md:w-1/3 xl:w-1/5 mr-4 px-0 md:px-4 mb-4 h-full text-lg md:text-sm">
      <UserProfile />
      <ProjectAdd />
      <ProjectList :projects="projects" />
    </div>
    <div class="w-full md:w-2/3 xl:w-4/5">
      <div class="mb-4">
        <AddTaskInput @added="taskAdded" />
        <BaseCheckbox
          class="my-4 p-4 text-gray-600 font-weight-100"
          v-model="onlyPending">
          <b>Only pending tasks</b>
        </BaseCheckbox>
      </div>
      <Transition name="fade-02" mode="out-in">
        <div class="grid grid-cols-1 gap-4 lg:grid-cols-3"
          v-if="displayedTasks.length">
          <TransitionGroup>
            <TodoListItem v-for="task in displayedTasks"
              :task="task" :project-id="activeProjectId"
              :key="task.id" :done="task.done"
              :priority="task.priority"
              @update:done="taskUpdated(task, { done: $event })"
              @update:priority="taskUpdated(task, { priority: $event })" />
          </TransitionGroup>
        </div>
        <div v-else
          class="text-3xl text-gray-300 border border-gray-200 w-full p-8 text-center rounded-md">
          No tasks
        </div>
      </Transition>
      <SummaryLine class="mt-8" />
    </div>
  </div>
</template>

<script setup>
import { useQueryProjects, useQueryTasks, addTask, updateTask } from "./../firebase/project"
import { useUserProfile } from "./../firebase/user"

import BaseCheckbox from "./../components/base/BaseCheckbox.vue";
import AddTaskInput from "./../components/task/AddTaskInput.vue";
import TodoListItem from "./../components/task/TodoListItem.vue";
import SummaryLine from "./../components/project/ProjectSummaryLine.vue";
import ProjectList from "./../components/project/ProjectList.vue";
import ProjectAdd from "./../components/project/ProjectAdd.vue"
import UserProfile from "./../components/user/UserProfile.vue"

import {
  SET_ONLY_PENDING,
} from "./../store/mutation-types";
import { useStore } from "vuex";
import { computed, provide } from "vue";

const projects = useQueryProjects()
provide("projects", projects)
const userProfile = useUserProfile()
const activeProjectId = computed(
  () => userProfile.value?.activeProjectId
)
const tasks = useQueryTasks(activeProjectId)
provide("tasks", tasks)
provide("activeProjectId", activeProjectId)
const store = useStore();
const onlyPending = computed({
  get: () => store.state.application.onlyPending,
  set: (newValue) => store.commit(`application/${SET_ONLY_PENDING}`, newValue),
});
const displayedTasks = computed(() =>
  [...tasks.value]
    .sort((a, b) => Number(b.priority) - Number(a.priority))
    .filter((task) => !onlyPending.value || !task.done)
);

const taskAdded = (description) =>
  addTask(
    activeProjectId.value,
    {
      description,
      done: false,
      priority: false,
    },
  )
const taskUpdated = (task, changes) =>
  updateTask(
    activeProjectId.value,
    Object.assign(task, changes),
  )
</script>

<style scoped>
.v-enter-from,
.v-leave-to {
  transform: translateY(-5px);
}

.v-enter-to,
.v-leave-from {
  transform: translateY(0);
}

.v-move,
.v-enter-active,
.v-leave-active {
  transition: transform 0.2s;
}

.v-leave-active {
  display: none;
}
</style>