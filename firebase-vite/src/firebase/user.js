import { onSnapshot, updateDoc, doc } from "firebase/firestore"
import { ref } from "vue"
import { db } from "./firebase"

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