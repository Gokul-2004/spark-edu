// src/components/Dashboard/Sidebar.js
import React from 'react';
import { Users2, Folder, Users, FileText, MessageCircle, BarChart2, Book } from 'lucide-react';

const sidebarItems = [
 { icon: <Users2 size={20} />, label: 'Community', id: 'community' },
 { icon: <Folder size={20} />, label: 'Organizing', id: 'organizing' },
 { icon: <Users size={20} />, label: 'Collaborating', id: 'collaborating' },
 { icon: <FileText size={20} />, label: 'Study Forum', id: 'forum' },
 { icon: <MessageCircle size={20} />, label: 'Q&A', id: 'qa' },
 { icon: <BarChart2 size={20} />, label: 'Analytics', id: 'analytics' },
 { icon: <Book size={20} />, label: 'Resources', id: 'resources' }
];

const Sidebar = ({ activeSection, setActiveSection, darkMode }) => (
 <div className={`w-64 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg fixed h-full`}>
   <div className="p-4">
     <div className="space-y-4">
       {sidebarItems.map((item) => (
         <button
           key={item.id}
           onClick={() => setActiveSection(item.id)}
           className={`flex items-center space-x-3 w-full p-3 rounded-lg transition-colors ${
             activeSection === item.id 
               ? darkMode 
                 ? 'bg-gray-700 text-beige-300' 
                 : 'bg-beige-100 text-gray-800'
               : darkMode
                 ? 'text-gray-300 hover:bg-gray-700'
                 : 'text-gray-700 hover:bg-beige-50'
           }`}
         >
           {item.icon}
           <span>{item.label}</span>
         </button>
       ))}
     </div>
   </div>
 </div>
);

export default Sidebar;
