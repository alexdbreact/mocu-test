'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaHome, FaUsers, FaBell, FaFileAlt, FaSignOutAlt } from 'react-icons/fa';

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-gray-800 text-white min-h-screen p-4">
      <div className="mb-8 p-4">
        <h1 className="text-xl font-bold">Admin Panel</h1>
      </div>
      <nav>
        <ul className="space-y-2">
          <li>
            <Link href="/admin/dashboard" className={`flex items-center p-2 rounded hover:bg-gray-700 ${pathname === '/admin/dashboard' ? 'bg-gray-700' : ''}`}>
              <FaHome className="mr-3" /> Dashboard
            </Link>
          </li>
          <li>
            <Link href="/admin/employees" className={`flex items-center p-2 rounded hover:bg-gray-700 ${pathname === '/admin/employees' ? 'bg-gray-700' : ''}`}>
              <FaUsers className="mr-3" /> Employees
            </Link>
          </li>
          <li>
            <Link href="/admin/notifications" className={`flex items-center p-2 rounded hover:bg-gray-700 ${pathname === '/admin/notifications' ? 'bg-gray-700' : ''}`}>
              <FaBell className="mr-3" /> Notifications
            </Link>
          </li>
          <li>
            <Link href="/admin/reports" className={`flex items-center p-2 rounded hover:bg-gray-700 ${pathname === '/admin/reports' ? 'bg-gray-700' : ''}`}>
              <FaFileAlt className="mr-3" /> Reports
            </Link>
          </li>
          <li>
            <Link href="/" className="flex items-center p-2 rounded hover:bg-gray-700">
              <FaSignOutAlt className="mr-3" /> Logout
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}