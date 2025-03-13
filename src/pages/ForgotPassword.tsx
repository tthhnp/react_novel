import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { Header } from '../layouts/Header';
import { Logo } from '../components/common/Logo';

export function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await sendPasswordResetEmail(auth, email);
      setSuccess(true);
    } catch (error: any) {
      console.error('Password reset error:', error);
      if (error.code === 'auth/user-not-found') {
        setError('ไม่พบอีเมลนี้ในระบบ');
      } else if (error.code === 'auth/invalid-email') {
        setError('อีเมลไม่ถูกต้อง');
      } else {
        setError('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen relative bg-[url('https://i.pinimg.com/736x/b3/1e/40/b31e4094a4fce54bd0418c76cf47c93d.jpg')] bg-cover bg-center">
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative z-10 min-h-screen flex flex-col">
        <Header currentPage="login" onPageChange={() => handleLoginClick()} />
        <div className="flex-1 flex flex-col items-center justify-start py-8 px-4">
          <Logo className="mb-8" />
          <div className="w-full max-w-md">
            <div className="bg-white/90 backdrop-blur-xl p-8 rounded-2xl shadow-xl border border-white/20">
              <h1 className="text-2xl font-semibold text-gray-900 text-center mb-2">ลืมรหัสผ่าน</h1>
              <p className="text-gray-600 text-center text-sm mb-8">
                หากลืมรหัสผ่านในการเข้าใช้งาน<br />
                กรุณากรอกอีเมล์เพื่อรับลิงก์สำหรับตั้งรหัสผ่านใหม่
              </p>

              {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {success ? (
                <div className="text-center">
                  <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg text-sm">
                    ส่งลิงก์รีเซ็ตรหัสผ่านไปยังอีเมลของคุณแล้ว<br />
                    กรุณาตรวจสอบอีเมลของคุณเพื่อดำเนินการต่อ
                  </div>
                  <p className="text-sm text-gray-500 mb-4">
                    หากคุณไม่ได้รับอีเมล กรุณาตรวจสอบโฟลเดอร์สแปมของคุณ
                  </p>
                  <button
                    onClick={handleLoginClick}
                    className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors duration-200"
                  >
                    กลับไปหน้าเข้าสู่ระบบ
                  </button>
                </div>
              ) : (
                <form onSubmit={handleResetPassword} className="space-y-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">อีเมล์</label>
                    <input
                      type="email"
                      placeholder="Example@gmail.com"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors duration-200"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
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
                      onClick={handleLoginClick}
                      className="text-gray-500 hover:text-gray-700 text-sm transition-colors duration-200"
                    >
                      เข้าสู่ระบบ
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}