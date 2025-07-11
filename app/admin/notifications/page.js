'use client';
import { useState, useEffect } from 'react';
import AdminSidebar from '../../../components/AdminSidebar';
import Notification from '../../../components/Notification';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState('');

  useEffect(() => {
    // Simulate fetching notifications
    setTimeout(() => {
      setNotifications([
        {
          _id: '1',
          employee: { _id: '1', name: 'John Doe' },
          message: 'Please provide documentation for your last absence',
          isRead: false,
          requiresAction: true,
          actionTaken: false,
          createdAt: '2023-06-10T10:00:00Z'
        },
        {
          _id: '2',
          employee: { _id: '2', name: 'Jane Smith' },
          message: 'Your request for June 15th has been approved',
          isRead: true,
          requiresAction: false,
          createdAt: '2023-06-09T14:30:00Z'
        }
      ]);
    }, 500);
  }, []);

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n._id === id ? { ...n, isRead: true } : n
    ));
  };

  const sendNotification = () => {
    if (!newMessage || !selectedEmployee) return;
    
    const newNotif = {
      _id: Date.now().toString(),
      employee: { _id: selectedEmployee, name: `Employee ${selectedEmployee}` },
      message: newMessage,
      isRead: false,
      requiresAction: true,
      actionTaken: false,
      createdAt: new Date().toISOString()
    };
    
    setNotifications([newNotif, ...notifications]);
    setNewMessage('');
    setSelectedEmployee('');
  };

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Notifications</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Employee Notifications</h2>
              <div className="space-y-4">
                {notifications.length === 0 ? (
                  <p className="text-gray-500">No notifications found.</p>
                ) : (
                  notifications.map(notification => (
                    <Notification
                      key={notification._id}
                      notification={notification}
                      onMarkAsRead={markAsRead}
                      onReply={() => {}}
                    />
                  ))
                )}
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Send Notification</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Employee</label>
                <select
                  value={selectedEmployee}
                  onChange={(e) => setSelectedEmployee(e.target.value)}
                  className="w-full p-2 border rounded"
                >
                  <option value="">Select Employee</option>
                  {Array.from({ length: 12 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>Employee {i + 1}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="w-full p-2 border rounded"
                  rows="4"
                ></textarea>
              </div>
              <button
                onClick={sendNotification}
                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                disabled={!newMessage || !selectedEmployee}
              >
                Send Notification
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}