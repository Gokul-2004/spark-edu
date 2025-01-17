

import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { collection, addDoc, Timestamp, deleteDoc, doc, getDoc } from 'firebase/firestore';
import { db } from '../../utils/firebase';
import { useFirestore } from '../../hooks/useFirestore';
import { auth } from '../../utils/firebase';
import { Trash2, ThumbsUp } from 'lucide-react';  // Make sure you have lucide-react installed

const Collaboration = ({ darkMode }) => {
  const [postContent, setPostContent] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const { data: posts, loading } = useFirestore('posts');
  
  const deletePost = async (postId) => {
    try {
      const user = auth.currentUser;
      const postRef = doc(db, 'posts', postId);
      const postDoc = await getDoc(postRef);
      
      if (postDoc.data().userId === user.uid) {
        await deleteDoc(postRef);
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };
  console.log('Posts from Firestore:', posts);  // Add this line to debug

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!postContent.trim()) return;

    setIsSubmitting(true);
    try {
      const user = auth.currentUser;
      await addDoc(collection(db, 'posts'), {
        content: postContent.trim(),
        userId: user.uid,
        userName: user.displayName || 'Anonymous',
        createdAt: Timestamp.now(),
        likes: 0
      });
      setPostContent('');
    } catch (error) {
      console.error('Error adding post:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className={`p-4 rounded-lg shadow-sm ${darkMode ? 'bg-gray-800' : 'bg-[#f8f4f0]'}`}>
          <textarea
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            placeholder="Share your thoughts..."
            className={`w-full rounded-lg p-3 min-h-[120px] resize-none transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#d4b895] ${
              darkMode ? 'bg-gray-700 text-white' : 'bg-white'
            }`}
            rows="3"
          />
          <div className="mt-4 flex items-center justify-between">
            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {postContent.length} / 500 characters
            </div>
            <button
              type="submit"
              disabled={isSubmitting || !postContent.trim()}
              className={`bg-[#d4b895] text-white px-6 py-2 rounded-full transition-all duration-200 ${
                isSubmitting || !postContent.trim()
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-[#c4a885] hover:shadow-md transform hover:-translate-y-0.5'
              }`}
            >
              {isSubmitting ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Posting...</span>
                </div>
              ) : (
                'Post'
              )}
            </button>
          </div>
        </div>
      </form>

      <div className="space-y-4">
        {loading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#d4b895]"></div>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No posts yet. Be the first to share your thoughts!
          </div>
        ) : (
          posts.map((post) => (
            <div
              key={post.id}
              className={`p-6 rounded-lg shadow-sm transition-all duration-200 hover:shadow-md ${
                darkMode ? 'bg-gray-800' : 'bg-[#f8f4f0]'
              }`}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center space-x-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    darkMode ? 'bg-gray-700' : 'bg-[#e8d4c0]'
                  }`}>
                    {post.userName.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-semibold">{post.userName}</h3>
                    <span className={`text-xs ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {post.createdAt.toDate().toLocaleString()}
                    </span>
                  </div>
                </div>
                {auth.currentUser && post.userId === auth.currentUser.uid && (
                  <button
                    onClick={() => deletePost(post.id)}
                    className={`p-2 rounded-full transition-colors duration-200 ${
                      darkMode 
                        ? 'hover:bg-gray-700 text-gray-400 hover:text-red-400' 
                        : 'hover:bg-[#e8d4c0] text-gray-600 hover:text-red-600'
                    }`}
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
              <p className={`mt-2 text-base leading-relaxed ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {post.content}
              </p>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <button 
                    className={`flex items-center space-x-1 px-3 py-1 rounded-full transition-colors duration-200 ${
                      darkMode 
                        ? 'hover:bg-gray-700 text-gray-400' 
                        : 'hover:bg-[#e8d4c0] text-gray-600'
                    }`}
                  >
                    <ThumbsUp size={14} />
                    <span className="text-sm">{post.likes}</span>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export const MainContent = ({ activeSection, darkMode }) => {
  const studyData = [
    { name: 'Mon', hours: 4.5 },
    { name: 'Tue', hours: 5.0 },
    { name: 'Wed', hours: 3.8 },
    { name: 'Thu', hours: 4.2 },
    { name: 'Fri', hours: 3.5 },
    { name: 'Sat', hours: 2.0 },
    { name: 'Sun', hours: 1.5 }
  ];

  switch (activeSection) {
    case 'analytics':
      return (
        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-[#f8f4f0]'}`}>
              <h3 className="font-semibold">Study Hours</h3>
              <p className="text-2xl font-bold text-[#d4b895]">48.5</p>
            </div>
            <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-[#f8f4f0]'}`}>
              <h3 className="font-semibold">Tasks Done</h3>
              <p className="text-2xl font-bold text-[#d4b895]">12/15</p>
            </div>
            <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-[#f8f4f0]'}`}>
              <h3 className="font-semibold">Progress</h3>
              <p className="text-2xl font-bold text-[#d4b895]">85%</p>
            </div>
          </div>
          <div className="h-80">
            <LineChart width={800} height={300} data={studyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" stroke={darkMode ? "#fff" : "#000"} />
              <YAxis stroke={darkMode ? "#fff" : "#000"} />
              <Tooltip contentStyle={{ backgroundColor: darkMode ? '#1f2937' : '#fff' }} />
              <Legend />
              <Line type="monotone" dataKey="hours" stroke="#d4b895" strokeWidth={2} />
            </LineChart>
          </div>
        </div>
      );

    case 'community':
      return (
        <div className="space-y-6">
          <h2 className="text-xl font-bold">Study Groups</h2>
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((group) => (
              <div key={group} className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-[#f8f4f0]'}`}>
                <h3 className="font-semibold">Study Group {group}</h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>25 members</p>
                <button className="mt-2 text-[#d4b895] hover:text-[#c4a885]">Join Group</button>
              </div>
            ))}
          </div>
        </div>
      );

    case 'organizing':
      return (
        <div className="space-y-6">
          <h2 className="text-xl font-bold">Projects</h2>
          <div className="grid grid-cols-1 gap-4">
            {[1, 2, 3].map((project) => (
              <div key={project} className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-[#f8f4f0]'}`}>
                <h3 className="font-semibold">Project {project}</h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Due next week</p>
                <div className="mt-2 space-x-2">
                  <button className="text-[#d4b895] hover:text-[#c4a885]">Edit</button>
                  <button className="text-[#d4b895] hover:text-[#c4a885]">Share</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      );

    case 'forum':
      return (
        <div className="space-y-6">
          <h2 className="text-xl font-bold">Study Forum</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((thread) => (
              <div key={thread} className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-[#f8f4f0]'}`}>
                <h3 className="font-semibold">Discussion Thread {thread}</h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>10 replies • Active</p>
                <button className="mt-2 text-[#d4b895] hover:text-[#c4a885]">View Thread</button>
              </div>
            ))}
          </div>
        </div>
      );

    case 'qa':
      return (
        <div className="space-y-6">
          <h2 className="text-xl font-bold">Questions & Answers</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((qa) => (
              <div key={qa} className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-[#f8f4f0]'}`}>
                <h3 className="font-semibold">Question {qa}</h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>5 answers • Posted 1h ago</p>
                <button className="mt-2 text-[#d4b895] hover:text-[#c4a885]">Answer</button>
              </div>
            ))}
          </div>
        </div>
      );

    case 'resources':
      return (
        <div className="space-y-6">
          <h2 className="text-xl font-bold">Learning Resources</h2>
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((resource) => (
              <div key={resource} className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-[#f8f4f0]'}`}>
                <h3 className="font-semibold">Resource {resource}</h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>PDF • 2.5MB</p>
                <button className="mt-2 text-[#d4b895] hover:text-[#c4a885]">Download</button>
              </div>
            ))}
          </div>
        </div>
      );

    default:
      return <Collaboration darkMode={darkMode} />;
  }
};

export default MainContent;
