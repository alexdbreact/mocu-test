import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-50 to-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Absence Management System</h1>
        <p className="text-gray-600 mb-8">
          Efficiently manage employee absences, requests, and approvals in one place.
        </p>
        <div className="space-y-4">
          <Link
            href="/login"
            className="block w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200 text-center"
          >
            Login
          </Link>
          <p className="text-sm text-gray-500">
            Admin credentials: admin / admin123<br />
            Employee credentials: emp1 / emp1123
          </p>
        </div>
      </div>
    </div>
  );
}