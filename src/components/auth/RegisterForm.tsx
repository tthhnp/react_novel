import React, { useState, ChangeEvent } from 'react';
import { EyeOff, Eye } from 'lucide-react';

interface RegisterFormProps {
  onSubmit: (data: {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => void;
  onLoginClick: () => void;
}

export function RegisterForm({ onSubmit, onLoginClick }: RegisterFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [touched, setTouched] = useState({
    fullName: false,
    email: false,
    password: false,
    confirmPassword: false
  });

  const errors = {
    fullName: !formData.fullName && touched.fullName ? 'กรุณากรอกชื่อ-นามสกุล' : '',
    email: !formData.email && touched.email ? 'กรุณากรอกอีเมล์' : '',
    password: !formData.password && touched.password ? 'กรุณากรอกรหัสผ่าน' : '',
    confirmPassword: touched.confirmPassword ? 
      !formData.confirmPassword ? 'กรุณายืนยันรหัสผ่าน' :
      formData.password !== formData.confirmPassword ? 'รหัสผ่านไม่ตรงกัน' : ''
      : ''
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleBlur = (field: keyof typeof touched) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({
      fullName: true,
      email: true,
      password: true,
      confirmPassword: true
    });

    if (Object.values(errors).every(error => !error)) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">ชื่อ - นามสกุล</label>
        <input
          type="text"
          name="fullName"
          placeholder="Lilly vong"
          className={`w-full px-4 py-2.5 rounded-lg border ${
            errors.fullName ? 'border-red-500' : 'border-gray-200'
          } focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors duration-200`}
          value={formData.fullName}
          onChange={handleInputChange}
          onBlur={() => handleBlur('fullName')}
        />
        {errors.fullName && (
          <p className="text-sm text-red-500">{errors.fullName}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">อีเมล์</label>
        <input
          type="email"
          name="email"
          placeholder="Example@gmail.com"
          className={`w-full px-4 py-2.5 rounded-lg border ${
            errors.email ? 'border-red-500' : 'border-gray-200'
          } focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors duration-200`}
          value={formData.email}
          onChange={handleInputChange}
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
            name="password"
            placeholder="123456"
            className={`w-full px-4 py-2.5 rounded-lg border ${
              errors.password ? 'border-red-500' : 'border-gray-200'
            } focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors duration-200 pr-10`}
            value={formData.password}
            onChange={handleInputChange}
            onBlur={() => handleBlur('password')}
          />
          <button
            type="button"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
          </button>
        </div>
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">ยืนยันรหัสผ่าน</label>
        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="123456"
            className={`w-full px-4 py-2.5 rounded-lg border ${
              errors.confirmPassword ? 'border-red-500' : 'border-gray-200'
            } focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors duration-200 pr-10`}
            value={formData.confirmPassword}
            onChange={handleInputChange}
            onBlur={() => handleBlur('confirmPassword')}
          />
          <button
            type="button"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <Eye size={16} /> : <EyeOff size={16} />}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="text-sm text-red-500">{errors.confirmPassword}</p>
        )}
      </div>

      <button 
        type="submit" 
        className="w-full bg-black hover:bg-black/90 text-white py-2.5 rounded-[32px] font-medium transition-colors duration-200"
      >
        ลงทะเบียน
      </button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 text-gray-500">หรือ</span>
        </div>
      </div>

      <button 
        type="button" 
        className="w-full flex items-center justify-center gap-3 px-4 py-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
      >
        <img
          src="https://cdn-icons-png.flaticon.com/512/300/300221.png"
          alt="Google"
          className="w-5 h-5 object-contain"
        />
        <span className="text-gray-700">เข้าสู่ระบบด้วย Google</span>
      </button>

      <p className="text-center text-sm text-gray-500">
        มีบัญชีอยู่แล้ว?{' '}
        <button 
          type="button" 
          onClick={onLoginClick} 
          className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors duration-200"
        >
          เข้าสู่ระบบ
        </button>
      </p>
    </form>
  );
}