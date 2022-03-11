<template>
  <div class="flex flex-col md:flex-row">
    <div class="w-full md:w-1/3 xl:w-1/5 mr-4 px-0 md:px-4 mb-4 h-full text-lg md:text-sm">
      <ProjectAdd />
      <ProjectList :projects="projects" />
    </div>
    <div class="w-full md:w-2/3 xl:w-4/5">
      <div class="mb-4">
        <AddTaskInput @added="taskAdded" />
        <BaseCheckbox class="my-4 p-4 text-gray-600 font-weight-100" v-model="onlyPending">
          <b>Only pending tasks</b>
        </BaseCheckbox>
      </div>
      <div class="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <TodoListItem
          v-for="task in displayedTasks"
          :task="task"
          :project-id="activeProjectId"
          :key="task.id"
          :done="task.done"
          :priority="task.priority"
          @update:done="taskUpdated(task, { done: $event })"
          @update:priority="taskUpdated(task, { priority: $event })"
        />
      </div>
      <SummaryLine class="mt-8" />
    </div>
  </div>
</template>

<script setup>
import { useQueryProjects, useQueryTasks, addTask, updateTask } from "./firebase/project"
import { useUserProfile } from "./firebase/user"

import BaseCheckbox from "./components/base/BaseCheckbox.vue";
import AddTaskInput from "./components/task/AddTaskInput.vue";
import TodoListItem from "./components/task/TodoListItem.vue";
import SummaryLine from "./components/project/ProjectSummaryLine.vue";
import ProjectList from "./components/project/ProjectList.vue";
import ProjectAdd from "./components/project/ProjectAdd.vue"

import {
  SET_ONLY_PENDING,
} from "./store/mutation-types";
import { useStore } from "vuex";
import { computed, provide } from "vue";

const projects = useQueryProjects()
provide("projects", projects)
const userProfile = useUserProfile()
const activeProjectId = computed(
  () => userProfile.value?.activeProjectId
)
const tasks = useQueryTasks(activeProjectId)
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
