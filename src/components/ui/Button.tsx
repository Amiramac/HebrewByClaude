'use client';

import { motion } from 'framer-motion';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'success';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
}

const variantClasses = {
  primary: 'bg-primary text-white hover:bg-primary-light',
  secondary: 'bg-white text-foreground border-2 border-gray-200 hover:bg-gray-50',
  success: 'bg-success text-white hover:bg-success/90',
};

const sizeClasses = {
  sm: 'px-4 py-2 text-sm rounded-xl',
  md: 'px-6 py-3 text-lg rounded-2xl',
  lg: 'px-8 py-4 text-xl rounded-2xl',
};

export default function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
}: ButtonProps) {
  return (
    <motion.button
      className={`tap-target font-bold shadow-md transition-colors ${variantClasses[variant]} ${sizeClasses[size]} ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      } ${className}`}
      whileTap={disabled ? {} : { scale: 0.95 }}
      whileHover={disabled ? {} : { scale: 1.02 }}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
    >
      {children}
    </motion.button>
  );
}
