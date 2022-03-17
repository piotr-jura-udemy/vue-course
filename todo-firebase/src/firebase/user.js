import { onSnapshot, doc, updateDoc } from "firebase/firestore"
import { ref, onUnmounted } from "vue"
import { db } from "./firebase"
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from "firebase/auth"

export const user = ref(null)

const auth = getAuth()
onAuthStateChanged(auth, (data) => {
  if (data) {
    user.value = data
  } else {
    user.value = null
  }

  console.log(user.value)
})

export const login = async (email, password) => {
  return await signInWithEmailAndPassword(
    auth,
    email,
    password
  )
}

export const createUser = async (email, password) => {
  return await createUserWithEmailAndPassword(
    auth, email, password
  )
}

export const logout = async () => {
  await signOut(auth)
}

export const useUserProfile = () => {
  const userProfile = ref({})
  const unsub = onSnapshot(
    doc(db, "profiles", "me"),
    (doc) => userProfile.value = doc.data()
  )
  onUnmounted(unsub)
  return userProfile
}

export const setActiveProjectId =
  async (activeProjectId) => updateDoc(
    doc(db, "profiles", "me"),
    {
      activeProjectId
    }
  )

