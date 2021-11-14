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

import BaseCheckbox from "./components/BaseCheckbox.vue";
import AddTaskInput from "./components/AddTaskInput.vue";
import TodoListItem from "./components/TodoListItem.vue";
import SummaryLine from "./components/SummaryLine.vue";
import ProjectList from "./components/ProjectList.vue";

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
    projects() {
      return this.$store.getters.projectsWithStats;
    },
    tasks() {
      // return this.$store.state.tasks;
      return this.$store.getters.activeProject?.tasks ?? [];
    },
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
        this.$store.commit("setOnlyPending", newValue);
      },
    },
    activeProjectId() {
      return this.$store.state.activeProjectId;
    },
  },
  methods: {
    taskAdded(task) {
      this.$store.commit("addTask", {
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
      this.$store.commit("updateTask", {
        projectId: this.activeProjectId,
        task: Object.assign(task, changes),
      });
    },
  },
};
</script>
