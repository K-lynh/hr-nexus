import React from 'react';

// 1. ORGANIZATION & PROFILE
export interface Department {
  MaPB: string;
  TenPB: string;
  MoTa?: string;
  TruongPhongID?: string;
}

export interface Position {
  MaCV: string;
  TenCV: string;
  MoTa?: string;
}

export interface Employee {
  MaNV: string;
  HoTen: string;
  NgaySinh: string;
  GioiTinh: 'Nam' | 'Nữ' | 'Khác';
  CCCD: string;
  Email: string;
  SDT: string;
  DiaChi: string;
  NgayVaoLam: string;
  TrangThai: 'Đang làm việc' | 'Đã nghỉ việc' | 'Nghỉ thai sản';
  MaPB: string;
  MaCV: string;
  Avatar?: string; // Optional for UI
}

export interface Contract {
  MaHD: string;
  MaNV: string;
  LoaiHopDong: string;
  NgayBatDau: string;
  NgayKetThuc?: string;
  LuongKyKet: number;
}

// 2. TIMEKEEPING & SALARY
export interface WorkShift {
  MaCa: string;
  TenCa: string;
  GioBatDau: string;
  GioKetThuc: string;
  HeSoOT: number;
}

export interface Timesheet {
  MaChamCong: string;
  MaNV: string;
  MaCa: string;
  Ngay: string;
  GioVao?: string;
  GioRa?: string;
  SoGioLam: number;
  SoGioOT: number;
  TrangThai: 'Đúng giờ' | 'Đi muộn' | 'Về sớm' | 'Vắng';
}

export interface SalaryConfig {
  MaCauHinh: string;
  MaNV: string;
  LuongCoBan: number;
  PhuCapAnTrua: number;
  PhuCapXangXe: number;
  PhuCapTrachNhiem: number;
  SoNguoiPhuThuoc: number;
}

export interface Payroll {
  MaBangLuong: string;
  MaNV: string;
  Thang: number;
  Nam: number;
  LuongTheoGio: number; // Added
  PhuCap: number; // Added
  TongNgayCong: number;
  TongGioOT: number;
  TongThuNhap: number;
  // Removed KhauTruBaoHiem and ThueTNCN
  ThucLinh: number;
  TrangThai: 'Đã thanh toán' | 'Chờ duyệt';
}

// 3. LEAVE MANAGEMENT
export interface LeaveType {
  MaLoaiNghi: string;
  TenLoai: string;
  CoHuongLuong: boolean;
  MoTa?: string;
}

export interface LeaveFund {
  MaQuy: string;
  MaNV: string;
  Nam: number;
  TongPhep: number;
  DaNghi: number;
  ConLai: number;
}

export interface LeaveRequest {
  MaDon: string;
  MaNV: string;
  MaLoaiNghi: string;
  NgayBatDau: string;
  NgayKetThuc: string;
  SoNgayNghi: number;
  LyDo: string;
  TrangThai: 'Chờ duyệt' | 'Đã duyệt' | 'Từ chối';
  NguoiDuyetID?: string;
}

// 4. SYSTEM & NOTIFICATIONS
export interface User {
  id: string;
  name: string;
  role: 'admin' | 'manager' | 'employee';
  avatar?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  type: 'info' | 'success' | 'warning' | 'error';
}

// UI Helper Types
export interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
  trendUp?: boolean;
}