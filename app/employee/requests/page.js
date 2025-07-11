'use client';
import { useState, useEffect } from 'react';
import EmployeeSidebar from '../../../components/EmployeeSidebar';
import AbsenceForm from '../../../components/AbsenceForm';
import AbsenceList from '../../../components/AbsenceList';

export default function RequestsPage() {
  const [requests, setRequests] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    // Simulate fetching requests
    setTimeout(() => {
      setRequests([
        {
          _id: '1',
          type: 'regular',
          startDate: '2023-06-05',
          endDate: '2023-06-07',
          reason: 'Family vacation',
          status: 'approved',
          createdAt: '2023-05-30T10:00:00Z'
        },
        {
          _id: '2',
          type: 'delay',
          hours: 2,
          startDate: '2023-06-12',
          reason: 'Doctor appointment',
          status: 'pending',
          createdAt: '2023-06-10T14:30:00Z'
        },
        {
          _id: '3',
          type: 'emergency',
          startDate: '2023-06-15',
          reason: 'Family emergency',
          status: 'rejected',
          adminComment: 'Please provide documentation',
          createdAt: '2023-06-14T08:15:00Z'
        }
      ]);
    }, 500);
  }, []);

  const handleSubmitRequest = (absenceData) => {
    // In a real app, this would send to the server
    const newRequest = {
      _id: Date.now().toString(),
      ...absenceData,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    setRequests([newRequest, ...requests]);
    setShowForm(false);
  };

  return (
    <div className="flex min-h-screen">
      <EmployeeSidebar />
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Absence Requests</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {showForm ? 'Cancel' : 'New Request'}
          </button>
        </div>
        
        {showForm && (
          <div className="bg-white p-6 rounded-lg shadow mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">New Absence Request</h2>
            <AbsenceForm onSubmit={handleSubmitRequest} />
          </div>
        )}
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">My Requests</h2>
          <AbsenceList absences={requests} />
        </div>
      </div>
    </div>
  );
}