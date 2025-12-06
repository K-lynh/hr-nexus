import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserCircle, Lock } from 'lucide-react';

export const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'admin' | 'manager' | 'employee'>('employee');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login success
    login(username, role);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600 mb-2">HR Nexus</h1>
          <p className="text-slate-500">Đăng nhập vào hệ thống quản trị</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Tên đăng nhập</label>
            <div className="relative">
              <UserCircle className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="text"
                required
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                placeholder="Nhập tên đăng nhập"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Mật khẩu</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="password"
                required
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex gap-4 p-4 bg-slate-50 rounded-lg justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="radio" 
                name="role" 
                checked={role === 'employee'} 
                onChange={() => setRole('employee')}
                className="text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-slate-700">Nhân viên</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="radio" 
                name="role" 
                checked={role === 'manager'} 
                onChange={() => setRole('manager')}
                className="text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-slate-700">Quản lý</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="radio" 
                name="role" 
                checked={role === 'admin'} 
                onChange={() => setRole('admin')}
                className="text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-slate-700">Admin</span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
          >
            Đăng Nhập
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-400">
          <p>Quên mật khẩu? Liên hệ IT</p>
        </div>
      </div>
    </div>
  );
};