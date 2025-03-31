import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup, getAuth } from 'firebase/auth';
import { auth, googleProvider } from '../lib/firebase';
import { LoginForm } from '../components/auth';
import { AuthLayout } from '../components/layouts';
import { useFormError } from '../hooks/useFormError';

export function LoginPage() {
  const navigate = useNavigate();
  const { error, handleAuthError } = useFormError();

  const handleLogin = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('Logged in user:', userCredential.user);
      navigate('/home');
    } catch (error: any) {
      handleAuthError(error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const auth = getAuth();
      const result = await signInWithPopup(auth, googleProvider);
      console.log('Google sign in successful:', result.user);
      navigate('/home');
    } catch (error: any) {
      handleAuthError(error);
    }
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  return (
    <AuthLayout
      title="เข้าสู่ระบบ"
      subtitle="ยินดีต้อนรับ เข้าสู่ระบบเพื่อเริ่มการใช้งานของคุณกัน!"
      currentPage="login"
      onPageChange={handleRegisterClick}
      error={error}
    >
      <LoginForm 
        onSubmit={handleLogin} 
        onRegisterClick={handleRegisterClick}
        onGoogleSignIn={handleGoogleSignIn}
      />
    </AuthLayout>
  );
}