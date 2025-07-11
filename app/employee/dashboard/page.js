'use client';
import { useState, useEffect } from 'react';
import EmployeeSidebar from '../../../components/EmployeeSidebar';
import StatsCard from '../../../components/StatsCard';

export default function EmployeeDashboard() {
  const [employeeData, setEmployeeData] = useState(null);
  const [recentRequests, setRecentRequests] = useState([]);

  useEffect(() => {
    // Simulate fetching employee data
    setTimeout(() => {
      setEmployeeData({
        name: 'John Doe',
        position: 'Software Developer',
        regularAbsenceCredit: 22,
        emergencyAbsenceCredit: 5,
        delayAbsenceCount: 1,
        lastDelayReset: '2023-06-01'
      });
      
      setRecentRequests([
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
        }
      ]);
    }, 500);
  }, []);

  return (
    <div className="flex min-h-screen">
      <EmployeeSidebar />
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Employee Dashboard</h1>
        
        {employeeData && (
          <div className="mb-8">
            <div className="bg-white p-6 rounded-lg shadow mb-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 h-16 w-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {employeeData.name.charAt(0)}
                </div>
                <div className="ml-4">
                  <h2 className="text-xl font-bold text-gray-800">{employeeData.name}</h2>
                  <p className="text-gray-600">{employeeData.position}</p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <StatsCard title="Regular Absences" value={`${employeeData.regularAbsenceCredit}/30`} icon="regular" color="blue" />
              <StatsCard title="Emergency Absences" value={`${employeeData.emergencyAbsenceCredit}/7`} icon="emergency" color="red" />
              <StatsCard title="Delay Count" value={`${employeeData.delayAbsenceCount}/2`} icon="delay" color="yellow" />
              <StatsCard title="Mission Days" value="Unlimited" icon="mission" color="green" />
            </div>
          </div>
        )}
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Absence Requests</h2>
          <div className="space-y-4">
            {recentRequests.length === 0 ? (
              <p className="text-gray-500">No recent requests found.</p>
            ) : (
              recentRequests.map(request => (
                <div key={request._id} className="p-4 border rounded-lg">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-medium capitalize">{request.type}</p>
                      <p className="text-sm text-gray-600">
                        {request.type === 'delay' ? (
                          `${request.hours} hour(s) on ${new Date(request.startDate).toLocaleDateString()}`
                        ) : (
                          `${new Date(request.startDate).toLocaleDateString()}${request.endDate ? ` to ${new Date(request.endDate).toLocaleDateString()}` : ''}`
                        )}
                      </p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      request.status === 'approved' ? 'bg-green-100 text-green-800' :
                      request.status === 'rejected' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {request.status}
                    </span>
                  </div>
                  <p className="mt-2 text-gray-700">{request.reason}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}