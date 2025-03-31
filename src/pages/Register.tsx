import React from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { RegisterForm } from '../components/auth';
import { AuthLayout } from '../components/layouts';
import { useFormError } from '../hooks/useFormError';

export function RegisterPage() {
  const navigate = useNavigate();
  const { error, handleAuthError } = useFormError();

  const handleRegister = async (data: {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      await updateProfile(userCredential.user, {
        displayName: data.fullName
      });
      console.log('Registered user:', userCredential.user);
      navigate('/home');
    } catch (error: any) {
      handleAuthError(error);
    }
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <AuthLayout
      title="ลงทะเบียน"
      subtitle="ยินดีต้อนรับ ลงทะเบียนบัญชีเพื่อเริ่มการใช้งานของคุณกัน!"
      currentPage="register"
      onPageChange={handleLoginClick}
      error={error}
    >
      <RegisterForm 
        onSubmit={handleRegister} 
        onLoginClick={handleLoginClick} 
      />
    </AuthLayout>
  );
}