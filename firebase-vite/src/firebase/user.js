import { onSnapshot, updateDoc, doc } from "firebase/firestore"
import { ref } from "vue"
import { db } from "./firebase"
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth()
const user = ref({})
const currentUser = ref(null)

onAuthStateChanged(auth, (data) => {
  if (data) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    user.value = data
    // ...
  } else {
    // User is signed out
    // ...
    user.value = null
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

export const login = async (email, password) => {
  try {
    const result = await signInWithEmailAndPassword(
      auth,
      email,
      password
    )
    currentUser.value = result.user
  } catch (e) {
    throw e
  }
}

export const logout = async () => {
  await signOut(auth)
}

export const useUser = () => {
  const userId = "Xjax1gr4MyY4nQyrubXN"

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
    currentUser,
    unsubUser,
    setActiveProjectId,
    logout
  }
}