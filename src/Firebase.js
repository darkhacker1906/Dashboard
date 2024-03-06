import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBUBl6yKd_ULdWyyUwsfucqErGoTkdH5H4",
  authDomain: "dashboard-583cf.firebaseapp.com",
  projectId: "dashboard-583cf",
  storageBucket: "dashboard-583cf.appspot.com",
  messagingSenderId: "249490472351",
  appId: "1:249490472351:web:0fdea74b64bdefa19551aa"
};


const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth=getAuth();
const db = getFirestore(app);
export {app,auth,provider,db};