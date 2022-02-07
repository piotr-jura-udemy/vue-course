<template>
  <div class="flex flex-col md:flex-row">
    <div class="w-full md:w-1/3 xl:w-1/5 mr-4 px-0 md:px-4 mb-4 h-full text-xl md:text-base">
      <UserProfile />
      <ProjectAdd />
      <ProjectList :projects="projects" v-if="projects.length" />
      <div v-else class="text-xl text-gray-400">No projects yet</div>
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

import BaseCheckbox from "../components/base/BaseCheckbox.vue"
import AddTaskInput from "../components/task/AddTaskInput.vue"
import SummaryLine from "../components/project/ProjectSummaryLine.vue"
import ProjectList from "../components/project/ProjectList.vue"
import TodoList from "../components/task/TodoList.vue"
import UserProfile from "../components/user/UserProfile.vue"
import ProjectAdd from "./../components/project/ProjectAdd.vue"

import {
  SET_ONLY_PENDING,
  SET_PROJECTS,
  SET_ACTIVE_PROJECT
} from "../store/mutation-types"
import { useListProjects, addTask } from "../firebase/project"
import { useUser, user } from "../firebase/user"

const store = useStore()
let unsubProjectList = null
let unsubUserProfile = null

const { projectList, queryProjectList } = useListProjects()
const { userProfile, queryUserProfile } = useUser()

// If the user is authenticated, start watching his profile & project list
watch(user, (user) => {
  if (!user?.uid) {
    return
  }

  // Make sure to unsubscribe from the snapshot queries
  unsubProjectList = queryProjectList(user.uid)
  unsubUserProfile = queryUserProfile(user.uid)
}, { immediate: true })

watch(projectList, (newValue) => {
  console.log('Got project list!')
  store.commit(`project/${SET_PROJECTS}`, newValue)
})

watch(userProfile, (newUser, oldUser) => {
  if (newUser && newUser?.activeProjectId !== oldUser?.activeProjectId) {
    store.commit(`project/${SET_ACTIVE_PROJECT}`, newUser?.activeProjectId)
  }
})

onBeforeUnmount(() => {
  store.commit(`project/${SET_PROJECTS}`, [])

  if (unsubProjectList) {
    unsubProjectList()
  }

  if (unsubUserProfile) {
    unsubUserProfile()
  }
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
</script>
