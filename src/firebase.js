
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
 const firebaseConfig = {
    apiKey: "AIzaSyA-QKQl_QI9U6BNd0y0tBbo-saBp-fma0A",
    authDomain: "admin-portal-c52fd.firebaseapp.com",
    projectId: "admin-portal-c52fd",
    storageBucket: "admin-portal-c52fd.firebasestorage.app",
    messagingSenderId: "23871322983",
    appId: "1:23871322983:web:e6c873bc2c4c9b1d618dc2",
    measurementId: "G-2JXRW2CSSB"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
