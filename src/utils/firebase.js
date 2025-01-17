import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAGlevfKz-r8OC2Xqfs9hE9HqE8C7HMAC4",
  authDomain: "sparklyt-9afad.firebaseapp.com",
  projectId: "sparklyt-9afad",
  storageBucket: "sparklyt-9afad.firebasestorage.app",
  messagingSenderId: "306112418471",
  appId: "1:306112418471:web:702ff5057c09c123108182",
  measurementId: "G-VWFHK9W3KB"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
