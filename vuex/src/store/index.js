import { createStore } from "vuex";
import { localStoragePlugin } from "./plugins/localStorage";
import {
  ADD_TASK,
  UPDATE_TASK,
  SET_ONLY_PENDING,
  SET_ACTIVE_PROJECT,
} from "./mutation-types";

function getProjectById(state, id) {
  return state.projects.find((project) => project.id === id);
}

const store = createStore({
  state() {
    return {
      onlyPending: false,
      activeProjectId: 1,
      projects: [
        {
          id: 1,
          name: "First Project",
          tasks: [
            {
              id: 1,
              description: "Buy food for the dog",
              priority: false,
              done: false,
            },
            {
              id: 2,
              description: "Pay the bills",
              priority: true,
              done: false,
            },
            {
              id: 3,
              description: "Buy some computer games",
              priority: false,
              done: false,
            },
            {
              id: 4,
              description: "Go to the gym",
              priority: false,
              done: false,
            },
          ],
        },
        {
          id: 2,
          name: "Life Project",
          tasks: [
            {
              id: 1,
              description: "Visit parents",
              priority: false,
              done: false,
            },
            {
              id: 2,
              description: "Visit uncles",
              priority: true,
              done: false,
            },
            {
              id: 3,
              description: "Go around the world",
              priority: false,
              done: false,
            },
            {
              id: 4,
              description: "Quit smoking",
              priority: false,
              done: false,
            },
          ],
        },
      ],
    };
  },
  getters: {
    activeProject(state) {
      return getProjectById(state, state.activeProjectId);
    },
    projectsWithStats(state) {
      return state.projects.map((project) => ({
        id: project.id,
        ...project,
        notDoneCount: project.tasks.filter((task) => !task.done).length,
      }));
    },
    activeProjectTasks(_, getters) {
      return getters.activeProject?.tasks ?? [];
    },
  },
  mutations: {
    /*
    payload: {
      projectId: number,
      task: {
        id: number,
        description: string,
        done: boolean,
        priority: boolean,
      }
    }
    */
    [ADD_TASK](state, payload) {
      getProjectById(state, payload.projectId)?.tasks.push(payload.task);
    },
    [UPDATE_TASK](state, payload) {
      const project = getProjectById(state, payload.projectId);
      const taskIndex = project?.tasks?.findIndex(
        (task) => task.id === payload.task.id
      );

      if (taskIndex !== undefined && taskIndex !== -1) {
        project.tasks[taskIndex] = payload.task;
      }
    },
    [SET_ONLY_PENDING](state, payload) {
      state.onlyPending = payload;
    },
    [SET_ACTIVE_PROJECT](state, activeProjectId) {
      state.activeProjectId = activeProjectId;
    },
  },
  plugins: [localStoragePlugin],
});

export default store;
