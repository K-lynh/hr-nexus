import React from 'react';
import { Calendar, Clock, CheckCircle } from 'lucide-react';
import { timesheets, getEmployeeName, getEmployeeById } from '../services/mockData';
import { useAuth } from '../context/AuthContext';

export const Timekeeping: React.FC = () => {
  const { user } = useAuth();
  const currentUserProfile = getEmployeeById(user?.id || '');

  // Filter logic
  let displayedTimesheets = timesheets;

  if (user?.role === 'employee') {
    displayedTimesheets = timesheets.filter(ts => ts.MaNV === user.id);
  } else if (user?.role === 'manager' && currentUserProfile) {
    // Manager sees department
    // In a real app, we would fetch employees of the department first. 
    // Here we rely on the Mock data consistency.
    // Simplifying: Manager sees all for now OR strictly filter if we had the full employee list handy easily.
    // Let's implement strict department filter.
    displayedTimesheets = timesheets.filter(ts => {
      const emp = getEmployeeById(ts.MaNV);
      return emp?.MaPB === currentUserProfile.MaPB;
    });
  }

  return (
    <div className="space-y-6">
      {/* Header & Quick Action */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gradient-to-r from-blue-600 to-indigo-700 p-6 rounded-2xl text-white shadow-lg">
        <div>
          <h2 className="text-2xl font-bold">Chấm Công Hôm Nay</h2>
          <p className="text-blue-100 mt-1">25 Tháng 10, 2023</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-blue-100">Ca làm việc</p>
            <p className="text-lg font-bold">08:00 - 17:00</p>
          </div>
          <button className="px-6 py-3 bg-white text-blue-700 font-bold rounded-xl shadow-md hover:bg-blue-50 transition-all active:scale-95 flex items-center gap-2">
            <CheckCircle size={20} />
            Check In
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200">
        <div className="p-6 border-b border-slate-200 flex justify-between items-center">
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <Calendar size={20} className="text-slate-400" />
            {user?.role === 'employee' ? 'Lịch sử chấm công của tôi' : 'Lịch sử chấm công toàn công ty'}
          </h3>
          <input type="date" className="border border-slate-300 rounded-lg px-3 py-1.5 text-sm" />
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-semibold">Nhân viên</th>
                <th className="px-6 py-4 font-semibold">Ngày</th>
                <th className="px-6 py-4 font-semibold">Giờ vào</th>
                <th className="px-6 py-4 font-semibold">Giờ ra</th>
                <th className="px-6 py-4 font-semibold text-center">Giờ Hành Chính / OT</th>
                <th className="px-6 py-4 font-semibold">Trạng thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {displayedTimesheets.length > 0 ? (
                displayedTimesheets.map((ts) => (
                  <tr key={ts.MaChamCong} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-800">
                      {getEmployeeName(ts.MaNV)}
                    </td>
                    <td className="px-6 py-4 text-slate-600">{ts.Ngay}</td>
                    <td className="px-6 py-4 text-slate-600">{ts.GioVao}</td>
                    <td className="px-6 py-4 text-slate-600">{ts.GioRa}</td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex flex-col items-center">
                        <span className="font-medium text-slate-800">{ts.SoGioLam}h HC</span>
                        {ts.SoGioOT > 0 && <span className="text-xs text-orange-600 font-bold">+{ts.SoGioOT}h OT</span>}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                       <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        ts.TrangThai === 'Đúng giờ' ? 'bg-green-100 text-green-800' :
                        ts.TrangThai === 'Đi muộn' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {ts.TrangThai}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                    Không có dữ liệu chấm công.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};