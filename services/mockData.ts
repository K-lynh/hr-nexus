import { Employee, Department, Position, Timesheet, Payroll, LeaveRequest, LeaveType, LeaveFund, Notification } from '../types';

// Departments
export const departments: Department[] = [
  { MaPB: 'PB01', TenPB: 'Phát triển phần mềm', TruongPhongID: 'NV01' },
  { MaPB: 'PB02', TenPB: 'Nhân sự', TruongPhongID: 'NV02' },
  { MaPB: 'PB03', TenPB: 'Marketing', TruongPhongID: 'NV05' },
];

// Positions
export const positions: Position[] = [
  { MaCV: 'CV01', TenCV: 'Giám đốc' },
  { MaCV: 'CV02', TenCV: 'Trưởng phòng' },
  { MaCV: 'CV03', TenCV: 'Nhân viên chính thức' },
  { MaCV: 'CV04', TenCV: 'Thực tập sinh' },
];

// Employees
export const employees: Employee[] = [
  {
    MaNV: 'NV01',
    HoTen: 'Nguyễn Văn An',
    NgaySinh: '1985-05-15',
    GioiTinh: 'Nam',
    CCCD: '012345678901',
    Email: 'an.nguyen@company.com',
    SDT: '0901234567',
    DiaChi: 'Hà Nội',
    NgayVaoLam: '2015-01-10',
    TrangThai: 'Đang làm việc',
    MaPB: 'PB01',
    MaCV: 'CV02',
    Avatar: 'https://picsum.photos/100/100?random=1'
  },
  {
    MaNV: 'NV02',
    HoTen: 'Trần Thị Bích',
    NgaySinh: '1990-08-20',
    GioiTinh: 'Nữ',
    CCCD: '012345678902',
    Email: 'bich.tran@company.com',
    SDT: '0901234568',
    DiaChi: 'Hà Nội',
    NgayVaoLam: '2018-03-15',
    TrangThai: 'Đang làm việc',
    MaPB: 'PB02',
    MaCV: 'CV02',
    Avatar: 'https://picsum.photos/100/100?random=2'
  },
  {
    MaNV: 'NV03',
    HoTen: 'Lê Văn Cường',
    NgaySinh: '1995-12-10',
    GioiTinh: 'Nam',
    CCCD: '012345678903',
    Email: 'cuong.le@company.com',
    SDT: '0901234569',
    DiaChi: 'Đà Nẵng',
    NgayVaoLam: '2020-06-01',
    TrangThai: 'Đang làm việc',
    MaPB: 'PB01',
    MaCV: 'CV03',
    Avatar: 'https://picsum.photos/100/100?random=3'
  },
  {
    MaNV: 'NV04',
    HoTen: 'Phạm Thị Dung',
    NgaySinh: '1998-02-28',
    GioiTinh: 'Nữ',
    CCCD: '012345678904',
    Email: 'dung.pham@company.com',
    SDT: '0901234570',
    DiaChi: 'Hồ Chí Minh',
    NgayVaoLam: '2021-09-05',
    TrangThai: 'Nghỉ thai sản',
    MaPB: 'PB03',
    MaCV: 'CV03',
    Avatar: 'https://picsum.photos/100/100?random=4'
  },
  {
    MaNV: 'NV05',
    HoTen: 'Hoàng Văn Em',
    NgaySinh: '1992-11-11',
    GioiTinh: 'Nam',
    CCCD: '012345678905',
    Email: 'em.hoang@company.com',
    SDT: '0901234571',
    DiaChi: 'Hà Nội',
    NgayVaoLam: '2019-05-20',
    TrangThai: 'Đang làm việc',
    MaPB: 'PB03',
    MaCV: 'CV02',
    Avatar: 'https://picsum.photos/100/100?random=5'
  }
];

// Timesheets (Last 5 days for NV01)
export const timesheets: Timesheet[] = [
  { MaChamCong: 'CC01', MaNV: 'NV01', MaCa: 'CA01', Ngay: '2023-10-23', GioVao: '07:55', GioRa: '17:30', SoGioLam: 8, SoGioOT: 0.5, TrangThai: 'Đúng giờ' },
  { MaChamCong: 'CC02', MaNV: 'NV01', MaCa: 'CA01', Ngay: '2023-10-24', GioVao: '08:05', GioRa: '17:00', SoGioLam: 8, SoGioOT: 0, TrangThai: 'Đi muộn' },
  { MaChamCong: 'CC03', MaNV: 'NV01', MaCa: 'CA01', Ngay: '2023-10-25', GioVao: '07:50', GioRa: '17:00', SoGioLam: 8, SoGioOT: 0, TrangThai: 'Đúng giờ' },
  { MaChamCong: 'CC04', MaNV: 'NV03', MaCa: 'CA01', Ngay: '2023-10-25', GioVao: '08:00', GioRa: '17:00', SoGioLam: 8, SoGioOT: 0, TrangThai: 'Đúng giờ' },
  { MaChamCong: 'CC05', MaNV: 'NV05', MaCa: 'CA01', Ngay: '2023-10-25', GioVao: '07:45', GioRa: '18:00', SoGioLam: 8, SoGioOT: 1, TrangThai: 'Đúng giờ' },
  // Add more for NV03 (Employee View)
  { MaChamCong: 'CC06', MaNV: 'NV03', MaCa: 'CA01', Ngay: '2023-10-24', GioVao: '07:55', GioRa: '17:00', SoGioLam: 8, SoGioOT: 0, TrangThai: 'Đúng giờ' },
  { MaChamCong: 'CC07', MaNV: 'NV03', MaCa: 'CA01', Ngay: '2023-10-23', GioVao: '08:10', GioRa: '17:15', SoGioLam: 8, SoGioOT: 0, TrangThai: 'Đi muộn' },
];

