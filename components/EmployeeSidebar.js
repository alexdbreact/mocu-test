'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaHome, FaCalendarAlt, FaBell, FaSignOutAlt } from 'react-icons/fa';

export default function EmployeeSidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-blue-800 text-white min-h-screen p-4">
      <div className="mb-8 p-4">
        <h1 className="text-xl font-bold">Employee Portal</h1>
      </div>
      <nav>
        <ul className="space-y-2">
          <li>
            <Link href="/employee/dashboard" className={`flex items-center p-2 rounded hover:bg-blue-700 ${pathname === '/employee/dashboard' ? 'bg-blue-700' : ''}`}>
              <FaHome className="mr-3" /> Dashboard
            </Link>
          </li>
          <li>
            <Link href="/employee/requests" className={`flex items-center p-2 rounded hover:bg-blue-700 ${pathname === '/employee/requests' ? 'bg-blue-700' : ''}`}>
              <FaCalendarAlt className="mr-3" /> Absence Requests
            </Link>
          </li>
          <li>
            <Link href="/employee/notifications" className={`flex items-center p-2 rounded hover:bg-blue-700 ${pathname === '/employee/notifications' ? 'bg-blue-700' : ''}`}>
              <FaBell className="mr-3" /> Notifications
            </Link>
          </li>
          <li>
            <Link href="/" className="flex items-center p-2 rounded hover:bg-blue-700">
              <FaSignOutAlt className="mr-3" /> Logout
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}