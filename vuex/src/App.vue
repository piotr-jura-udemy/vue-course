<template>
  <div class="flex flex-col md:flex-row">
    <div
      class="
        w-full
        md:w-1/3
        xl:w-1/5
        mr-4
        px-0
        md:px-4
        mb-4
        h-full
        text-lg
        md:text-sm
      "
    >
      <ProjectList :projects="projects" />
    </div>
    <div class="w-full md:w-2/3 xl:w-4/5">
      <div class="mb-4">
        <AddTaskInput @added="taskAdded" />
        <BaseCheckbox
          class="my-4 p-4 text-gray-600 text-sm font-weight-100"
          v-model="onlyPending"
        >
          <b>Only pending tasks</b>
        </BaseCheckbox>
      </div>
      <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
        <TodoListItem
          v-for="task in displayedTasks"
          :task="task"
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

import { mapGetters, mapState, mapMutations } from "vuex";

import BaseCheckbox from "./components/BaseCheckbox.vue";
import AddTaskInput from "./components/AddTaskInput.vue";
import TodoListItem from "./components/TodoListItem.vue";
import SummaryLine from "./components/SummaryLine.vue";
import ProjectList from "./components/ProjectList.vue";

import {
  ADD_TASK,
  UPDATE_TASK,
  SET_ONLY_PENDING,
} from "./store/mutation-types";

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
  computed: {
    ...mapState(["activeProjectId"]),
    ...mapGetters({
      projects: "projectsWithStats",
      activeProject: "activeProject",
    }),
    // projects() {
    //   return this.$store.getters.projectsWithStats;
    // },
    tasks() {
      // return this.$store.state.tasks;
      // return this.$store.getters.activeProject?.tasks ?? [];
      return this.activeProject?.tasks ?? [];
    },
    // activeProjectId() {
    //   return this.$store.state.activeProjectId;
    // }
    displayedTasks() {
      return [...this.tasks]
        .sort((a, b) => Number(b.priority) - Number(a.priority))
        .filter((task) => !this.onlyPending || !task.done);
    },
    onlyPending: {
      get() {
        return this.$store.state.onlyPending;
      },
      set(newValue) {
        this[SET_ONLY_PENDING](newValue);
        // this.$store.commit(SET_ONLY_PENDING, newValue);
      },
    },
  },
  methods: {
    ...mapMutations([SET_ONLY_PENDING, ADD_TASK, UPDATE_TASK]),
    taskAdded(task) {
      this[ADD_TASK](
        // this.$store.commit(ADD_TASK,
        {
          projectId: this.activeProjectId,
          task: {
            id: nextTaskId++,
            description: task,
            done: false,
            priority: false,
          },
        }
      );
    },
    taskUpdated(task, changes) {
      // this.$store.commit(UPDATE_TASK,
      this[UPDATE_TASK]({
        projectId: this.activeProjectId,
        task: Object.assign(task, changes),
      });
    },
  },
};
</script>
