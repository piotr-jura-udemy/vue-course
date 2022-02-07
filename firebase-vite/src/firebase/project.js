import { db } from "./firebase"
import { collection, addDoc, onSnapshot, query, runTransaction, doc, where } from "firebase/firestore"
import { ref, watch, onUnmounted } from "vue"
import { user } from "./user"

export const addProject = async (name = "") => {
  const project = await addDoc(
    collection(db, "projects"),
    {
      name,
      taskCount: 1,
      taskDoneCount: 0,
      uid: user.value.uid
    }
  )

  await addDoc(
    collection(db, "projects", project.id, "tasks"),
    {
      description: "First task",
      done: false,
      priority: false
    }
  )
}

export const addTask = async (projectId, task) => {
  await runTransaction(db, async (transaction) => {
    const projectDocRef = doc(db, "projects", projectId)
    const projectDoc = await transaction.get(projectDocRef)

    if (!projectDoc.exists()) {
      throw "Project does not exist"
    }

    const taskCount = projectDoc.data().taskCount + 1
    // This generates the new unique ID for the new document
    const taskDocRef = doc(collection(db, "projects", projectId, "tasks"))

    transaction.set(taskDocRef, task)
    transaction.update(projectDocRef, { taskCount })
  })
}

export const updateTask = async ({ projectId, task }) => {
  await runTransaction(db, async (transaction) => {
    const projectDocRef = doc(db, "projects", projectId)
    const projectDoc = await transaction.get(projectDocRef)

    if (!projectDoc.exists()) {
      throw "Project does not exist"
    }

    const taskDocRef = doc(db, "projects", projectId, "tasks", task.id)
    const taskDoc = await transaction.get(taskDocRef)
    let taskDoneCount = projectDoc.data().taskDoneCount

    // Task is done, previously was not
    if (task.done && !taskDoc.data().done) {
      taskDoneCount++
      // Task is not done, previously was
    } else if (!task.done && taskDoc.data().done) {
      taskDoneCount--
    }

    transaction.update(taskDocRef, task)
    transaction.update(projectDocRef, { taskDoneCount })
  })
}

export const deleteTask = async ({ projectId, taskId }) => {
  await runTransaction(db, async (transaction) => {
    // Get project doc reference
    const projectDocRef = doc(db, "projects", projectId)
    // Read the project doc
    const projectDoc = await transaction.get(projectDocRef)

    if (!projectDoc.exists()) {
      throw `Project ${projectId} does not exist!`
    }

    // Get the task doc reference
    const taskDocRef = doc(db, "projects", projectId, "tasks", taskId)
    // Read the task doc
    const taskDoc = await transaction.get(taskDocRef)

    if (!taskDoc.exists()) {
      throw `Task ${taskId} does not exist!`
    }

    // Recalculate taskCount and taskDoneCount
    const taskCount = projectDoc.data().taskCount - 1
    const taskDoneCount = projectDoc.data().taskDoneCount - (taskDoc.data().done ? 1 : 0)

    // Delete the task doc
    transaction.delete(taskDocRef)
    // Update project stats
    transaction.update(projectDocRef, { taskCount, taskDoneCount })
  })
}

export const moveTask = async ({ fromProjectId, toProjectId, taskId }) => {
  await runTransaction(db, async (transaction) => {
    const fromProjectDocRef = doc(db, "projects", fromProjectId)
    const fromProjectDoc = await transaction.get(fromProjectDocRef)

    if (!fromProjectDoc.exists()) {
      throw `Project ${fromProjectId} does not exist`
    }

    const toProjectDocRef = doc(db, "projects", toProjectId)
    const toProjectDoc = await transaction.get(toProjectDocRef)

    if (!toProjectDoc.exists()) {
      throw `Project ${toProjectId} does not exist`
    }

    // Get the task ref & read the task
    const taskRef = doc(db, "projects", fromProjectId, "tasks", taskId)
    const taskDoc = await transaction.get(taskRef)

    if (!taskDoc.exists()) {
      throw `Task ${taskId} does not exist`
    }

    const taskDocData = taskDoc.data()

    let taskCount = fromProjectDoc.data().taskCount - 1
    let taskDoneCount = fromProjectDoc.data().taskDoneCount - (taskDocData.done ? 1 : 0)
    // This generates the new unique ID for the new document
    const newTaskDocRef = doc(collection(db, "projects", toProjectId, "tasks"))
    // Add the new task
    transaction.set(newTaskDocRef, taskDocData)
    // Set project numbers
    transaction.update(fromProjectDocRef, { taskCount, taskDoneCount })
    // Remove the original task
    transaction.delete(taskRef)

    taskCount = toProjectDoc.data().taskCount + 1
    taskDoneCount = toProjectDoc.data().taskDoneCount + (taskDocData.done ? 1 : 0)

    transaction.update(toProjectDocRef, { taskCount, taskDoneCount })
  })
}


export const useQueryProjects = () => {
  const projects = ref([])
  let unsub = () => { }

  watch(user, (user) => {
    if (!user || !user.uid) {
      return
    }

    const q = query(collection(db, "projects"), where("uid", "==", user.uid))
    unsub = onSnapshot(q, (querySnapshot) => {
      projects.value = querySnapshot.docs.map(
        doc => ({
          id: doc.id,
          ...doc.data()
        })
      )
    })
  }, { immediate: true })

  onUnmounted(unsub)

  return projects
}


export const useQueryTasks = (projectId) => {
  const taskList = ref([])
  let unsub = () => { }

  watch(projectId, (projectId) => {
    if (!projectId) { return }

    const q = query(collection(db, "projects", projectId, "tasks"))
    onSnapshot(q, (querySnapshot) => {
      taskList.value = querySnapshot.docs.map(
        doc => ({
          id: doc.id,
          ...doc.data()
        })
      )
    })
  })
  onUnmounted(unsub)

  return taskList
}