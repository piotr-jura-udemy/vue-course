import { initializeApp } from 'firebase/app'
import { getFirestore, collection, addDoc, onSnapshot, query, runTransaction, updateDoc, doc } from "firebase/firestore"
import { ref } from "vue"

const config = {
  apiKey: "AIzaSyCCdrblzGCg39iqlgQlR6eSiZ0NVgu2BLo",
  authDomain: "vue-firebase-6d1c6.firebaseapp.com",
  projectId: "vue-firebase-6d1c6",
  storageBucket: "vue-firebase-6d1c6.appspot.com",
  messagingSenderId: "962104481558",
  appId: "1:962104481558:web:0466120c2e3f74910ae237",
  measurementId: "G-SPGNM40GJQ"
}

const app = initializeApp(config)
const db = getFirestore(app)

export const addProject = async (name = "") => {
  const project = await addDoc(
    collection(db, "projects"),
    {
      name,
      taskCount: 1,
      taskDoneCount: 0
    }
  )

  console.log(project)

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
  console.log('Firebase/addTask: adding task')
  let taskDocRef = doc(collection(db, "projects", projectId, "tasks"))

  await runTransaction(db, async (transaction) => {
    const projectDocRef = doc(db, "projects", projectId)
    const projectDoc = await transaction.get(projectDocRef)

    if (!projectDoc.exists()) {
      throw "Project does not exist"
    }

    const taskCount = projectDoc.data().taskCount + 1
    // This generates the new unique ID for the new document
    taskDocRef = doc(collection(db, "projects", projectId, "tasks"))

    transaction.set(taskDocRef, task)
    transaction.update(projectDocRef, { taskCount })
  })

  return {
    id: taskDocRef?.id,
    ...task
  }
}

export const updateTask = async ({ projectId, task }) => {
  await runTransaction(db, async (transaction) => {
    const projectDocRef = doc(db, "projects", projectId)
    const projectDoc = await transaction.get(projectDocRef)

    if (!projectDoc.exists()) {
      throw "Project does not exist"
    }

    const taskDoneCount = projectDoc.data().taskDoneCount + (task.done ? 1 : -1)
    const taskDocRef = doc(db, "projects", projectId, "tasks", task.id)

    transaction.update(taskDocRef, task)
    transaction.update(projectDocRef, { taskDoneCount })
  })
}

export const deleteTask = async ({ projectId, taskId }) => {
  console.log(`Firebase/deleteTask: deleting task ${taskId}`)

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

export const useListProjects = () => {
  const projectList = ref([])
  const q = query(collection(db, "projects"))

  const unsubProjectList = onSnapshot(q, (querySnapshot) => {
    console.log('Firebase/useListProjects: getting projects snapshot')
    projectList.value = querySnapshot.docs.map(
      doc => ({
        id: doc.id,
        ...doc.data()
      })
    )
  })

  return {
    projectList,
    unsubProjectList
  }
}

export const useProjectTasks = (projectId) => {
  const taskList = ref([])
  const q = query(collection(db, "projects", projectId, "tasks"))

  const unsubProjectTasks = onSnapshot(q, (querySnapshot) => {
    console.log("Firebase/useProjectTasks: getting project tasks snapshot")
    taskList.value = querySnapshot.docs.map(
      doc => ({
        id: doc.id,
        ...doc.data()
      })
    )
  })

  return {
    taskList,
    unsubProjectTasks
  }
}

export const useUser = () => {
  const userId = "Xjax1gr4MyY4nQyrubXN"
  const user = ref({})

  const unsubUser = onSnapshot(
    doc(db, "users", userId), (doc) => user.value = doc.data()
  )

  const setActiveProjectId = async (activeProjectId) => await updateDoc(
    doc(db, "users", userId),
    {
      activeProjectId
    }
  )

  return {
    user,
    unsubUser,
    setActiveProjectId
  }
}