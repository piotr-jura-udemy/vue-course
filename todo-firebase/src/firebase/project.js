import { db } from "./firebase"
import { user } from "./user"
import { collection, setDoc, doc, getDoc, getDocs, query, where, orderBy, onSnapshot, addDoc, deleteDoc, runTransaction, serverTimestamp } from "firebase/firestore"
import { ref, onUnmounted, watch } from "vue"

export const prepareProjectsData = async () => {
  const projectsRef = collection(db, "projects")
  await Promise.all([
    setDoc(doc(projectsRef, "first"), {
      name: "First project",
      taskCount: 5,
      taskDoneCount: 2
    }),
    setDoc(doc(projectsRef, "second"), {
      name: "Second project",
      taskCount: 10,
      taskDoneCount: 7
    }),
    setDoc(doc(projectsRef, "third"), {
      name: "Third project",
      taskCount: 2,
      taskDoneCount: 2
    }),
    setDoc(doc(projectsRef, "fourth"), {
      name: "Fourth project",
      taskCount: 4,
      taskDoneCount: 3
    }),
  ])
  console.log('Documents should be added now!');
}

export const fetchAllDocuments = async () => {
  const projectsRef = collection(db, "projects")
  const result = await getDocs(projectsRef)
  logResults(result)
}

export const queryProjects = async () => {
  const projectsRef = collection(db, "projects")
  const q = query(
    projectsRef,
    where("taskCount", ">", 2),
    where("taskCount", "<=", 6),
    orderBy("taskCount"),
    // orderBy("taskDoneCount")
  )
  const result = await getDocs(q)
  logResults(result)
}

const logResults = (result) => result.forEach(
  doc => console.log({ id: doc.id, ...doc.data() })
)

export const fetchSingleDocument = async () => {
  const docRef = doc(db, "projects", "first")
  const projectDoc = await getDoc(docRef)

  if (projectDoc.exists()) {
    console.log({
      id: projectDoc.id,
      ...projectDoc.data()
    })
  } else {
    console.log(`The document does not exist!`)
  }
}

export const watchDocument = async () => {
  return onSnapshot(
    doc(db, "projects", "first"),
    (doc) => console.log(doc.data())
  )
}

export const watchProjectsWithDoneTasks = async () => {
  const q = query(
    collection(db, "projects"),
    where("taskDoneCount", ">", 0)
  )
  return onSnapshot(
    q,
    (querySnapshot) => logResults(querySnapshot)
  )
}

export const useQueryProjects = () => {
  const projects = ref([])
  let unsub = () => { }

  watch(user, (user) => {
    if (!user || !user.uid) {
      return
    }

    const q = query(
      collection(db, "projects"),
      where("uid", "==", user.uid)
    )
    unsub()
    unsub = onSnapshot(q, (snapshot) => {
      projects.value = snapshot.docs.map(
        doc => ({
          id: doc.id,
          ...doc.data()
        })
      )
    })
  })
  onUnmounted(() => { unsub(); console.log(`Unsub projects...`) })

  return projects
}

export const useQueryTasks = (projectId) => {
  const taskList = ref([])
  let unsub = () => { }

  watch(projectId, (projectId, oldProjectId) => {
    if (projectId === null || projectId === undefined) {
      console.log(`projectId was nullish`)
      taskList.value = []
      return
    }

    console.log(`Not watching ${oldProjectId} tasks anymore...`)
    unsub()
    const q = query(
      collection(db, "projects", projectId, "tasks"),
      orderBy("timestamp", "desc")
    )
    console.log(`Watching ${projectId} tasks!`)
    unsub = onSnapshot(q, (snapshot) => {
      console.log(`Got ${snapshot.docs.length} tasks...`)
      taskList.value = snapshot.docs.map(
        doc => ({
          id: doc.id,
          ...doc.data()
        })
      )
    })
  })
  onUnmounted(() => { unsub(); console.log(`Unsub tasks...`) })

  return taskList
}

