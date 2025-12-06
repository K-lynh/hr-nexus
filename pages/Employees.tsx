import React, { useState } from 'react';
import { Search, Plus, Filter, MoreVertical, Mail, Phone, MapPin, Eye, Edit2, Trash2, X } from 'lucide-react';
import { employees, getDepartmentName, getPositionName, getEmployeeById } from '../services/mockData';
import { useAuth } from '../context/AuthContext';

export const Employees: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const { user } = useAuth();

  const currentUserProfile = getEmployeeById(user?.id || '');

  // Filter employees based on role and search term
  const filteredEmployees = employees.filter(emp => {
    // Search filter
    const matchesSearch = emp.HoTen.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          emp.MaNV.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Role filter
    let matchesRole = true;
    if (user?.role === 'manager' && currentUserProfile) {
      // Manager only sees their department
      matchesRole = emp.MaPB === currentUserProfile.MaPB;
    } else if (user?.role === 'employee') {
      // Employee sees everyone (directory) OR restrict to self? 
      // Typically directories are public, but let's restrict actions.
      matchesRole = true; 
    }
    
    return matchesSearch && matchesRole;
  });

  const isAdmin = user?.role === 'admin';
  const isManager = user?.role === 'manager';
  const canModify = isAdmin || isManager;

  const handleActionClick = (id: string) => {
    if (activeMenu === id) {
      setActiveMenu(null);
    } else {
      setActiveMenu(id);
    }
  };

  const handleEdit = (id: string) => {
    alert(`Mở form sửa nhân viên: ${id}`);
    setActiveMenu(null);
  };

  const handleDelete = (id: string) => {
    if(window.confirm(`Bạn có chắc muốn xóa nhân viên ${id}?`)) {
      alert(`Đã xóa nhân viên: ${id}`);
    }
    setActiveMenu(null);
  };

  const handleView = (id: string) => {
    alert(`Xem chi tiết hồ sơ: ${id}`);
    setActiveMenu(null);
  };

  // Close menu when clicking outside (simple simulation)
  React.useEffect(() => {
    const handleClickOutside = () => setActiveMenu(null);
    if (activeMenu) {
      document.addEventListener('click', handleClickOutside);
    }
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [activeMenu]);

  return (
    <div className="space-y-6" onClick={(e) => e.stopPropagation()}>
      {/* Controls */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="Tìm kiếm nhân viên..." 
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors">
            <Filter size={20} />
            <span>Bộ lọc</span>
          </button>
          {canModify && (
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm shadow-blue-200">
              <Plus size={20} />
              <span>Thêm mới</span>
            </button>
          )}
        </div>
      </div>

      {/* Employee List */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden pb-20"> {/* pb-20 for dropdown space */}
        <div className="overflow-visible"> 
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-semibold">Nhân viên</th>
                <th className="px-6 py-4 font-semibold">Phòng ban / Chức vụ</th>
                <th className="px-6 py-4 font-semibold">Liên hệ</th>
                <th className="px-6 py-4 font-semibold">Trạng thái</th>
                {canModify && <th className="px-6 py-4 font-semibold text-right">Thao tác</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredEmployees.map((emp) => (
                <tr key={emp.MaNV} className="hover:bg-slate-50 transition-colors group relative">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <img 
                        src={emp.Avatar} 
                        alt={emp.HoTen} 
                        className="h-10 w-10 rounded-full object-cover border border-slate-200"
                      />
                      <div>
                        <p className="font-medium text-slate-900">{emp.HoTen}</p>
                        <p className="text-xs text-slate-500">{emp.MaNV}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-slate-800">{getDepartmentName(emp.MaPB)}</p>
                    <p className="text-xs text-slate-500">{getPositionName(emp.MaCV)}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1 text-sm text-slate-600">
                      <div className="flex items-center gap-2">
                        <Mail size={14} className="text-slate-400" />
                        {emp.Email}
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone size={14} className="text-slate-400" />
                        {emp.SDT}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      emp.TrangThai === 'Đang làm việc' ? 'bg-green-100 text-green-800' :
                      emp.TrangThai === 'Nghỉ thai sản' ? 'bg-purple-100 text-purple-800' :
                      'bg-slate-100 text-slate-800'
                    }`}>
                      {emp.TrangThai}
                    </span>
                  </td>
                  {canModify && (
                    <td className="px-6 py-4 text-right relative">
                      <button 
                        className="text-slate-400 hover:text-slate-600 p-2 rounded-full hover:bg-slate-200 transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleActionClick(emp.MaNV);
                        }}
                      >
                        <MoreVertical size={18} />
                      </button>

                      {/* Dropdown Menu */}
                      {activeMenu === emp.MaNV && (
                        <div className="absolute right-8 top-8 w-48 bg-white rounded-lg shadow-xl border border-slate-100 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-100">
                          <button 
                            onClick={() => handleView(emp.MaNV)}
                            className="w-full text-left px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                          >
                            <Eye size={16} className="text-blue-500" /> Xem chi tiết
                          </button>
                          <button 
                            onClick={() => handleEdit(emp.MaNV)}
                            className="w-full text-left px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                          >
                            <Edit2 size={16} className="text-orange-500" /> Sửa thông tin
                          </button>
                          <button 
                            onClick={() => handleDelete(emp.MaNV)}
                            className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 border-t border-slate-100"
                          >
                            <Trash2 size={16} /> Xóa nhân viên
                          </button>
                        </div>
                      )}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 text-xs text-slate-500 flex justify-between items-center">
          <span>Hiển thị {filteredEmployees.length} kết quả</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-slate-300 rounded hover:bg-white disabled:opacity-50">Trước</button>
            <button className="px-3 py-1 border border-slate-300 rounded hover:bg-white disabled:opacity-50">Sau</button>
          </div>
        </div>
      </div>
    </div>
  );
};