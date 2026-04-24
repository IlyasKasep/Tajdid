// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA7S04R-66Tuu1aXF1KS_VLmAaYtMZwNsg",
  authDomain: "at-tajdied-639c8.firebaseapp.com",
  projectId: "at-tajdied-639c8",
  storageBucket: "at-tajdied-639c8.firebasestorage.app",
  messagingSenderId: "937617405954",
  appId: "1:937617405954:web:807d815f27ba888e688f1b",
  measurementId: "G-BDJ542B0KQ"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);

// Ekspor agar bisa dipakai di file lain (seperti halaman Login atau Input Data)
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export default app;

