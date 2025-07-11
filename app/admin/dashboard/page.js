'use client';
import { useEffect, useState } from 'react';
import AdminSidebar from '../../../components/AdminSidebar';
import StatsCard from '../../../components/StatsCard';
import AbsenceList from '../../../components/AbsenceList';

export default function AdminDashboard() {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [stats, setStats] = useState({
    totalEmployees: 0,
    pendingRequests: 0,
    approvedRequests: 0,
    rejectedRequests: 0
  });

  useEffect(() => {
    // Simulate fetching data
    const fetchData = async () => {
      // In a real app, you would fetch from your API
      setTimeout(() => {
        setPendingRequests([
          {
            _id: '1',
            employee: { name: 'John Doe' },
            type: 'regular',
            startDate: '2023-06-15',
            endDate: '2023-06-16',
            reason: 'Family vacation',
            status: 'pending',
            createdAt: '2023-06-10T10:00:00Z'
          },
          {
            _id: '2',
            employee: { name: 'Jane Smith' },
            type: 'delay',
            hours: 2,
            startDate: '2023-06-17',
            reason: 'Doctor appointment',
            status: 'pending',
            createdAt: '2023-06-11T14:30:00Z'
          }
        ]);
        
        setStats({
          totalEmployees: 12,
          pendingRequests: 5,
          approvedRequests: 42,
          rejectedRequests: 8
        });
      }, 500);
    };
    
    fetchData();
  }, []);

  const handleApprove = (id) => {
    setPendingRequests(pendingRequests.filter(req => req._id !== id));
    setStats(prev => ({
      ...prev,
      pendingRequests: prev.pendingRequests - 1,
      approvedRequests: prev.approvedRequests + 1
    }));
  };

  const handleReject = (id) => {
    setPendingRequests(pendingRequests.filter(req => req._id !== id));
    setStats(prev => ({
      ...prev,
      pendingRequests: prev.pendingRequests - 1,
      rejectedRequests: prev.rejectedRequests + 1
    }));
  };

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatsCard title="Total Employees" value={stats.totalEmployees} icon="regular" color="blue" />
          <StatsCard title="Pending Requests" value={stats.pendingRequests} icon="delay" color="yellow" />
          <StatsCard title="Approved Requests" value={stats.approvedRequests} icon="regular" color="green" />
          <StatsCard title="Rejected Requests" value={stats.rejectedRequests} icon="emergency" color="red" />
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Pending Absence Requests</h2>
          <AbsenceList 
            absences={pendingRequests} 
            isAdmin={true} 
            onApprove={handleApprove} 
            onReject={handleReject} 
          />
        </div>
      </div>
    </div>
  );
}