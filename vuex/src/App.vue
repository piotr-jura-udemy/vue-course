<template>
  <div class="flex flex-col md:flex-row">
    <div class="w-full md:w-1/3 xl:w-1/5 mr-4 px-0 md:px-4 mb-4 h-full text-lg md:text-sm">
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

<script>
let nextTaskId = 100;

import BaseCheckbox from "./components/base/BaseCheckbox.vue";
import AddTaskInput from "./components/task/AddTaskInput.vue";
import TodoListItem from "./components/task/TodoListItem.vue";
import SummaryLine from "./components/project/ProjectSummaryLine.vue";
import ProjectList from "./components/project/ProjectList.vue";

import {
  ADD_TASK,
  UPDATE_TASK,
  SET_ONLY_PENDING,
} from "./store/mutation-types";

import { mapGetters, mapState, mapMutations } from "vuex";

export default {
  name: "App",
  components: {
    BaseCheckbox,
    AddTaskInput,
    TodoListItem,
    SummaryLine,
    ProjectList,
  },
  data() {
    return {};
  },
  // computed: mapState([]),
  computed: {
    ...mapState({
      activeProjectId: (state) => state.project.activeProjectId
    }),
    ...mapGetters('project', {
      projects: "projectsWithStats",
      // activeProject: "activeProject",
      tasks: "activeProjectTasks",
    }),
    // ...mapState({ activeId: "activeProjectId" }),
    // ...mapState({
    // activeId: (state) => state.activeProjectId ?? 1,
    // activeId(state) {
    //   this.projects
    // }
    // }),
    // projects() {
    //   return this.$store.getters.projectsWithStats;
    // },
    // tasks() {
    //   // return this.$store.state.tasks;
    //   return this.activeProject?.tasks ?? [];
    // },
    displayedTasks() {
      return [...this.tasks]
        .sort((a, b) => Number(b.priority) - Number(a.priority))
        .filter((task) => !this.onlyPending || !task.done);
    },
    onlyPending: {
      get() {
        return this.$store.state.application.onlyPending;
      },
      set(newValue) {
        this[SET_ONLY_PENDING](newValue);
        // this.$store.commit(`application/${SET_ONLY_PENDING}`, newValue);
      },
    },
  },
  methods: {
    ...mapMutations(
      'application',
      [SET_ONLY_PENDING]
    ),
    ...mapMutations(
      'project',
      [ADD_TASK, UPDATE_TASK]
    ),
    taskAdded(task) {
      this[ADD_TASK]({
        projectId: this.activeProjectId,
        task: {
          id: nextTaskId++,
          description: task,
          done: false,
          priority: false,
        },
      });
    },
    taskUpdated(task, changes) {
      this[UPDATE_TASK]({
        projectId: this.activeProjectId,
        task: Object.assign(task, changes),
      });
    },
  },
};
</script>
