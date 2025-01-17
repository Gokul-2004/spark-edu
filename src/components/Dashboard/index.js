// src/components/Dashboard/index.js
import React, { useState } from 'react';
import { Bell, MessageSquare, Search, Users, BookOpen, Award, Settings, BarChart2, Book, FileText, Folder, MessageCircle, Users2, LogOut } from 'lucide-react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import MainContent from './MainContent';

const Dashboard = () => {
 const [activeSection, setActiveSection] = useState('feed');
 const [darkMode, setDarkMode] = useState(false);
 const [showNotifications, setShowNotifications] = useState(false);
 const [showMessages, setShowMessages] = useState(false);
 const { user, logout } = useAuth();
 const navigate = useNavigate();

 const handleLogout = async () => {
   try {
     await logout();
     navigate('/login', { replace: true });
   } catch (error) {
     console.error('Error logging out:', error);
   }
 };

 const sidebarItems = [
   { icon: <Users2 size={20} />, label: 'Community', id: 'community' },
   { icon: <Folder size={20} />, label: 'Organizing', id: 'organizing' },
   { icon: <Users size={20} />, label: 'Collaborating', id: 'collaborating' },
   { icon: <FileText size={20} />, label: 'Study Forum', id: 'forum' },
   { icon: <MessageCircle size={20} />, label: 'Q&A', id: 'qa' },
   { icon: <BarChart2 size={20} />, label: 'Analytics', id: 'analytics' },
   { icon: <Book size={20} />, label: 'Resources', id: 'resources' }
 ];

 return (
   <div className={`min-h-screen ${darkMode ? 'bg-black' : 'bg-[#f8f4f0]'}`}>
     {/* Navigation */}
     <nav className={`${darkMode ? 'bg-gray-900' : 'bg-white'} shadow-lg fixed w-full z-10`}>
       <div className="max-w-7xl mx-auto px-4">
         <div className="flex justify-between h-16">
           <div className="flex items-center">
             <span className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Spark</span>
             <div className="ml-6 flex space-x-4">
               <Search className={darkMode ? 'text-white' : 'text-gray-800'} />
               <input
                 type="text"
                 placeholder="Search..."
                 className="w-64 rounded-lg border-0 bg-gray-100"
               />
             </div>
           </div>
           <div className="flex items-center space-x-6">
             <button onClick={() => setDarkMode(!darkMode)}>
               {darkMode ? '☀️' : '🌙'}
             </button>
             <Bell className="w-6 h-6 cursor-pointer" onClick={() => setShowNotifications(!showNotifications)} />
             <MessageSquare className="w-6 h-6 cursor-pointer" onClick={() => setShowMessages(!showMessages)} />
             <div className="relative flex items-center space-x-3">
               <img src="/api/placeholder/40/40" alt="Profile" className="w-10 h-10 rounded-full" />
               <button 
                 onClick={handleLogout}
                 className="flex items-center space-x-2 text-gray-600 hover:text-red-600"
               >
                 <LogOut size={20} />
                 <span className="text-sm">Logout</span>
               </button>
             </div>
           </div>
         </div>
       </div>
     </nav>

     {/* Main Content Area */}
     <div className="pt-16 flex">
       {/* Sidebar */}
       <div className={`w-64 ${darkMode ? 'bg-gray-900' : 'bg-white'} shadow-lg fixed h-full`}>
         <div className="p-4">
           <div className="space-y-2">
             {sidebarItems.map((item) => (
               <button
                 key={item.id}
                 onClick={() => setActiveSection(item.id)}
                 className={`flex items-center space-x-3 w-full p-3 rounded-lg transition-colors ${
                   activeSection === item.id 
                     ? darkMode 
                       ? 'bg-gray-800 text-[#d4b895]' 
                       : 'bg-[#f8f4f0] text-gray-800'
                     : darkMode
                       ? 'text-gray-300 hover:bg-gray-800'
                       : 'text-gray-700 hover:bg-[#f8f4f0]'
                 }`}
               >
                 {item.icon}
                 <span>{item.label}</span>
               </button>
             ))}
           </div>
         </div>
       </div>

       {/* Content Area */}
       <div className="flex-1 ml-64">
         <div className="max-w-4xl mx-auto py-6 px-4">
           <MainContent 
             activeSection={activeSection} 
             darkMode={darkMode} 
             user={user}
           />
         </div>
       </div>

       {/* Notifications Dropdown */}
       {showNotifications && (
         <div className={`fixed right-20 top-16 w-80 ${darkMode ? 'bg-gray-900' : 'bg-white'} rounded-lg shadow-xl z-20`}>
           <div className="p-4">
             <h3 className="font-semibold mb-4">Notifications</h3>
             <div className="space-y-4">
               <div className="p-3 hover:bg-gray-100 rounded-lg">
                 <p className="font-medium">New message from Alex</p>
                 <p className="text-sm text-gray-500">2 minutes ago</p>
               </div>
               <div className="p-3 hover:bg-gray-100 rounded-lg">
                 <p className="font-medium">Study group meeting reminder</p>
                 <p className="text-sm text-gray-500">1 hour ago</p>
               </div>
             </div>
           </div>
         </div>
       )}

       {/* Messages Dropdown */}
       {showMessages && (
         <div className={`fixed right-12 top-16 w-80 ${darkMode ? 'bg-gray-900' : 'bg-white'} rounded-lg shadow-xl z-20`}>
           <div className="p-4">
             <h3 className="font-semibold mb-4">Messages</h3>
             <div className="space-y-4">
               <div className="p-3 hover:bg-gray-100 rounded-lg cursor-pointer">
                 <div className="flex items-center space-x-3">
                   <img src="/api/placeholder/40/40" alt="User" className="w-10 h-10 rounded-full" />
                   <div>
                     <p className="font-medium">Sarah Johnson</p>
                     <p className="text-sm text-gray-500">Hey, did you get the notes?</p>
                   </div>
                 </div>
               </div>
               <div className="p-3 hover:bg-gray-100 rounded-lg cursor-pointer">
                 <div className="flex items-center space-x-3">
                   <img src="/api/placeholder/40/40" alt="User" className="w-10 h-10 rounded-full" />
                   <div>
                     <p className="font-medium">Alex Thompson</p>
                     <p className="text-sm text-gray-500">Project meeting at 3?</p>
                   </div>
                 </div>
               </div>
             </div>
           </div>
         </div>
       )}
     </div>
   </div>
 );
};

export default Dashboard;
