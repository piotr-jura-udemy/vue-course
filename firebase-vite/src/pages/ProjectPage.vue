<template>
  <div class="flex flex-col md:flex-row">
    <div class="w-full md:w-1/3 mr-4 px-0 md:px-4 mb-4 h-full text-xl md:text-base">
      <UserProfile />
      <ProjectAdd />
      <ProjectList :projects="projects" v-if="projects.length" />
      <div v-else class="p-2 text-xl text-gray-400">No projects yet</div>
    </div>

    <div class="w-full md:w-2/3">
      <div class="mb-4" v-if="activeProjectId">
        <AddTaskInput @added="taskAdded" />
        <BaseCheckbox class="my-4 py-4 px-1 text-gray-600 font-weight-100" v-model="onlyPending">
          <b>Only pending tasks</b>
        </BaseCheckbox>
      </div>
      <TodoList :project-id="activeProjectId" :only-pending="onlyPending" :tasks="tasks"></TodoList>
      <SummaryLine class="mt-8 mb-8" v-if="activeProjectId" />
    </div>
  </div>
</template>

<script setup>
import { computed, provide } from "vue"
import { useStore } from "vuex"

import BaseCheckbox from "@/components/base/BaseCheckbox.vue"
import AddTaskInput from "@/components/task/AddTaskInput.vue"
import SummaryLine from "@/components/project/ProjectSummaryLine.vue"
import ProjectList from "@/components/project/ProjectList.vue"
import TodoList from "@/components/task/TodoList.vue"
import UserProfile from "@/components/user/UserProfile.vue"
import ProjectAdd from "@/components/project/ProjectAdd.vue"

import {
  SET_ONLY_PENDING
} from "@/store/mutation-types"
import { useQueryProjects, useQueryTasks, addTask } from "@/firebase/project"
import { useQueryUserProfile } from "@/firebase/user"

const store = useStore()
const projects = useQueryProjects()
const userProfile = useQueryUserProfile()
const activeProjectId = computed(() => userProfile.value.activeProjectId)
const tasks = useQueryTasks(activeProjectId)
provide("tasks", tasks)

const onlyPending = computed({
  get: () => store.state.application.onlyPending,
  set: (newValue) => store.commit(`application/${SET_ONLY_PENDING}`, newValue),
})

provide("projects", projects)

const taskAdded = async (description) => {
  await addTask(activeProjectId.value, {
    description,
    done: false,
    priority: false,
  })
}
</script>
