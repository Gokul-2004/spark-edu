// src/components/auth/Login.js
import React, { useState } from 'react';
import { auth } from '../../utils/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const [error, setError] = useState('');
 const navigate = useNavigate();

 const handleSubmit = async (e) => {
   e.preventDefault();
   try {
     await signInWithEmailAndPassword(auth, email, password);
     navigate('/');
   } catch (error) {
     setError('Invalid credentials');
   }
 };

 return (
   <div className="min-h-screen bg-beige-50 flex items-center justify-center">
     <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
       <h2 className="text-2xl font-bold text-center mb-6">Login to Spark</h2>
       {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
       <form onSubmit={handleSubmit} className="space-y-6">
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
           />
         </div>
         <button
           type="submit"
           className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-beige-600 hover:bg-beige-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-beige-500"
         >
           Sign In
         </button>
         <div className="text-center">
           <p className="text-sm text-gray-600">
             Don't have an account?{' '}
             <button
               type="button"
               onClick={() => navigate('/register')}
               className="text-beige-600 hover:text-beige-500"
             >
               Register
             </button>
           </p>
         </div>
       </form>
     </div>
   </div>
 );
};

export default Login;
