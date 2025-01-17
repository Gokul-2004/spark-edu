// src/components/Dashboard/NotificationsDropdown.js
import React from 'react';

const notifications = [
 { id: 1, text: 'Alex commented on your post', time: '2m ago', read: false },
 { id: 2, text: 'New study group invitation', time: '1h ago', read: false },
 { id: 3, text: 'Assignment due tomorrow', time: '3h ago', read: false }
];

const NotificationsDropdown = ({ darkMode }) => (
 <div className={`absolute right-0 mt-2 w-80 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg`}>
   <div className="p-4">
     <h3 className="font-semibold mb-4">Notifications</h3>
     <div className="space-y-3">
       {notifications.map(notification => (
         <div key={notification.id} className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-beige-50'}`}>
           <p className={notification.read ? 'text-gray-500' : 'font-medium'}>
             {notification.text}
           </p>
           <p className="text-sm text-gray-500">{notification.time}</p>
         </div>
       ))}
     </div>
   </div>
 </div>
);

export default NotificationsDropdown;
