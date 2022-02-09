import { onSnapshot, setDoc, updateDoc, doc } from "firebase/firestore"
import { ref, watch, onUnmounted } from "vue"
import { db } from "@/firebase/firebase"
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth()
export const user = ref({})

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

export const setActiveProjectId = async (activeProjectId) => await updateDoc(
  doc(db, "users", user.value.uid), { activeProjectId }
)

export const useQueryUserProfile = () => {
  const userProfile = ref({})
  let unsub = () => { }

  watch(user, (user) => {
    if (!user || !user.uid) { return }

    unsub = onSnapshot(
      doc(db, "users", user.uid), (doc) => {
        userProfile.value = doc.data()
      }
    )
  }, { immediate: true })
  onUnmounted(unsub)

  return userProfile
}