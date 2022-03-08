import { db } from "./firebase"
import { collection, setDoc, doc, getDoc, getDocs, query, where, orderBy, onSnapshot, addDoc, deleteDoc } from "firebase/firestore"
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

  const q = query(
    collection(db, "projects")
  )
  const unsub = onSnapshot(q, (snapshot) => {
    projects.value = snapshot.docs.map(
      doc => ({
        id: doc.id,
        ...doc.data()
      })
    )
  })

  onUnmounted(unsub)

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
      collection(db, "projects", projectId, "tasks")
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
  onUnmounted(unsub)

  return taskList
}

export const addProject = async (name = "") => {
  return await addDoc(
    collection(db, "projects"),
    {
      name,
      taskCount: 1,
      taskDoneCount: 0
    }
  )
  // doc(collection(db, "projects"))
  // setDoc(doc(db, "projects", "something"))
}

export const deleteTask = async (projectId, taskId) => {
  await deleteDoc(
    doc(db, "projects", projectId, "tasks", taskId)
  )
}