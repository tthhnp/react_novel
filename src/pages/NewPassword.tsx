import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { confirmPasswordReset } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { AuthLayout } from '../components/layouts';
import { Button, Input } from '../components/common';
import { useFormError } from '../hooks/useFormError';

export function NewPasswordPage() {
  const navigate = useNavigate();
  const { error, handleAuthError } = useFormError();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Get the oobCode from URL parameters
  const queryParams = new URLSearchParams(window.location.search);
  const oobCode = queryParams.get('oobCode');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      handleAuthError({ code: 'passwords-dont-match' });
      return;
    }

    if (newPassword.length < 6) {
      handleAuthError({ code: 'auth/weak-password' });
      return;
    }

    if (!oobCode) {
      handleAuthError({ code: 'invalid-action-code' });
      return;
    }

    setIsLoading(true);

    try {
      await confirmPasswordReset(auth, oobCode, newPassword);
      navigate('/login', { 
        state: { message: 'รีเซ็ตรหัสผ่านสำเร็จ กรุณาเข้าสู่ระบบด้วยรหัสผ่านใหม่' } 
      });
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
      title="ตั้งรหัสผ่านใหม่"
      currentPage="login"
      onPageChange={handleLoginClick}
      error={error}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="รหัสผ่านใหม่"
          placeholder="123456"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          showPasswordToggle
          required
        />

        <Input
          label="ยืนยันรหัสผ่านใหม่"
          placeholder="123456"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          showPasswordToggle
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
    </AuthLayout>
  );
}