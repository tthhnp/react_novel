import React from 'react';
import { Logo } from '../common/Logo';

interface HeaderProps {
  currentPage: 'login' | 'register';
  onPageChange: (page: 'login' | 'register') => void;
}

export function Header({ currentPage, onPageChange }: HeaderProps) {
  return (
    <header className="w-full px-6 py-4 flex items-center bg-white/10 backdrop-blur-lg border-b border-white/10">
      <div className="flex-shrink-0">
        <Logo />
      </div>
      <div className="flex-1 flex justify-end">
        <button 
          className="px-5 py-2 bg-white/10 hover:bg-white/15 text-white rounded-full text-sm font-medium transition-all duration-200 border border-white/10 hover:border-white/20"
          onClick={() => onPageChange(currentPage === 'login' ? 'register' : 'login')}
        >
          {currentPage === 'login' ? 'ลงทะเบียน' : 'เข้าสู่ระบบ'}
        </button>
      </div>
    </header>
  );
}