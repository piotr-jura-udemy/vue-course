import { onSnapshot, doc, updateDoc } from "firebase/firestore"
import { ref, onUnmounted } from "vue"
import { db } from "./firebase"

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