export const addProject = async (name = "") => {
  if (!user?.value) {
    return
  }

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
      priority: false,
      timestamp: serverTimestamp(),
      uid: user.value.uid
    }
  )

  return project
}

// export const deleteTask = async (projectId, taskId) => {
//   await deleteDoc(
//     doc(db, "projects", projectId, "tasks", taskId)
//   )
// }

const getProjectInTransaction = async (transaction, projectId) => {
  const projectDocRef = doc(
    db, "projects", projectId
  )
  const projectDoc = await transaction.get(
    projectDocRef
  )

  if (!projectDoc.exists()) {
    throw "Project does not exist"
  }

  return {
    projectDocRef,
    projectDoc,
    projectData: projectDoc.data()
  }
}

const getTaskInTransaction = async (
  transaction, projectId, taskId
) => {
  const taskDocRef = doc(
    db, "projects", projectId, "tasks", taskId
  )
  const taskDoc = await transaction.get(taskDocRef)

  if (!taskDoc.exists()) {
    throw `Task does not exist`
  }

  return {
    taskDocRef,
    taskDoc,
    taskData: taskDoc.data()
  }
}

export const addTask = async (projectId, task) => {
  await runTransaction(db, async (transaction) => {
    const { projectDocRef, projectData }
      = await getProjectInTransaction(
        transaction, projectId
      )

    const taskCount = projectData.taskCount + 1
    const taskDocRef = doc(
      collection(db, "projects", projectId, "tasks")
    )
    transaction.set(taskDocRef, {
      timestamp: serverTimestamp(),
      uid: user.value.uid,
      ...task
    })
    transaction.update(projectDocRef, { taskCount })
  })
}

export const updateTask = async (projectId, task) => {
  await runTransaction(db, async (transaction) => {
    const { projectDocRef, projectDoc, projectData }
      = await getProjectInTransaction(
        transaction, projectId
      )
    const { taskDocRef, taskData } = await getTaskInTransaction(
      transaction, projectId, task.id
    )
    let taskDoneCount = projectData.taskDoneCount

    if (true === task.done && !taskData.done) {
      taskDoneCount++
    } else if (false === task.done && taskData.done) {
      taskDoneCount--
    }

    const { id, ...data } = task
    transaction.update(taskDocRef, data)
    transaction.update(projectDocRef, { taskDoneCount })
  })
}

export const deleteTask = async (projectId, taskId) => {
  await runTransaction(db, async (transaction) => {
    const { projectDocRef, projectData }
      = await getProjectInTransaction(
        transaction, projectId
      )
    const { taskDocRef, taskData } = await getTaskInTransaction(
      transaction, projectId, taskId
    )
    const taskCount = projectData.taskCount - 1
    const taskDoneCount = projectData.taskDoneCount
      - (taskData.done ? 1 : 0)

    transaction.delete(taskDocRef)
    transaction.update(projectDocRef, { taskCount, taskDoneCount })
  })
}

export const moveTask = async (
  fromProjectId, toProjectId, taskId
) => {
  await runTransaction(db, async (transaction) => {
    const { projectDocRef: fromRef, projectData: fromData }
      = await getProjectInTransaction(
        transaction, fromProjectId
      )
    const { projectDocRef: toRef, projectData: toData }
      = await getProjectInTransaction(
        transaction, toProjectId
      )
    const { taskDocRef, taskData } = await getTaskInTransaction(
      transaction, fromProjectId, taskId
    )

    transaction.update(fromRef, {
      taskCount: fromData.taskCount - 1,
      taskDoneCount: fromData.taskDoneCount -
        (taskData.done ? 1 : 0)
    })
    transaction.update(toRef, {
      taskCount: toData.taskCount + 1,
      taskDoneCount: toData.taskDoneCount +
        (taskData.done ? 1 : 0)
    })

    const newTaskDocRef = doc(
      collection(
        db, "projects", toProjectId, "tasks"
      )
    )
    transaction.set(newTaskDocRef, taskData)
    transaction.delete(taskDocRef)
  })
}