import { initializeApp } from "firebase/app";
import getStorage from "redux-persist/es/storage/getStorage";

const firebaseConfig = {
  apiKey: "AIzaSyCxMPYS6t1vfD9chqae9NvnuGx2eXAsFlk",
  authDomain: "gsr-auth.firebaseapp.com",
  projectId: "gsr-auth",
  storageBucket: "gsr-auth.appspot.com",
  messagingSenderId: "22092157007",
  appId: "1:22092157007:web:38a03a6719aba3bd231a3a",
  measurementId: "G-96Y11PB2LC",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
