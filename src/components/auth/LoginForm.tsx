import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input } from '../common';

interface LoginFormProps {
  onSubmit: (email: string, password: string) => void;
  onRegisterClick: () => void;
  onGoogleSignIn: () => void;
}

export function LoginForm({ onSubmit, onRegisterClick, onGoogleSignIn }: LoginFormProps) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [touched, setTouched] = useState({
    email: false,
    password: false
  });

  const errors = {
    email: !email && touched.email ? 'กรุณากรอกอีเมล์' : '',
    password: !password && touched.password ? 'กรุณากรอกรหัสผ่าน' : ''
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ email: true, password: true });
    
    if (email && password) {
      onSubmit(email, password);
    }
  };

  const handleBlur = (field: 'email' | 'password') => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="อีเมล์"
        type="email"
        placeholder="Example@gmail.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onBlur={() => handleBlur('email')}
        error={errors.email}
      />

      <div className="space-y-2">
        <Input
          label="รหัสผ่าน"
          placeholder="123456"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={() => handleBlur('password')}
          error={errors.password}
          showPasswordToggle
        />
        <button 
          type="button"
          onClick={() => navigate('/forgot-password')}
          className="block text-right text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          ลืมรหัสผ่าน?
        </button>
      </div>

      <Button type="submit" fullWidth>
        เข้าสู่ระบบ
      </Button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 text-gray-500 bg-white">หรือ</span>
        </div>
      </div>

      <Button
        type="button"
        variant="outline"
        onClick={onGoogleSignIn}
        fullWidth
        className="flex items-center justify-center gap-3"
      >
        <img
          src="https://cdn-icons-png.flaticon.com/512/300/300221.png"
          alt="Google"
          className="w-5 h-5 object-contain"
        />
        <span className="text-gray-700">Continue with Google</span>
      </Button>

      <p className="text-center text-sm text-gray-500">
        คุณยังไม่มีบัญชีใช่หรือไม่?{' '}
        <button 
          type="button" 
          onClick={onRegisterClick} 
          className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
        >
          สมัครสมาชิก
        </button>
      </p>
    </form>
  );
}