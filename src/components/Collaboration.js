// src/components/Dashboard/Collaboration.js
import React, { useState } from 'react';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../../utils/firebase';
import { useFirestore } from '../../hooks/useFirestore';
import { auth } from '../../utils/firebase';

const Collaboration = ({ darkMode }) => {
  const [postContent, setPostContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: posts, loading } = useFirestore('posts');

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
        <textarea
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
          placeholder="Share your thoughts..."
          className={`w-full rounded-lg p-3 ${
            darkMode ? 'bg-gray-700 text-white' : 'bg-[#f8f4f0]'
          }`}
          rows="3"
        />
        <button
          type="submit"
          disabled={isSubmitting || !postContent.trim()}
          className={`bg-[#d4b895] text-white px-4 py-2 rounded-lg ${
            isSubmitting || !postContent.trim()
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:bg-[#c4a885]'
          }`}
        >
          {isSubmitting ? 'Posting...' : 'Post'}
        </button>
      </form>

      <div className="space-y-4">
        {loading ? (
          <div className="text-center">Loading posts...</div>
        ) : (
          posts.map((post) => (
            <div
              key={post.id}
              className={`p-4 rounded-lg ${
                darkMode ? 'bg-gray-800' : 'bg-[#f8f4f0]'
              }`}
            >
              <div className="flex justify-between items-start">
                <h3 className="font-semibold">{post.userName}</h3>
                <span className={`text-sm ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {post.createdAt.toDate().toLocaleDateString()}
                </span>
              </div>
              <p className="mt-2">{post.content}</p>
              <div className="mt-2 text-sm text-gray-500">
                {post.likes} likes
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Collaboration;
