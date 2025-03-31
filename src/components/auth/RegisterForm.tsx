import React, { useState, ChangeEvent } from 'react';
import { Button, Input } from '../common';

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
      <Input
        label="ชื่อ - นามสกุล"
        name="fullName"
        placeholder="Lilly vong"
        value={formData.fullName}
        onChange={handleInputChange}
        onBlur={() => handleBlur('fullName')}
        error={errors.fullName}
      />

      <Input
        label="อีเมล์"
        type="email"
        name="email"
        placeholder="Example@gmail.com"
        value={formData.email}
        onChange={handleInputChange}
        onBlur={() => handleBlur('email')}
        error={errors.email}
      />

      <Input
        label="รหัสผ่าน"
        name="password"
        placeholder="123456"
        value={formData.password}
        onChange={handleInputChange}
        onBlur={() => handleBlur('password')}
        error={errors.password}
        showPasswordToggle
      />

      <Input
        label="ยืนยันรหัสผ่าน"
        name="confirmPassword"
        placeholder="123456"
        value={formData.confirmPassword}
        onChange={handleInputChange}
        onBlur={() => handleBlur('confirmPassword')}
        error={errors.confirmPassword}
        showPasswordToggle
      />

      <Button type="submit" fullWidth>
        ลงทะเบียน
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
        fullWidth
        className="flex items-center justify-center gap-3"
      >
        <img
          src="https://cdn-icons-png.flaticon.com/512/300/300221.png"
          alt="Google"
          className="w-5 h-5 object-contain"
        />
        <span className="text-gray-700">เข้าสู่ระบบด้วย Google</span>
      </Button>

      <p className="text-center text-sm text-gray-500">
        มีบัญชีอยู่แล้ว?{' '}
        <button 
          type="button" 
          onClick={onLoginClick} 
          className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
        >
          เข้าสู่ระบบ
        </button>
      </p>
    </form>
  );
}