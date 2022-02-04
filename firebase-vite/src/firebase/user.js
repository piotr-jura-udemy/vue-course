import { onSnapshot, updateDoc, doc } from "firebase/firestore"
import { ref } from "vue"
import { db } from "./firebase"
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

const auth = getAuth()
const currentUser = ref(null)

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    currentUser.value = user
    // ...
  } else {
    // User is signed out
    // ...
    currentUser.value = null
  }
  console.log(currentUser.value)
})

export const createUser = async (email, password) => {
  try {
    const result = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    )
    currentUser.value = result.user
  } catch (e) {
    throw e
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