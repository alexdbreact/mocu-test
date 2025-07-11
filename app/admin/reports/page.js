'use client';
import { useState, useEffect } from 'react';
import AdminSidebar from '../../../components/AdminSidebar';
import { FaFileExcel, FaFilePdf, FaPrint } from 'react-icons/fa';

export default function ReportsPage() {
  const [reportData, setReportData] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    // Simulate fetching report data
    setTimeout(() => {
      const mockData = Array.from({ length: 12 }, (_, i) => ({
        id: i + 1,
        name: `Employee ${i + 1}`,
        regularAbsences: 5 + (i % 4),
        emergencyAbsences: 1 + (i % 3),
        delayHours: i % 2 === 0 ? 0 : i % 3 === 0 ? 2 : 1,
        missionDays: i % 5,
        remainingRegular: 30 - (5 + (i % 4)),
        remainingEmergency: 7 - (1 + (i % 3))
      }));
      setReportData(mockData);
    }, 500);
  }, []);

  const handleGenerateReport = () => {
    // In a real app, this would filter the data based on dates
    alert(`Report generated for ${startDate} to ${endDate}`);
  };

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Reports</h1>
        
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Generate Report</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={handleGenerateReport}
                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              >
                Generate Report
              </button>
            </div>
          </div>
          <div className="flex space-x-2">
            <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
              <FaFileExcel className="mr-2" /> Export to Excel
            </button>
            <button className="flex items-center px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
              <FaFilePdf className="mr-2" /> Export to PDF
            </button>
            <button className="flex items-center px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">
              <FaPrint className="mr-2" /> Print
            </button>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Regular Absences</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Emergency Absences</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delay Hours</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mission Days</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Remaining Regular</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Remaining Emergency</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {reportData.map((employee) => (
                <tr key={employee.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{employee.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.regularAbsences}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.emergencyAbsences}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.delayHours}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.missionDays}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.remainingRegular}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.remainingEmergency}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}