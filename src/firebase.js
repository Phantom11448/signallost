import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDJCuIe60X_IBXAk7_O8qwdf_n3EHozvpU",
  authDomain: "signallost-12e9a.firebaseapp.com",
  projectId: "signallost-12e9a",
  storageBucket: "signallost-12e9a.firebasestorage.app",
  messagingSenderId: "952741314057",
  appId: "1:952741314057:web:09a9ff34113b357e2542d8",
  measurementId: "G-FNECTNB0CV"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);