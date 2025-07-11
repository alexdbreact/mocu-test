'use client';
import { FaCalendarAlt, FaExclamationTriangle, FaClock, FaBriefcase } from 'react-icons/fa';

export default function StatsCard({ title, value, icon, color }) {
  const getIcon = () => {
    switch (icon) {
      case 'regular': return <FaCalendarAlt className="text-2xl" />;
      case 'emergency': return <FaExclamationTriangle className="text-2xl" />;
      case 'delay': return <FaClock className="text-2xl" />;
      case 'mission': return <FaBriefcase className="text-2xl" />;
      default: return <FaCalendarAlt className="text-2xl" />;
    }
  };

  const getColorClasses = () => {
    switch (color) {
      case 'blue': return 'bg-blue-100 text-blue-800';
      case 'red': return 'bg-red-100 text-red-800';
      case 'yellow': return 'bg-yellow-100 text-yellow-800';
      case 'green': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className={`p-4 rounded-lg shadow ${getColorClasses()}`}>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
        <div className={`p-3 rounded-full ${getColorClasses().replace('100', '200').replace('800', '600')}`}>
          {getIcon()}
        </div>
      </div>
    </div>
  );
}