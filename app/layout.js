import './globals.css';
import { AuthProvider } from '../contexts/AuthContext';
import { NotificationProvider } from '../contexts/NotificationContext';

export const metadata = {
  title: 'My App',
  description: 'My App Description',
  manifest: '/manifest.json',
   icons: {
    icon: '/public/icons/favicon.ico',
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <AuthProvider>
          <NotificationProvider>
            {children}
          </NotificationProvider>
        </AuthProvider>
      </body>
    </html>
  );
}