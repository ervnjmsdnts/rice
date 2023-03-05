import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB8Yms3ZQn2Htdavg5llTVBRmwyvKoJ6UI",
  authDomain: "ricehull-6e8b2.firebaseapp.com",
  projectId: "ricehull-6e8b2",
  storageBucket: "ricehull-6e8b2.appspot.com",
  messagingSenderId: "813567025662",
  appId: "1:813567025662:web:1902c3f54e049256ae20af",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
