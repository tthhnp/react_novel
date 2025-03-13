import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { RegisterForm } from '../components/auth/RegisterForm';
import { Header } from '../layouts/Header';
import { Logo } from '../components/common/Logo';

export function RegisterPage() {
  const navigate = useNavigate();
  const [error, setError] = useState<string>('');

  const handleRegister = async (data: {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
    profileImage?: File;
  }) => {
    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      
      // Update user profile with display name
      await updateProfile(userCredential.user, {
        displayName: data.fullName
      });

      console.log('Registered user:', userCredential.user);
      navigate('/home');
    } catch (error: any) {
      console.error('Registration error:', error);
      if (error.code === 'auth/email-already-in-use') {
        setError('This email is already registered');
      } else if (error.code === 'auth/weak-password') {
        setError('Password should be at least 6 characters');
      } else {
        setError('Failed to register. Please try again.');
      }
    }
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen relative bg-[url('https://i.pinimg.com/736x/b3/1e/40/b31e4094a4fce54bd0418c76cf47c93d.jpg')] bg-cover bg-center">
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative z-10 min-h-screen flex flex-col">
        <Header currentPage="register" onPageChange={() => handleLoginClick()} />
        <div className="flex-1 flex flex-col items-center justify-start py-8 px-4">
          <Logo className="mb-8" />
          <div className="w-full max-w-md">
            <div className="bg-white/90 backdrop-blur-xl p-8 rounded-2xl shadow-xl border border-white/20">
              <h1 className="text-2xl font-semibold text-gray-900 text-center mb-2">ลงทะเบียน</h1>
              <p className="text-gray-600 text-center text-sm mb-8">
                ยินดีต้อนรับ ลงทะเบียนบัญชีเพื่อเริ่มการใช้งานของคุณกัน!
              </p>
              {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                  {error}
                </div>
              )}
              <RegisterForm onSubmit={handleRegister} onLoginClick={handleLoginClick} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}