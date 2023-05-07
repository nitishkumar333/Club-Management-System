import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA1wgA0cbBdeDDAsy7X_mL3k2sC_-vEcZg",
  authDomain: "react-b3892.firebaseapp.com",
  databaseURL: "https://react-b3892-default-rtdb.firebaseio.com",
  projectId: "react-b3892",
  storageBucket: "react-b3892.appspot.com",
  messagingSenderId: "600358148964",
  appId: "1:600358148964:web:db8b816a9c8c2b01d13871"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);