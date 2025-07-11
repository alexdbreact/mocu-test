'use client';
import { useState } from 'react';
import { FaCalendarAlt, FaClock, FaExclamationTriangle, FaBriefcase } from 'react-icons/fa';

export default function AbsenceForm({ onSubmit }) {
  const [type, setType] = useState('regular');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [hours, setHours] = useState(1);
  const [reason, setReason] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const absenceData = {
      type,
      startDate,
      endDate: type === 'delay' ? startDate : endDate,
      hours: type === 'delay' ? hours : null,
      reason
    };
    onSubmit(absenceData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Absence Type</label>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setType('regular')}
            className={`p-2 rounded flex items-center justify-center ${type === 'regular' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            <FaCalendarAlt className="mr-2" /> Regular
          </button>
          <button
            type="button"
            onClick={() => setType('emergency')}
            className={`p-2 rounded flex items-center justify-center ${type === 'emergency' ? 'bg-red-500 text-white' : 'bg-gray-200'}`}
          >
            <FaExclamationTriangle className="mr-2" /> Emergency
          </button>
          <button
            type="button"
            onClick={() => setType('delay')}
            className={`p-2 rounded flex items-center justify-center ${type === 'delay' ? 'bg-yellow-500 text-white' : 'bg-gray-200'}`}
          >
            <FaClock className="mr-2" /> Delay
          </button>
          <button
            type="button"
            onClick={() => setType('mission')}
            className={`p-2 rounded flex items-center justify-center ${type === 'mission' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
          >
            <FaBriefcase className="mr-2" /> Mission
          </button>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Start Date</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      {type !== 'delay' && (
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">End Date (optional)</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
      )}

      {type === 'delay' && (
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Hours</label>
          <select
            value={hours}
            onChange={(e) => setHours(parseInt(e.target.value))}
            className="w-full p-2 border rounded"
          >
            <option value={1}>1 hour</option>
            <option value={2}>2 hours</option>
          </select>
        </div>
      )}

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Reason</label>
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="w-full p-2 border rounded"
          rows="3"
          required
        ></textarea>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Submit Request
      </button>
    </form>
  );
}