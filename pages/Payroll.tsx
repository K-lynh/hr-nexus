import React from 'react';
import { Banknote, Download, FileText } from 'lucide-react';
import { payrolls, getEmployeeName, getEmployeeById } from '../services/mockData';
import { useAuth } from '../context/AuthContext';

export const Payroll: React.FC = () => {
  const { user } = useAuth();
  const currentUserProfile = getEmployeeById(user?.id || '');
  const isAdminOrManager = ['admin', 'manager'].includes(user?.role || '');

  // Filter Logic
  let displayedPayrolls = payrolls;
  if (user?.role === 'employee') {
    displayedPayrolls = payrolls.filter(p => p.MaNV === user.id);
  } else if (user?.role === 'manager' && currentUserProfile) {
     displayedPayrolls = payrolls.filter(p => {
       const emp = getEmployeeById(p.MaNV);
       return emp?.MaPB === currentUserProfile.MaPB;
     });
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  const totalPayroll = displayedPayrolls.reduce((acc, curr) => acc + curr.ThucLinh, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">
             {user?.role === 'employee' ? 'Phiếu Lương Của Tôi' : 'Quản Lý Lương'}
          </h2>
          <p className="text-slate-500">Kỳ lương: Tháng 9 / 2023</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors">
            <Download size={20} />
            <span>Xuất Excel</span>
          </button>
          {isAdminOrManager && (
            <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-sm shadow-green-200">
              <Banknote size={20} />
              <span>Chốt Lương</span>
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <p className="text-slate-500 text-sm font-medium uppercase">
               {user?.role === 'employee' ? 'Tổng Thu Nhập' : 'Tổng Quỹ Lương (Thực chi)'}
            </p>
            <p className="text-3xl font-bold text-slate-900 mt-2">{formatCurrency(totalPayroll)}</p>
         </div>
         <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <p className="text-slate-500 text-sm font-medium uppercase">
              {user?.role === 'employee' ? 'Trạng Thái' : 'Nhân sự nhận lương'}
            </p>
            <p className="text-3xl font-bold text-slate-900 mt-2">
              {user?.role === 'employee' ? (displayedPayrolls[0]?.TrangThai || 'N/A') : displayedPayrolls.length}
            </p>
         </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-semibold">Mã BL</th>
                <th className="px-6 py-4 font-semibold">Nhân viên</th>
                <th className="px-6 py-4 font-semibold text-right">Lương/Giờ</th>
                <th className="px-6 py-4 font-semibold text-right">Ngày Công</th>
                <th className="px-6 py-4 font-semibold text-right">Giờ OT</th>
                <th className="px-6 py-4 font-semibold text-right text-blue-600">Phụ Cấp</th>
                <th className="px-6 py-4 font-semibold text-right text-green-700">Thực Lĩnh</th>
                <th className="px-6 py-4 font-semibold">Trạng Thái</th>
                <th className="px-6 py-4 font-semibold"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {displayedPayrolls.map((pr) => (
                <tr key={pr.MaBangLuong} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 text-slate-500 text-sm">{pr.MaBangLuong}</td>
                  <td className="px-6 py-4 font-medium text-slate-800">
                    {getEmployeeName(pr.MaNV)}
                  </td>
                  <td className="px-6 py-4 text-right text-slate-600">
                    {formatCurrency(pr.LuongTheoGio)}
                  </td>
                  <td className="px-6 py-4 text-right text-slate-600">{pr.TongNgayCong}</td>
                  <td className="px-6 py-4 text-right text-slate-600">{pr.TongGioOT}</td>
                  <td className="px-6 py-4 text-right text-blue-600 font-medium">
                    {formatCurrency(pr.PhuCap)}
                  </td>
                  <td className="px-6 py-4 text-right font-bold text-green-700 text-lg">
                    {formatCurrency(pr.ThucLinh)}
                  </td>
                  <td className="px-6 py-4">
                     <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      pr.TrangThai === 'Đã thanh toán' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {pr.TrangThai}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-blue-600 hover:text-blue-800" title="Xem phiếu lương">
                      <FileText size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};