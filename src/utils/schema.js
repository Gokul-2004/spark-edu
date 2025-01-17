// src/utils/schema.js

const firestoreSchema = {
  posts: {
    id: 'auto-generated',
    content: 'string',
    userId: 'string',
    userName: 'string',
    createdAt: 'timestamp',
    likes: 'number'
  },
  projects: {
    id: 'auto-generated',
    title: 'string',
    description: 'string',
    dueDate: 'timestamp',
    userId: 'string',
    status: 'string'
  },
  threads: {
    id: 'auto-generated',
    title: 'string',
    content: 'string',
    userId: 'string',
    replyCount: 'number',
    isActive: 'boolean',
    createdAt: 'timestamp'
  },
  analytics: {
    userId: 'string',
    totalHours: 'number',
    completedTasks: 'number',
    totalTasks: 'number',
    progress: 'number',
    weeklyData: 'array'
  }
  studyGroups: {
    id: 'auto-generated',
    name: 'string',
    description: 'string',
    memberCount: 'number',
    members: 'array', // array of user IDs
    createdAt: 'timestamp',
    createdBy: 'string' // user ID
  },
  
  projects: {
    id: 'auto-generated',
    title: 'string',
    description: 'string',
    dueDate: 'timestamp',
    status: 'string', // 'pending', 'in-progress', 'completed'
    members: 'array', // array of user IDs
    createdBy: 'string', // user ID
    updatedAt: 'timestamp'
  },
  
  resources: {
    id: 'auto-generated',
    title: 'string',
    description: 'string',
    fileUrl: 'string',
    fileType: 'string',
    fileSize: 'number',
    uploadedBy: 'string', // user ID
    uploadedAt: 'timestamp',
    downloads: 'number'
  }
  
};

export default firestoreSchema;
