import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getFunctions } from "firebase/functions"
const firebaseConfig = {
    apiKey: "AIzaSyDuNlERP_6iEjqIH8hXnAuNYVgaLbSoc_o",
    authDomain: "miurac-pam.firebaseapp.com",
    databaseURL: "https://miurac-pam-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "miurac-pam",
    storageBucket: "miurac-pam.appspot.com",
    messagingSenderId: "990447387725",
    appId: "1:990447387725:web:8831beedf2f429b9834804",
    measurementId: "G-4BNFWR53N3"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app);
export const storage = getStorage(app);
export const functions = getFunctions(app, "asia-south1")