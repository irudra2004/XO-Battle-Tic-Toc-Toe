import React from 'react';
import { soundFx } from '../../utils/sound';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'glass' | 'outline' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  glow?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  disableSound?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  glow = true,
  leftIcon,
  rightIcon,
  disableSound = false,
  onClick,
  className = '',
  disabled,
  ...props
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled && !disableSound) {
      soundFx.playClick();
    }
    onClick?.(e);
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs font-semibold rounded-lg gap-1.5',
    md: 'px-4 py-2.5 text-sm font-bold rounded-xl gap-2',
    lg: 'px-6 py-3.5 text-base font-extrabold rounded-2xl gap-2.5',
  };

  const variantStyles = {
    primary: `bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 hover:from-cyan-400 hover:to-blue-500 active:scale-[0.98] ${
      glow ? 'shadow-neon-cyan' : ''
    }`,
    secondary: `bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-500 hover:to-pink-500 active:scale-[0.98] ${
      glow ? 'shadow-neon-purple' : ''
    }`,
    glass: `glass-panel text-slate-100 hover:bg-slate-800/80 hover:border-cyan-500/40 active:scale-[0.98] border border-white/10 ${
      glow ? 'hover:shadow-neon-cyan-sm' : ''
    }`,
    outline: `border border-cyan-500/40 text-cyan-400 hover:bg-cyan-950/30 hover:border-cyan-400 active:scale-[0.98] ${
      glow ? 'hover:shadow-neon-cyan-sm' : ''
    }`,
    danger: `bg-red-600/20 border border-red-500/40 text-red-400 hover:bg-red-600/30 hover:border-red-400 active:scale-[0.98]`,
    success: `bg-emerald-600/20 border border-emerald-500/40 text-emerald-400 hover:bg-emerald-600/30 hover:border-emerald-400 active:scale-[0.98] ${
      glow ? 'shadow-neon-green' : ''
    }`,
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`
        relative inline-flex items-center justify-center transition-all duration-200 select-none
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-dark-950
        disabled:opacity-45 disabled:pointer-events-none disabled:shadow-none
        ${sizeStyles[size]}
        ${variantStyles[variant]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      {...props}
    >
      {leftIcon && <span className="inline-flex shrink-0 items-center">{leftIcon}</span>}
      <span>{children}</span>
      {rightIcon && <span className="inline-flex shrink-0 items-center">{rightIcon}</span>}
    </button>
  );
};
