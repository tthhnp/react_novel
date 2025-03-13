import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../lib/firebase';
import { LoginForm } from '../components/auth/LoginForm';
import { Header } from '../layouts/Header';
import { Logo } from '../components/common/Logo';

export function LoginPage() {
  const navigate = useNavigate();
  const [error, setError] = useState<string>('');

  const handleLogin = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('Logged in user:', userCredential.user);
      navigate('/home');
    } catch (error) {
      console.error('Login error:', error);
      setError('Invalid email or password');
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log('Google sign in successful:', result.user);
      navigate('/home');
    } catch (error) {
      console.error('Google sign in error:', error);
      setError('Failed to sign in with Google');
    }
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  return (
    <div className="min-h-screen relative bg-[url('https://i.pinimg.com/736x/b3/1e/40/b31e4094a4fce54bd0418c76cf47c93d.jpg')] bg-cover bg-center">
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative z-10 min-h-screen flex flex-col">
        <Header currentPage="login" onPageChange={() => handleRegisterClick()} />
        <div className="flex-1 flex flex-col items-center justify-start py-8 px-4">
          <Logo className="mb-8" />
          <div className="w-full max-w-md">
            <div className="bg-white/90 backdrop-blur-xl p-8 rounded-2xl shadow-xl border border-white/20">
              <h1 className="text-2xl font-semibold text-gray-900 text-center mb-2">เข้าสู่ระบบ</h1>
              <p className="text-gray-600 text-center text-sm mb-8">
                ยินดีต้อนรับ เข้าสู่ระบบเพื่อเริ่มการใช้งานของคุณกัน!
              </p>
              {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                  {error}
                </div>
              )}
              <LoginForm 
                onSubmit={handleLogin} 
                onRegisterClick={handleRegisterClick}
                onGoogleSignIn={handleGoogleSignIn}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}