import { db } from "./firebase"
import { collection, setDoc, doc, getDoc, getDocs, query, where, orderBy, onSnapshot } from "firebase/firestore"

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