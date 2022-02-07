import { onSnapshot, setDoc, updateDoc, doc } from "firebase/firestore"
import { ref } from "vue"
import { db } from "./firebase"
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth()
export const user = ref({})
const userProfile = ref(null)

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
  console.log(user.value)
})

export const createUser = async (email, password) => {
  try {
    const result = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    )
    user.value = result.user

    await setDoc(doc(db, "users", user.value.uid), {})
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
    user.value = result.user
  } catch (e) {
    throw e
  }
}

export const logout = async () => {
  await signOut(auth)
}

export const useUser = () => {
  let unsubUserProfile = null

  const queryUserProfile = (uid) => {
    unsubUserProfile = onSnapshot(
      doc(db, "users", uid), (doc) => userProfile.value = doc.data()
    )
  }

  const setActiveProjectId = async (activeProjectId) => await updateDoc(
    doc(db, "users", user.value.uid),
    {
      activeProjectId
    }
  )

  return {
    queryUserProfile,
    userProfile,
    unsubUserProfile,
    setActiveProjectId,
    logout
  }
}