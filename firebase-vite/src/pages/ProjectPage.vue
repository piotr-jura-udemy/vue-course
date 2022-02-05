<template>
  <div class="flex flex-col md:flex-row">
    <div class="w-full md:w-1/3 xl:w-1/5 mr-4 px-0 md:px-4 mb-4 h-full text-xl md:text-base">
      <div class="border-b border-gray-200 text-gray-600 mb-4 pb-4" v-if="user">
        <div class="font-semibold px-2">{{ user.email }}</div>
        <div class="text-base md:text-sm text-gray-500 mt-2 px-2">
          <button class="w-full text-left">View Profile</button>
        </div>
        <div class="text-base md:text-sm text-gray-500 mt-2 px-2">
          <button class="w-full text-left" @click="doLogout">Logout</button>
        </div>
      </div>

      <ProjectList :projects="projects" />
    </div>
    <div class="w-full md:w-2/3 xl:w-4/5">
      <div class="mb-4">
        <AddTaskInput @added="taskAdded" />
        <BaseCheckbox class="my-4 py-4 px-1 text-gray-600 font-weight-100" v-model="onlyPending">
          <b>Only pending tasks</b>
        </BaseCheckbox>
      </div>
      <TodoList :project-id="activeProjectId" :only-pending="onlyPending"></TodoList>
      <SummaryLine class="mt-8" />
    </div>
  </div>
</template>

<script setup>
import { computed, watch, onBeforeUnmount } from "vue"
import { useStore } from "vuex"
import { useRouter } from "vue-router"

import BaseCheckbox from "../components/base/BaseCheckbox.vue"
import AddTaskInput from "../components/task/AddTaskInput.vue"
import SummaryLine from "../components/project/ProjectSummaryLine.vue"
import ProjectList from "../components/project/ProjectList.vue"
import TodoList from "../components/task/TodoList.vue"

import {
  SET_ONLY_PENDING,
  SET_PROJECTS,
  SET_ACTIVE_PROJECT
} from "../store/mutation-types"
import { useListProjects, addTask } from "../firebase/project"
import { logout } from "../firebase/user"
import { useUser } from "../firebase/user"

const store = useStore()
const router = useRouter()
const { projectList, unsubProjectList } = useListProjects()

watch(projectList, (newValue) => {
  console.log('App: project list updated')
  store.commit(`project/${SET_PROJECTS}`, newValue)
})

const { user, unsubUser } = useUser()

watch(user, (user, oldUser) => {
  if (user && user?.activeProjectId !== oldUser?.activeProjectId) {
    store.commit(`project/${SET_ACTIVE_PROJECT}`, user?.activeProjectId)
  }
})

onBeforeUnmount(() => {
  console.log(`ProjectPage: unmounted!`)
  unsubProjectList()
  unsubUser()
})

const activeProjectId = computed(() => store.state.project.activeProjectId)

const projects = computed(() => store.getters[`project/projectsWithStats`])
const onlyPending = computed({
  get: () => store.state.application.onlyPending,
  set: (newValue) => store.commit(`application/${SET_ONLY_PENDING}`, newValue),
})

const taskAdded = async (description) => {
  await addTask(activeProjectId.value, {
    description,
    done: false,
    priority: false,
  })
}

const doLogout = async () => {
  await logout()
  router.push({ name: 'login' })

}
</script>
