import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { connectFunctionsEmulator, getFunctions } from "firebase/functions"
import { environment } from "../environments/environment";
const firebaseConfig = {
    apiKey: "AIzaSyDuNlERP_6iEjqIH8hXnAuNYVgaLbSoc_o",
    authDomain: "miurac-pam.firebaseapp.com",
    databaseURL: "https://miurac-pam-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "miurac-pam",
    storageBucket: "miurac-pam.appspot.com",
    messagingSenderId: "990447387725",
    appId: "1:990447387725:web:4e21a571dfc3bda1834804",
    measurementId: "G-L7PTHBLS27"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app);
export const storage = getStorage(app);
const functions = getFunctions(app, "asia-south1")
if (!environment.production) connectFunctionsEmulator(functions,"localhost",5001)
export {functions}