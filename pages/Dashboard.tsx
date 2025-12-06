import React from 'react';
import { Users, Clock, Calendar, TrendingUp, DollarSign } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { employees, timesheets, payrolls, leaveFunds, getEmployeeById } from '../services/mockData';
import { StatCardProps } from '../types';
import { useAuth } from '../context/AuthContext';

// Mock data for charts
const attendanceData = [
  { name: 'Mon', onTime: 45, late: 2, absent: 1 },
  { name: 'Tue', onTime: 44, late: 3, absent: 1 },
  { name: 'Wed', onTime: 46, late: 1, absent: 1 },
  { name: 'Thu', onTime: 43, late: 4, absent: 1 },
  { name: 'Fri', onTime: 42, late: 3, absent: 3 },
];

const salaryDistData = [
  { name: 'IT', salary: 120000000 },
  { name: 'HR', salary: 45000000 },
  { name: 'Marketing', salary: 65000000 },
];

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, trend, trendUp }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between mb-4">
      <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
        {icon}
      </div>
      {trend && (
        <div className={`text-sm font-medium ${trendUp ? 'text-green-600' : 'text-red-600'} flex items-center gap-1`}>
          {trendUp ? '↑' : '↓'} {trend}
        </div>
      )}
    </div>
    <h3 className="text-slate-500 text-sm font-medium uppercase tracking-wider">{title}</h3>
    <p className="text-3xl font-bold text-slate-800 mt-1">{value}</p>
  </div>
);

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  
  // Logic to determine what data to show based on role
  const isEmployee = user?.role === 'employee';
  const isManager = user?.role === 'manager';
  const currentEmployee = getEmployeeById(user?.id || '');

  // Filter logic
  let displayedEmployees = employees;
  let displayedLeaveCount = 2; // Mock
  let displayedCost = "58.6M";
  let displayedTrend = "5% do tăng ca";

  if (isManager && currentEmployee) {
    // Manager sees their department stats
    displayedEmployees = employees.filter(e => e.MaPB === currentEmployee.MaPB);
    // Recalculate cost for department
    const deptSalary = payrolls
      .filter(p => displayedEmployees.some(e => e.MaNV === p.MaNV))
      .reduce((acc, curr) => acc + curr.ThucLinh, 0);
    displayedCost = `${(deptSalary / 1000000).toFixed(1)}M`;
    displayedTrend = "Theo phòng ban";
  } else if (isEmployee) {
    // Employee sees personal stats
    displayedEmployees = []; // Don't show total employees
  }

  // Personal Stats for Employee View
  const personalFund = leaveFunds.find(f => f.MaNV === user?.id);
  const personalPayroll = payrolls.find(p => p.MaNV === user?.id && p.Thang === 9);
  const personalTimesheets = timesheets.filter(t => t.MaNV === user?.id);

  return (
    <>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {!isEmployee ? (
          // Admin/Manager View
          <>
            <StatCard 
              title={isManager ? "Nhân Viên Team" : "Tổng Nhân Viên"} 
              value={displayedEmployees.length} 
              icon={<Users size={24} />} 
              trend="12% vs tháng trước"
              trendUp={true}
            />
            <StatCard 
              title="Đang Làm Việc" 
              value={displayedEmployees.filter(e => e.TrangThai === 'Đang làm việc').length} 
              icon={<Clock size={24} />} 
              trend="Ổn định"
              trendUp={true}
            />
            <StatCard 
              title="Nghỉ Phép Hôm Nay" 
              value={displayedLeaveCount} 
              icon={<Calendar size={24} />} 
              trend="Thấp hơn TB"
              trendUp={false}
            />
            <StatCard 
              title="Chi Phí Lương" 
              value={displayedCost} 
              icon={<TrendingUp size={24} />} 
              trend={displayedTrend}
              trendUp={true}
            />
          </>
        ) : (
          // Employee View
          <>
            <StatCard 
              title="Phép Năm Còn Lại" 
              value={`${personalFund?.ConLai || 0} ngày`} 
              icon={<Calendar size={24} />} 
              trend={`Tổng: ${personalFund?.TongPhep || 0}`}
              trendUp={true}
            />
            <StatCard 
              title="Công Tháng Này" 
              value={`${personalPayroll?.TongNgayCong || 0} ngày`} 
              icon={<Clock size={24} />} 
              trend="Đang cập nhật"
              trendUp={true}
            />
            <StatCard 
              title="Lương Thực Lĩnh" 
              value={personalPayroll ? `${(personalPayroll.ThucLinh / 1000000).toFixed(1)}M` : '0'} 
              icon={<DollarSign size={24} />} 
              trend="Tháng 9"
              trendUp={true}
            />
            <StatCard 
              title="Giờ Tăng Ca" 
              value={`${personalPayroll?.TongGioOT || 0}h`} 
              icon={<TrendingUp size={24} />} 
              trend="Tích lũy"
              trendUp={true}
            />
          </>
        )}
      </div>

      {/* Charts Section - Only for Admin/Manager */}
      {!isEmployee && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Attendance Trend */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <h3 className="text-lg font-bold text-slate-800 mb-6">Xu Hướng Chấm Công Tuần Qua</h3>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={attendanceData}>
                  <defs>
                    <linearGradient id="colorOnTime" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    itemStyle={{ color: '#1e293b' }}
                  />
                  <Area type="monotone" dataKey="onTime" stroke="#3b82f6" fillOpacity={1} fill="url(#colorOnTime)" name="Đúng giờ" />
                  <Area type="monotone" dataKey="late" stroke="#f59e0b" fill="transparent" name="Đi muộn" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Salary Distribution */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <h3 className="text-lg font-bold text-slate-800 mb-6">Phân Bổ Lương Theo Phòng Ban</h3>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salaryDistData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} tickFormatter={(value) => `${value/1000000}M`} />
                  <Tooltip 
                     formatter={(value: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value)}
                     cursor={{fill: '#f1f5f9'}}
                     contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar dataKey="salary" fill="#10b981" radius={[4, 4, 0, 0]} name="Tổng quỹ lương" barSize={50} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h3 className="text-lg font-bold text-slate-800">
            {isEmployee ? "Lịch Sử Chấm Công Gần Đây" : "Hoạt Động Gần Đây"}
          </h3>
        </div>
        <div className="divide-y divide-slate-100">
            {(isEmployee ? personalTimesheets : timesheets).slice(0, 5).map((ts, idx) => {
              const employeeName = employees.find(e => e.MaNV === ts.MaNV)?.HoTen;
              return (
                <div key={idx} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                      {employeeName?.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-800">{employeeName} - Chấm công</p>
                      <p className="text-xs text-slate-500">{ts.Ngay} • {ts.GioVao} - {ts.GioRa}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    ts.TrangThai === 'Đúng giờ' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {ts.TrangThai}
                  </span>
                </div>
              );
            })}
            {(isEmployee && personalTimesheets.length === 0) && (
              <div className="p-8 text-center text-slate-500">Chưa có dữ liệu chấm công.</div>
            )}
        </div>
      </div>
    </>
  );
};