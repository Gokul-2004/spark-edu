// src/components/Dashboard/Header.js
import React, { useState } from 'react';
import { Bell, MessageSquare } from 'lucide-react';
import { auth } from '../../utils/firebase';
import NotificationsDropdown from './NotificationsDropdown';
import MessagesDropdown from './MessagesDropdown';

const Header = ({ darkMode, setDarkMode }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMessages, setShowMessages] = useState(false);

  return (
    <nav className={`${darkMode ? 'bg-gray-800' : 'bg-beige-200'} shadow-lg fixed w-full z-10`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <span className="text-2xl font-bold">Spark</span>
          </div>
          <div className="flex items-center space-x-6">
            <button onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? '☀️' : '🌙'}
            </button>
            <div className="relative">
              <Bell 
                className="w-6 h-6 cursor-pointer" 
                onClick={() => setShowNotifications(!showNotifications)}
              />
              {showNotifications && <NotificationsDropdown darkMode={darkMode} />}
            </div>
            <div className="relative">
              <MessageSquare 
                className="w-6 h-6 cursor-pointer"
                onClick={() => setShowMessages(!showMessages)} 
              />
              {showMessages && <MessagesDropdown darkMode={darkMode} />}
            </div>
            <button onClick={() => auth.signOut()}>
              <img src="/api/placeholder/40/40" alt="Profile" className="w-10 h-10 rounded-full" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
