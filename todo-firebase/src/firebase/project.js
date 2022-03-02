import { db } from "./firebase"
import { collection, setDoc, doc, getDoc } from "firebase/firestore"

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