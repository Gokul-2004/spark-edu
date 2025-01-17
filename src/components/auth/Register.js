// src/components/auth/Register.js
import React, { useState } from 'react';
import { auth, db } from '../../utils/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Register = () => {
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const [name, setName] = useState('');
 const [error, setError] = useState('');
 const navigate = useNavigate();

 const handleSubmit = async (e) => {
   e.preventDefault();
   try {
     // Create auth user
     const { user } = await createUserWithEmailAndPassword(auth, email, password);
     
     // Create user document in Firestore
     await setDoc(doc(db, 'users', user.uid), {
       name,
       email,
       role: 'student',
       createdAt: new Date().toISOString()
     });

     // Create initial analytics document
     await setDoc(doc(db, 'analytics', user.uid), {
       userId: user.uid,
       totalHours: 0,
       completedTasks: 0,
       totalTasks: 0,
       progress: 0,
       weeklyData: [
         { name: 'Mon', hours: 0 },
         { name: 'Tue', hours: 0 },
         { name: 'Wed', hours: 0 },
         { name: 'Thu', hours: 0 },
         { name: 'Fri', hours: 0 },
         { name: 'Sat', hours: 0 },
         { name: 'Sun', hours: 0 }
       ]
     });

     navigate('/');
   } catch (error) {
     setError(error.message);
   }
 };

 return (
   <div className="min-h-screen bg-beige-50 flex items-center justify-center">
     <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
       <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>
       {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
       <form onSubmit={handleSubmit} className="space-y-6">
         <div>
           <label className="block text-sm font-medium text-gray-700">Full Name</label>
           <input
             type="text"
             value={name}
             onChange={(e) => setName(e.target.value)}
             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-beige-500 focus:ring-beige-500"
             required
           />
         </div>
         <div>
           <label className="block text-sm font-medium text-gray-700">Email</label>
           <input
             type="email"
             value={email}
             onChange={(e) => setEmail(e.target.value)}
             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-beige-500 focus:ring-beige-500"
             required
           />
         </div>
         <div>
           <label className="block text-sm font-medium text-gray-700">Password</label>
           <input
             type="password"
             value={password}
             onChange={(e) => setPassword(e.target.value)}
             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-beige-500 focus:ring-beige-500"
             required
             minLength={6}
           />
         </div>
         <button
           type="submit"
           className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-beige-600 hover:bg-beige-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-beige-500"
         >
           Register
         </button>
         <div className="text-center">
           <p className="text-sm text-gray-600">
             Already have an account?{' '}
             <button
               type="button"
               onClick={() => navigate('/login')}
               className="text-beige-600 hover:text-beige-500"
             >
               Login
             </button>
           </p>
         </div>
       </form>
     </div>
   </div>
 );
};

export default Register;
