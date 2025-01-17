// src/components/Dashboard/MessagesDropdown.js
import React from 'react';

const messages = [
  { id: 1, sender: 'Sarah Johnson', content: 'Hey, did you get the notes?', time: '5m ago', unread: true },
  { id: 2, sender: 'Alex Thompson', content: 'Project meeting at 3?', time: '1h ago', unread: true },
  { id: 3, sender: 'Mike Chen', content: 'Thanks for the help!', time: '2h ago', unread: false }
];

const MessagesDropdown = ({ darkMode }) => (
  <div className={`absolute right-0 mt-2 w-80 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg`}>
    <div className="p-4">
      <h3 className="font-semibold mb-4">Messages</h3>
      <div className="space-y-3">
        {messages.map(message => (
          <div key={message.id} className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-beige-50'}`}>
            <p className="font-medium">{message.sender}</p>
            <p className={`text-sm ${message.unread ? 'font-medium' : 'text-gray-500'}`}>
              {message.content}
            </p>
            <p className="text-xs text-gray-500">{message.time}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default MessagesDropdown;
