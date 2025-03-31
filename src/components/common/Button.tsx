import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  isLoading?: boolean;
  fullWidth?: boolean;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  isLoading,
  fullWidth,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-colors duration-200';
  
  const variants = {
    primary: 'bg-black text-white hover:bg-black/90',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
    outline: 'border border-gray-200 hover:bg-gray-50',
    ghost: 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
  };

  const sizes = {
    sm: 'px-4 py-1.5 text-sm rounded-full',
    md: 'px-6 py-2 rounded-full',
    lg: 'px-8 py-3 text-lg rounded-full'
  };

  const styles = [
    baseStyles,
    variants[variant],
    sizes[size],
    fullWidth && 'w-full',
    disabled && 'opacity-50 cursor-not-allowed',
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      className={styles}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center gap-2">
          <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
          <span>กำลังโหลด...</span>
        </div>
      ) : (
        <>
          {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 mr-2" />}
          {children}
          {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 ml-2" />}
        </>
      )}
    </button>
  );
}