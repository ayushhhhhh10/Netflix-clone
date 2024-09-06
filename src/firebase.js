import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCAJTeB_UkwrmQZ7mMScMritXbFXYEAQls",
  authDomain: "netflix-clone-a3de5.firebaseapp.com",
  projectId: "netflix-clone-a3de5",
  storageBucket: "netflix-clone-a3de5.appspot.com",
  messagingSenderId: "260833890963",
  appId: "1:260833890963:web:11835a3c84c79c5c70f366",
  measurementId: "G-4185K5GJZC",
};

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);

export { auth };
