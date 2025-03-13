import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { confirmPasswordReset } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { EyeOff, Eye } from 'lucide-react';
import { Logo } from '../components/common/Logo';

export function NewPasswordPage() {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Get the oobCode from URL parameters
  const queryParams = new URLSearchParams(window.location.search);
  const oobCode = queryParams.get('oobCode');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (newPassword !== confirmPassword) {
      setError('รหัสผ่านไม่ตรงกัน');
      return;
    }

    if (newPassword.length < 6) {
      setError('รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร');
      return;
    }

    if (!oobCode) {
      setError('ลิงก์ไม่ถูกต้องหรือหมดอายุ กรุณาขอลิงก์ใหม่');
      return;
    }

    setIsLoading(true);

    try {
      await confirmPasswordReset(auth, oobCode, newPassword);
      navigate('/login', { state: { message: 'รีเซ็ตรหัสผ่านสำเร็จ กรุณาเข้าสู่ระบบด้วยรหัสผ่านใหม่' } });
    } catch (error: any) {
      console.error('Password reset error:', error);
      if (error.code === 'auth/expired-action-code') {
        setError('ลิงก์หมดอายุ กรุณาขอลิงก์ใหม่');
      } else if (error.code === 'auth/invalid-action-code') {
        setError('ลิงก์ไม่ถูกต้อง กรุณาขอลิงก์ใหม่');
      } else {
        setError('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative bg-[url('https://i.pinimg.com/736x/b3/1e/40/b31e4094a4fce54bd0418c76cf47c93d.jpg')] bg-cover bg-center">
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative z-10 min-h-screen flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-start py-8 px-4">
          <Logo className="mb-8" />
          <div className="w-full max-w-md">
            <div className="bg-white/90 backdrop-blur-xl p-8 rounded-2xl shadow-xl border border-white/20">
              <h1 className="text-2xl font-semibold text-gray-900 text-center mb-2">ตั้งรหัสผ่านใหม่</h1>

              {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">รหัสผ่านใหม่</label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      placeholder="123456"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors duration-200 pr-10"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? <Eye size={16} /> : <EyeOff size={16} />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">ยืนยันรหัสผ่านใหม่</label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="123456"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors duration-200 pr-10"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <Eye size={16} /> : <EyeOff size={16} />}
                    </button>
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={isLoading}
                  className={`w-full bg-black hover:bg-black/90 text-white py-2.5 rounded-lg font-medium transition-colors duration-200 ${
                    isLoading ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isLoading ? 'กำลังดำเนินการ...' : 'ยืนยัน'}
                </button>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => navigate('/forgot-password')}
                    className="text-gray-500 hover:text-gray-700 text-sm transition-colors duration-200"
                  >
                    เข้าสู่ระบบ
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}