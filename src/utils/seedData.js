// src/utils/seedData.js
import { db } from './firebase';
import { collection, addDoc, setDoc, doc } from 'firebase/firestore';

export const seedData = async (userId) => {
  // User Profile
  await setDoc(doc(db, 'users', userId), {
    name: 'Sarah Johnson',
    university: 'Stanford University',
    major: 'Computer Science',
    connections: 500,
    courses: 12,
    certifications: 8,
    createdAt: new Date().toISOString()
  });

  // Analytics Data
  await setDoc(doc(db, 'analytics', userId), {
    studyHours: [
      { name: 'Mon', hours: 4.5 },
      { name: 'Tue', hours: 5.0 },
      { name: 'Wed', hours: 3.8 },
      { name: 'Thu', hours: 4.2 },
      { name: 'Fri', hours: 3.5 },
      { name: 'Sat', hours: 2.0 },
      { name: 'Sun', hours: 1.5 }
    ],
    totalHours: 48.5,
    completedTasks: 12,
    totalTasks: 15,
    progress: 85
  });

  // Posts
  const posts = [
    {
      userId,
      content: "Just finished my machine learning project! Check out the results...",
      author: "Sarah Johnson",
      university: "Stanford University",
      likes: 24,
      comments: 12,
      createdAt: new Date().toISOString()
    },
    {
      userId,
      content: "Study group for Advanced Algorithms tomorrow at 3 PM!",
      author: "Alex Thompson",
      university: "MIT",
      likes: 15,
      comments: 8,
      createdAt: new Date().toISOString()
    }
  ];

  for (const post of posts) {
    await addDoc(collection(db, 'posts'), post);
  }

  // Study Forums
  const forums = [
    {
      title: "Machine Learning Basics",
      description: "Discussion about ML fundamentals",
      replies: 15,
      views: 234,
      lastActivity: new Date().toISOString()
    },
    {
      title: "Data Structures Review",
      description: "Preparing for technical interviews",
      replies: 28,
      views: 456,
      lastActivity: new Date().toISOString()
    }
  ];

  for (const forum of forums) {
    await addDoc(collection(db, 'forums'), forum);
  }

  // Resources
  const resources = [
    {
      title: "Python Programming Guide",
      type: "PDF",
      size: "2.5 MB",
      downloads: 234,
      category: "Programming"
    },
    {
      title: "Machine Learning Cheatsheet",
      type: "PDF",
      size: "1.8 MB",
      downloads: 189,
      category: "AI/ML"
    }
  ];

  for (const resource of resources) {
    await addDoc(collection(db, 'resources'), resource);
  }

  // Messages
  const messages = [
    {
      senderId: userId,
      receiverId: "user2",
      content: "Hey, did you get the notes?",
      sender: "Sarah Johnson",
      createdAt: new Date().toISOString(),
      read: false
    },
    {
      senderId: "user2",
      receiverId: userId,
      content: "Project meeting at 3?",
      sender: "Alex Thompson",
      createdAt: new Date().toISOString(),
      read: false
    }
  ];

  for (const message of messages) {
    await addDoc(collection(db, 'messages'), message);
  }
};


