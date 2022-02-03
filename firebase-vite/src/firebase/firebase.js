import { initializeApp } from 'firebase/app'
import { getFirestore } from "firebase/firestore"

const config = {
  apiKey: "AIzaSyCCdrblzGCg39iqlgQlR6eSiZ0NVgu2BLo",
  authDomain: "vue-firebase-6d1c6.firebaseapp.com",
  projectId: "vue-firebase-6d1c6",
  storageBucket: "vue-firebase-6d1c6.appspot.com",
  messagingSenderId: "962104481558",
  appId: "1:962104481558:web:0466120c2e3f74910ae237",
  measurementId: "G-SPGNM40GJQ"
}

export const app = initializeApp(config)
export const db = getFirestore(app)