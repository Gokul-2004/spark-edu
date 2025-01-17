// src/utils/seedData.js
import { db } from './firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

export const seedData = async (userId) => {
  // Add analytics
  await addDoc(collection(db, 'analytics'), {
    userId,
    totalHours: 48.5,
    completedTasks: 12,
    totalTasks: 15,
    progress: 85,
    weeklyData: [
      { name: 'Mon', hours: 4.5, date: Timestamp.now() },
      { name: 'Tue', hours: 5.0, date: Timestamp.now() },
      { name: 'Wed', hours: 3.8, date: Timestamp.now() },
    ]
  });

  // Add sample projects and threads similarly
};
