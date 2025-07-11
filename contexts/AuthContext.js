'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Hardcoded users (in a real app, these would come from the database)
  const hardcodedUsers = [
    { id: 1, username: 'admin', password: 'admin123', role: 'admin', employeeId: null },
    { id: 2, username: 'emp1', password: 'emp1123', role: 'employee', employeeId: '1' },
    { id: 3, username: 'emp2', password: 'emp2123', role: 'employee', employeeId: '2' },
    // Add more employees as needed
  ];

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (username, password) => {
    setLoading(true);
    // Simulate API call with hardcoded users
    setTimeout(() => {
      const foundUser = hardcodedUsers.find(
        u => u.username === username && u.password === password
      );
      
      if (foundUser) {
        setUser(foundUser);
        localStorage.setItem('user', JSON.stringify(foundUser));
        router.push(foundUser.role === 'admin' ? '/admin/dashboard' : '/employee/dashboard');
      } else {
        alert('Invalid credentials');
      }
      setLoading(false);
    }, 500);
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);