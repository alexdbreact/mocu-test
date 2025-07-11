'use client';
import { useState, useEffect } from 'react';
import EmployeeSidebar from '../../../components/EmployeeSidebar';
import Notification from '../../../components/Notification';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [replyText, setReplyText] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);

  useEffect(() => {
    // Simulate fetching notifications
    setTimeout(() => {
      setNotifications([
        {
          _id: '1',
          message: 'Please provide documentation for your absence on June 15th',
          isRead: false,
          requiresAction: true,
          actionTaken: false,
          createdAt: '2023-06-16T10:00:00Z'
        },
        {
          _id: '2',
          message: 'Your request for June 12th has been approved',
          isRead: true,
          requiresAction: false,
          createdAt: '2023-06-11T14:30:00Z'
        },
        {
          _id: '3',
          message: 'Team meeting scheduled for June 20th at 10 AM',
          isRead: true,
          requiresAction: false,
          createdAt: '2023-06-10T09:15:00Z'
        }
      ]);
    }, 500);
  }, []);

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n._id === id ? { ...n, isRead: true } : n
    ));
  };

  const startReply = (id) => {
    setReplyingTo(id);
    setReplyText('');
  };

  const sendReply = () => {
    if (!replyText || !replyingTo) return;
    
    setNotifications(notifications.map(n => 
      n._id === replyingTo ? { 
        ...n, 
        actionTaken: true, 
        actionResponse: replyText,
        isRead: true
      } : n
    ));
    
    setReplyingTo(null);
    setReplyText('');
  };

  return (
    <div className="flex min-h-screen">
      <EmployeeSidebar />
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Notifications</h1>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">My Notifications</h2>
            <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
              {notifications.filter(n => !n.isRead).length} unread
            </span>
          </div>
          
          <div className="space-y-4">
            {notifications.length === 0 ? (
              <p className="text-gray-500">No notifications found.</p>
            ) : (
              notifications.map(notification => (
                <div key={notification._id}>
                  <Notification
                    notification={notification}
                    onMarkAsRead={markAsRead}
                    onReply={startReply}
                  />
                  {replyingTo === notification._id && (
                    <div className="mt-2 ml-10 bg-gray-50 p-3 rounded">
                      <textarea
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        className="w-full p-2 border rounded mb-2"
                        rows="3"
                        placeholder="Type your response here..."
                      ></textarea>
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => setReplyingTo(null)}
                          className="px-3 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={sendReply}
                          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                          Send Response
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}