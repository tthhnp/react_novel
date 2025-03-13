import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EyeOff, Eye } from 'lucide-react';

interface LoginFormProps {
  onSubmit: (email: string, password: string) => void;
  onRegisterClick: () => void;
  onGoogleSignIn: () => void;
}

export function LoginForm({ onSubmit, onRegisterClick, onGoogleSignIn }: LoginFormProps) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
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
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">อีเมล์</label>
        <input
          type="email"
          placeholder="Example@gmail.com"
          className={`w-full px-4 py-2.5 rounded-lg border ${
            errors.email ? 'border-red-500' : 'border-gray-200'
          } focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors duration-200`}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => handleBlur('email')}
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">รหัสผ่าน</label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="123456"
            className={`w-full px-4 py-2.5 rounded-lg border ${
              errors.password ? 'border-red-500' : 'border-gray-200'
            } focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors duration-200 pr-10`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => handleBlur('password')}
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
          </button>
        </div>
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password}</p>
        )}
        <button 
          type="button"
          onClick={() => navigate('/forgot-password')}
          className="block text-right text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200"
        >
          ลืมรหัสผ่าน?
        </button>
      </div>

      <button 
        type="submit" 
        className="w-full bg-black hover:bg-black/90 text-white py-2.5 rounded-lg font-medium transition-colors duration-200"
      >
        เข้าสู่ระบบ
      </button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">หรือ</span>
        </div>
      </div>

      <button 
        type="button" 
        onClick={onGoogleSignIn}
        className="w-full flex items-center justify-center gap-3 px-4 py-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
      >
        <img
          src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_24dp.png"
          alt="Google"
          className="w-5 h-5 object-contain"
        />
        <span className="text-gray-700">Continue with Google</span>
      </button>

      <p className="text-center text-sm text-gray-500">
        คุณยังไม่มีบัญชีใช่หรือไม่?{' '}
        <button 
          type="button" 
          onClick={onRegisterClick} 
          className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors duration-200"
        >
          สมัครสมาชิก
        </button>
      </p>
    </form>
  );
}