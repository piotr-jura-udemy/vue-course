import {
  ADD_TASK,
  REMOVE_TASK,
  UPDATE_TASK,
  SET_ACTIVE_PROJECT,
  SET_PROJECTS,
  SET_TASKS
} from "./../mutation-types"
import { MOVE_TASK } from "./../actions-types"

function getProjectById(state, id) {
  return state.projects.find((project) => project.id === id)
}

function getProjectAndTaskIndex(state, { projectId, taskId }) {
  const project = getProjectById(state, projectId)

  return {
    project,
    taskIndex: project?.tasks?.findIndex((task) => task.id === taskId),
  }
}

const state = () => ({
  activeProjectId: null,
  projects: [],
  tasks: []
})

const getters = {
  activeProject(state) {
    return getProjectById(state, state.activeProjectId)
  },
  projectsWithStats(state) {
    return state.projects.map((project) => ({
      id: project.id,
      ...project,
      // notDoneCount: project.tasks?.filter((task) => !task.done).length ?? 0,
      notDoneCount: project.taskCount - project.taskDoneCount,
    }))
  },
  // activeProjectTasks(_, getters) {
  //   return getters.activeProject?.tasks ?? []
  // },
}

const mutations = {
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
    state.tasks.push(payload.task)
  },
  [REMOVE_TASK](state, payload) {
    const { project, taskIndex } = getProjectAndTaskIndex(state, payload)

    if (taskIndex !== undefined && taskIndex !== -1) {
      project.tasks.splice(taskIndex, 1)
    }
  },
  [UPDATE_TASK](state, payload) {
    const { project, taskIndex } = getProjectAndTaskIndex(state, payload)

    if (taskIndex !== undefined && taskIndex !== -1) {
      project.tasks[taskIndex] = payload.task
    }
  },
  [SET_ACTIVE_PROJECT](state, activeProjectId) {
    state.activeProjectId = activeProjectId;
  },
  [SET_PROJECTS](state, projects) {
    state.projects = projects
  },
  [SET_TASKS](state, payload) {
    state.tasks = payload
  }
};
const actions = {
  [MOVE_TASK]({ commit, state }, { taskId, fromProjectId, toProjectId }) {
    const { project, taskIndex } = getProjectAndTaskIndex(state, {
      taskId,
      projectId: fromProjectId,
    });
    commit(ADD_TASK, {
      task: project.tasks[taskIndex],
      projectId: toProjectId,
    });
    commit(REMOVE_TASK, {
      taskId,
      projectId: fromProjectId,
    })
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
