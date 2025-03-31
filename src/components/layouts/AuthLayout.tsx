import React from 'react';
import { Header } from './Header';
import { Logo } from '../common';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  currentPage: 'login' | 'register';
  onPageChange: () => void;
  error?: string;
}

export function AuthLayout({ 
  children, 
  title, 
  subtitle,
  currentPage,
  onPageChange,
  error 
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen relative  bg-cover bg-center">
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative z-10 min-h-screen flex flex-col">
        <Header currentPage={currentPage} onPageChange={onPageChange} />
        <div className="flex-1 flex flex-col items-center justify-start py-8 px-4">
          <Logo className="mb-8" />
          <div className="w-full max-w-md">
            <div className="bg-white/90 backdrop-blur-xl p-8 rounded-2xl shadow-xl border border-white/20">
              <h1 className="text-2xl font-semibold text-gray-900 text-center mb-2">{title}</h1>
              {subtitle && (
                <p className="text-gray-600 text-center text-sm mb-8">{subtitle}</p>
              )}
              {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                  {error}
                </div>
              )}
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}