import { useState } from 'react';

export function useFormError() {
  const [error, setError] = useState<string>('');

  const handleAuthError = (error: any) => {
    console.error('Auth error:', error);
    
    if (error.code === 'auth/email-already-in-use') {
      setError('อีเมลนี้ถูกใช้งานแล้ว');
    } else if (error.code === 'auth/weak-password') {
      setError('รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร');
    } else if (error.code === 'auth/invalid-email') {
      setError('อีเมลไม่ถูกต้อง');
    } else if (error.code === 'auth/user-not-found') {
      setError('ไม่พบอีเมลนี้ในระบบ');
    } else if (error.code === 'auth/wrong-password') {
      setError('รหัสผ่านไม่ถูกต้อง');
    } else if (error.code === 'auth/popup-blocked') {
      setError('กรุณาอนุญาตให้เปิด popup สำหรับเว็บไซต์นี้');
    } else if (error.code === 'auth/cancelled-popup-request' || error.code === 'auth/popup-closed-by-user') {
      setError('การเข้าสู่ระบบถูกยกเลิก');
    } else {
      setError('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง');
    }
  };

  return { error, setError, handleAuthError };
}