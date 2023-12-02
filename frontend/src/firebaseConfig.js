import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'



const firebaseConfig = {
  apiKey: "AIzaSyD93-VrHcnVjYCWeVUrACbOi79aY6ksvY0",
  authDomain: "localhost",
  databaseURL: "https://aloexpres-10b91-default-rtdb.firebaseio.com",
  projectId: "aloexpres-10b91",
  storageBucket: "aloexpres-10b91.appspot.com",
  messagingSenderId: "716040426793",
  appId: "1:716040426793:web:8f46edf2b4166e197a9338"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//initialize firebase auth
const auth = getAuth()

export { app, auth }