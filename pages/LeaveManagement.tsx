import React, { useState } from 'react';
import { CalendarDays, Plus, CheckCircle, XCircle, Clock, X, Check } from 'lucide-react';
import { leaveRequests, leaveFunds, getEmployeeName, getLeaveTypeName, leaveTypes, getEmployeeById } from '../services/mockData';
import { useAuth } from '../context/AuthContext';

export const LeaveManagement: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'requests' | 'funds'>('requests');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const currentUserProfile = getEmployeeById(user?.id || '');
  
  // Form State
  const [formData, setFormData] = useState({
    type: '',
    startDate: '',
    endDate: '',
    reason: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Gửi đơn thành công! (Mock)");
    setIsModalOpen(false);
    setFormData({ type: '', startDate: '', endDate: '', reason: '' });
  };

  const isAdminOrManager = ['admin', 'manager'].includes(user?.role || '');

  // Filter Data
  let displayedRequests = leaveRequests;
  let displayedFunds = leaveFunds;

  if (user?.role === 'employee') {
    displayedRequests = leaveRequests.filter(req => req.MaNV === user.id);
    displayedFunds = leaveFunds.filter(fund => fund.MaNV === user.id);
  } else if (user?.role === 'manager' && currentUserProfile) {
    displayedRequests = leaveRequests.filter(req => {
        const emp = getEmployeeById(req.MaNV);
        return emp?.MaPB === currentUserProfile.MaPB;
    });
    displayedFunds = leaveFunds.filter(fund => {
        const emp = getEmployeeById(fund.MaNV);
        return emp?.MaPB === currentUserProfile.MaPB;
    });
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">
             {user?.role === 'employee' ? 'Nghỉ Phép Của Tôi' : 'Quản Lý Nghỉ Phép'}
          </h2>
          <p className="text-slate-500">Theo dõi đơn từ và quỹ phép năm</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm shadow-blue-200"
        >
          <Plus size={20} />
          <span>Tạo Đơn Nghỉ</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200">
        <div className="flex gap-6">
          <button
            onClick={() => setActiveTab('requests')}
            className={`pb-4 px-2 font-medium text-sm transition-colors relative ${
              activeTab === 'requests' 
                ? 'text-blue-600' 
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            {user?.role === 'employee' ? 'Lịch sử nghỉ phép' : 'Danh sách đơn nghỉ'}
            {activeTab === 'requests' && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-t-full"></span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('funds')}
            className={`pb-4 px-2 font-medium text-sm transition-colors relative ${
              activeTab === 'funds' 
                ? 'text-blue-600' 
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            {user?.role === 'employee' ? 'Quỹ phép của tôi' : 'Quỹ phép nhân viên'}
            {activeTab === 'funds' && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-t-full"></span>
            )}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {activeTab === 'requests' ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                  <th className="px-6 py-4 font-semibold">Nhân viên</th>
                  <th className="px-6 py-4 font-semibold">Loại nghỉ</th>
                  <th className="px-6 py-4 font-semibold">Thời gian</th>
                  <th className="px-6 py-4 font-semibold text-center">Số ngày</th>
                  <th className="px-6 py-4 font-semibold">Lý do</th>
                  <th className="px-6 py-4 font-semibold">Trạng thái</th>
                  <th className="px-6 py-4 font-semibold">Người duyệt</th>
                  {isAdminOrManager && <th className="px-6 py-4 font-semibold text-right">Thao tác</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {displayedRequests.length > 0 ? (
                  displayedRequests.map((req) => (
                    <tr key={req.MaDon} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-slate-800">
                        {getEmployeeName(req.MaNV)}
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        {getLeaveTypeName(req.MaLoaiNghi)}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        <div>{req.NgayBatDau}</div>
                        <div className="text-slate-400 text-xs">đến {req.NgayKetThuc}</div>
                      </td>
                      <td className="px-6 py-4 text-center font-medium text-slate-800">
                        {req.SoNgayNghi}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600 max-w-xs truncate" title={req.LyDo}>
                        {req.LyDo}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                          req.TrangThai === 'Đã duyệt' ? 'bg-green-100 text-green-700' :
                          req.TrangThai === 'Từ chối' ? 'bg-red-100 text-red-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {req.TrangThai === 'Đã duyệt' && <CheckCircle size={12} />}
                          {req.TrangThai === 'Từ chối' && <XCircle size={12} />}
                          {req.TrangThai === 'Chờ duyệt' && <Clock size={12} />}
                          {req.TrangThai}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-500">
                        {req.NguoiDuyetID ? getEmployeeName(req.NguoiDuyetID) : '-'}
                      </td>
                      {isAdminOrManager && (
                        <td className="px-6 py-4 text-right">
                          {req.TrangThai === 'Chờ duyệt' && (
                            <div className="flex justify-end gap-2">
                              <button className="p-1.5 text-green-600 hover:bg-green-100 rounded transition-colors" title="Duyệt">
                                <Check size={18} />
                              </button>
                              <button className="p-1.5 text-red-600 hover:bg-red-100 rounded transition-colors" title="Từ chối">
                                <X size={18} />
                              </button>
                            </div>
                          )}
                        </td>
                      )}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={isAdminOrManager ? 8 : 7} className="px-6 py-8 text-center text-slate-500">
                      Không có dữ liệu.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                  <th className="px-6 py-4 font-semibold">Mã NV</th>
                  <th className="px-6 py-4 font-semibold">Họ và tên</th>
                  <th className="px-6 py-4 font-semibold text-center">Năm</th>
                  <th className="px-6 py-4 font-semibold text-center">Tổng phép</th>
                  <th className="px-6 py-4 font-semibold text-center text-orange-600">Đã nghỉ</th>
                  <th className="px-6 py-4 font-semibold text-center text-green-600">Còn lại</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {displayedFunds.map((fund) => (
                  <tr key={fund.MaQuy} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 text-slate-500 text-sm">
                      {fund.MaNV}
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-800">
                      {getEmployeeName(fund.MaNV)}
                    </td>
                    <td className="px-6 py-4 text-center text-slate-600">
                      {fund.Nam}
                    </td>
                    <td className="px-6 py-4 text-center font-medium text-slate-800">
                      {fund.TongPhep}
                    </td>
                    <td className="px-6 py-4 text-center font-medium text-orange-600">
                      {fund.DaNghi}
                    </td>
                    <td className="px-6 py-4 text-center font-bold text-green-600 bg-green-50/50">
                      {fund.ConLai}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Create Leave Request Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-6 border-b border-slate-100">
              <h3 className="text-xl font-bold text-slate-800">Tạo Đơn Xin Nghỉ</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Loại nghỉ phép</label>
                <select 
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                  required
                >
                  <option value="">-- Chọn loại nghỉ --</option>
                  {leaveTypes.map(type => (
                    <option key={type.MaLoaiNghi} value={type.MaLoaiNghi}>{type.TenLoai}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Từ ngày</label>
                  <input 
                    type="date" 
                    className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    value={formData.startDate}
                    onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Đến ngày</label>
                  <input 
                    type="date" 
                    className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    value={formData.endDate}
                    onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Lý do</label>
                <textarea 
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  rows={3}
                  placeholder="Nhập lý do nghỉ..."
                  value={formData.reason}
                  onChange={(e) => setFormData({...formData, reason: e.target.value})}
                  required
                ></textarea>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors font-medium"
                >
                  Hủy bỏ
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-bold shadow-md shadow-blue-200"
                >
                  Gửi Đơn
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};