// Payrolls - Updated with Hourly Wage and Allowances, Removed Tax/Insurance
export const payrolls: Payroll[] = [
  { 
    MaBangLuong: 'BL01', 
    MaNV: 'NV01', 
    Thang: 9, 
    Nam: 2023, 
    LuongTheoGio: 150000,
    PhuCap: 5000000,
    TongNgayCong: 22, 
    TongGioOT: 5, 
    TongThuNhap: 32525000, // (150k * 8 * 22) + 5M + (150k * 1.5 * 5)
    ThucLinh: 32525000, 
    TrangThai: 'Đã thanh toán' 
  },
  { 
    MaBangLuong: 'BL02', 
    MaNV: 'NV02', 
    Thang: 9, 
    Nam: 2023, 
    LuongTheoGio: 100000,
    PhuCap: 2000000,
    TongNgayCong: 21, 
    TongGioOT: 0, 
    TongThuNhap: 18800000, // (100k * 8 * 21) + 2M
    ThucLinh: 18800000, 
    TrangThai: 'Đã thanh toán' 
  },
  { 
    MaBangLuong: 'BL03', 
    MaNV: 'NV03', 
    Thang: 9, 
    Nam: 2023, 
    LuongTheoGio: 80000,
    PhuCap: 1500000,
    TongNgayCong: 22, 
    TongGioOT: 10, 
    TongThuNhap: 16780000, // (80k * 8 * 22) + 1.5M + (80k * 1.5 * 10)
    ThucLinh: 16780000, 
    TrangThai: 'Đã thanh toán' 
  },
];

// Leave Types
export const leaveTypes: LeaveType[] = [
  { MaLoaiNghi: 'LN01', TenLoai: 'Nghỉ phép năm', CoHuongLuong: true, MoTa: 'Nghỉ phép thường niên' },
  { MaLoaiNghi: 'LN02', TenLoai: 'Nghỉ ốm', CoHuongLuong: true, MoTa: 'Có giấy xác nhận bác sĩ' },
  { MaLoaiNghi: 'LN03', TenLoai: 'Nghỉ thai sản', CoHuongLuong: true, MoTa: 'Theo luật lao động' },
  { MaLoaiNghi: 'LN04', TenLoai: 'Nghỉ việc riêng', CoHuongLuong: false, MoTa: 'Không hưởng lương' },
];

// Leave Funds (Quỹ phép)
export const leaveFunds: LeaveFund[] = [
  { MaQuy: 'QP01', MaNV: 'NV01', Nam: 2023, TongPhep: 12, DaNghi: 2, ConLai: 10 },
  { MaQuy: 'QP02', MaNV: 'NV02', Nam: 2023, TongPhep: 12, DaNghi: 5, ConLai: 7 },
  { MaQuy: 'QP03', MaNV: 'NV03', Nam: 2023, TongPhep: 12, DaNghi: 2, ConLai: 10 },
  { MaQuy: 'QP04', MaNV: 'NV04', Nam: 2023, TongPhep: 12, DaNghi: 0, ConLai: 12 },
  { MaQuy: 'QP05', MaNV: 'NV05', Nam: 2023, TongPhep: 12, DaNghi: 1, ConLai: 11 },
];

// Leave Requests
export const leaveRequests: LeaveRequest[] = [
  { MaDon: 'DON01', MaNV: 'NV04', MaLoaiNghi: 'LN03', NgayBatDau: '2023-11-01', NgayKetThuc: '2024-05-01', SoNgayNghi: 180, LyDo: 'Nghỉ thai sản', TrangThai: 'Đã duyệt', NguoiDuyetID: 'NV02' },
  { MaDon: 'DON02', MaNV: 'NV03', MaLoaiNghi: 'LN01', NgayBatDau: '2023-10-30', NgayKetThuc: '2023-10-31', SoNgayNghi: 2, LyDo: 'Đi du lịch gia đình', TrangThai: 'Chờ duyệt' },
  { MaDon: 'DON03', MaNV: 'NV01', MaLoaiNghi: 'LN02', NgayBatDau: '2023-09-15', NgayKetThuc: '2023-09-15', SoNgayNghi: 1, LyDo: 'Sốt cao', TrangThai: 'Đã duyệt', NguoiDuyetID: 'NV02' },
];

// Notifications
export const notifications: Notification[] = [
  { id: '1', title: 'Lương tháng 9', message: 'Bảng lương tháng 9 đã được duyệt.', time: '2 giờ trước', isRead: false, type: 'success' },
  { id: '2', title: 'Đơn nghỉ phép mới', message: 'NV03 vừa gửi đơn xin nghỉ phép.', time: '5 giờ trước', isRead: false, type: 'info' },
  { id: '3', title: 'Nhắc nhở chấm công', message: 'Vui lòng hoàn thành chấm công trước 17:30', time: '1 ngày trước', isRead: true, type: 'warning' },
];

export const getDepartmentName = (id: string) => departments.find(d => d.MaPB === id)?.TenPB || id;
export const getPositionName = (id: string) => positions.find(p => p.MaCV === id)?.TenCV || id;
export const getEmployeeName = (id: string) => employees.find(e => e.MaNV === id)?.HoTen || id;
export const getLeaveTypeName = (id: string) => leaveTypes.find(l => l.MaLoaiNghi === id)?.TenLoai || id;

// Helper to get full employee object from ID (mocking database lookup)
export const getEmployeeById = (id: string) => employees.find(e => e.MaNV === id);
export const getEmployeesByDept = (deptId: string) => employees.filter(e => e.MaPB === deptId);
