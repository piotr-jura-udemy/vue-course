import { onSnapshot, doc } from "firebase/firestore"
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