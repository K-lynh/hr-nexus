import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (username: string, role: 'admin' | 'manager' | 'employee') => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check local storage for persisted session
    const storedUser = localStorage.getItem('hr_nexus_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (username: string, role: 'admin' | 'manager' | 'employee') => {
    // Mock login
    let newUser: User;

    if (role === 'admin') {
      newUser = {
        id: 'ADMIN01',
        name: 'Quản trị viên hệ thống',
        role: 'admin',
        avatar: 'https://ui-avatars.com/api/?name=Admin&background=0D8ABC&color=fff'
      };
    } else if (role === 'manager') {
      newUser = {
        id: 'NV02',
        name: 'Trần Thị Bích (Manager)',
        role: 'manager',
        avatar: 'https://picsum.photos/100/100?random=2'
      };
    } else {
      newUser = {
        id: 'NV03',
        name: 'Lê Văn Cường (Staff)',
        role: 'employee',
        avatar: 'https://picsum.photos/100/100?random=3'
      };
    }

    setUser(newUser);
    localStorage.setItem('hr_nexus_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('hr_nexus_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};