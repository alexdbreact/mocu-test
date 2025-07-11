'use client';
import { FaBell, FaCheck, FaReply } from 'react-icons/fa';

export default function Notification({ notification, onMarkAsRead, onReply }) {
  return (
    <div className={`p-4 rounded-lg shadow mb-2 ${notification.isRead ? 'bg-white' : 'bg-blue-50'}`}>
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center mb-1">
            <FaBell className={`mr-2 ${notification.isRead ? 'text-gray-400' : 'text-blue-500'}`} />
            <p className={`font-medium ${notification.isRead ? 'text-gray-600' : 'text-gray-900'}`}>
              {notification.message}
            </p>
          </div>
          <p className="text-sm text-gray-500">
            {new Date(notification.createdAt).toLocaleString()}
          </p>
          {notification.requiresAction && !notification.actionTaken && (
            <p className="mt-1 text-sm text-yellow-600">Action required</p>
          )}
          {notification.actionResponse && (
            <p className="mt-1 text-sm text-gray-600">
              <span className="font-medium">Your response:</span> {notification.actionResponse}
            </p>
          )}
        </div>
        <div className="flex space-x-2">
          {!notification.isRead && (
            <button
              onClick={() => onMarkAsRead(notification._id)}
              className="p-1 text-gray-500 hover:text-gray-700"
              title="Mark as read"
            >
              <FaCheck />
            </button>
          )}
          {notification.requiresAction && !notification.actionTaken && (
            <button
              onClick={() => onReply(notification._id)}
              className="p-1 text-blue-500 hover:text-blue-700"
              title="Reply"
            >
              <FaReply />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}