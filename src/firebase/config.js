// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getStorage } from "@firebase/storage"
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDs0XDKtj5Km7g_sqeiH7Nj8ODjzSGRXZQ",
  authDomain: "depixen-case-study-7532d.firebaseapp.com",
  projectId: "depixen-case-study-7532d",
  storageBucket: "depixen-case-study-7532d.appspot.com",
  messagingSenderId: "25832346594",
  appId: "1:25832346594:web:5f4c749cb8bb5d9eba9fbb",
  measurementId: "G-8NB8J3ZE5P"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const storage = getStorage(app)

export { db, storage }