import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { AuthLayout } from '../components/layouts';
import { Button, Input } from '../components/common';
import { useFormError } from '../hooks/useFormError';

export function ForgotPasswordPage() {
  const navigate = useNavigate();
  const { error, handleAuthError } = useFormError();
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await sendPasswordResetEmail(auth, email);
      setSuccess(true);
    } catch (error: any) {
      handleAuthError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <AuthLayout
      title="ลืมรหัสผ่าน"
      subtitle={success ? undefined : "หากลืมรหัสผ่านในการเข้าใช้งาน\nกรุณากรอกอีเมล์เพื่อรับลิงก์สำหรับตั้งรหัสผ่านใหม่"}
      currentPage="login"
      onPageChange={handleLoginClick}
      error={error}
    >
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
          <Input
            label="อีเมล์"
            type="email"
            placeholder="Example@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Button 
            type="submit"
            disabled={isLoading}
            fullWidth
            isLoading={isLoading}
          >
            {isLoading ? 'กำลังดำเนินการ...' : 'ยืนยัน'}
          </Button>

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
    </AuthLayout>
  );
}