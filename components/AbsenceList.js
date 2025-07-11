'use client';
import { FaCheck, FaTimes, FaClock, FaInfoCircle, FaCalendarAlt, FaExclamationTriangle } from 'react-icons/fa';

export default function AbsenceList({ absences, isAdmin = false, onApprove, onReject }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'regular': return <FaCalendarAlt className="mr-1" />;
      case 'emergency': return <FaExclamationTriangle className="mr-1" />;
      case 'delay': return <FaClock className="mr-1" />;
      case 'mission': return <FaBriefcase className="mr-1" />;
      default: return <FaInfoCircle className="mr-1" />;
    }
  };

  return (
    <div className="space-y-4">
      {absences.length === 0 ? (
        <p className="text-gray-500">No absence requests found.</p>
      ) : (
        absences.map((absence) => (
          <div key={absence._id} className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center mb-1">
                  {getTypeIcon(absence.type)}
                  <span className="font-medium capitalize">{absence.type}</span>
                  <span className={`ml-2 px-2 py-1 text-xs rounded-full ${getStatusColor(absence.status)}`}>
                    {absence.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  {absence.type === 'delay' ? (
                    `${absence.hours} hour(s) on ${new Date(absence.startDate).toLocaleDateString()}`
                  ) : (
                    `${new Date(absence.startDate).toLocaleDateString()}${absence.endDate ? ` to ${new Date(absence.endDate).toLocaleDateString()}` : ''}`
                  )}
                </p>
                <p className="mt-2 text-gray-700">{absence.reason}</p>
                {absence.adminComment && (
                  <p className="mt-1 text-sm text-gray-500">
                    <span className="font-medium">Admin comment:</span> {absence.adminComment}
                  </p>
                )}
              </div>
              
              {isAdmin && absence.status === 'pending' && (
                <div className="flex space-x-2">
                  <button
                    onClick={() => onApprove(absence._id)}
                    className="p-1 text-green-500 hover:text-green-700"
                    title="Approve"
                  >
                    <FaCheck />
                  </button>
                  <button
                    onClick={() => onReject(absence._id)}
                    className="p-1 text-red-500 hover:text-red-700"
                    title="Reject"
                  >
                    <FaTimes />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}