import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

import { getFirestore } from 'firebase/firestore';

mentId: "G-VWFHK9W3KB"
};


REACT_APP_FIREBASE_API_KEY="your-api-key"
REACT_APP_FIREBASE_AUTH_DOMAIN="your-auth-domain"
REACT_APP_FIREBASE_PROJECT_ID="your-project-id"
REACT_APP_FIREBASE_STORAGE_BUCKET="your-storage-bucket"
REACT_APP_FIREBASE_MESSAGING_SENDER_ID="your-messaging-sender-id"
REACT_APP_FIREBASE_APP_ID="your-app-id"
REACT_APP_FIREBASE_MEASUREMENT_ID="your-measurement-id"

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
