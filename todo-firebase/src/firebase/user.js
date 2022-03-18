import { onSnapshot, doc, updateDoc, setDoc } from "firebase/firestore"
import { ref, onUnmounted, watch } from "vue"
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
  const result = await createUserWithEmailAndPassword(
    auth, email, password
  )
  await setDoc(
    doc(db, "profiles", result.user.uid),
    {}
  )
}

export const logout = async () => {
  await signOut(auth)
}

export const useUserProfile = () => {
  const userProfile = ref({})
  let unsub = () => { }
  watch(user, (user) => {
    if (!user || !user.uid) {
      return
    }

    unsub()
    unsub = onSnapshot(
      doc(db, "profiles", user.uid),
      (doc) => userProfile.value = doc.data()
    )
  })

  onUnmounted(() => { unsub(); console.log(`Unsub user...`) })
  return userProfile
}

export const setActiveProjectId =
  async (activeProjectId) => updateDoc(
    doc(db, "profiles", user?.value?.uid),
    {
      activeProjectId
    }
  )

