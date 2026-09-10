import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'glass' | 'glass-glow' | 'subtle';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'glass',
  padding = 'md',
  className = '',
  ...props
}) => {
  const paddingStyles = {
    none: 'p-0',
    sm: 'p-3 sm:p-4',
    md: 'p-5 sm:p-6',
    lg: 'p-6 sm:p-8',
  };

  const variantStyles = {
    glass: 'glass-panel rounded-2xl sm:rounded-3xl',
    'glass-glow': 'glass-panel-glow rounded-2xl sm:rounded-3xl',
    subtle: 'bg-dark-900/50 border border-slate-800/80 rounded-2xl sm:rounded-3xl',
  };

  return (
    <div
      className={`
        relative overflow-hidden transition-all duration-300
        ${variantStyles[variant]}
        ${paddingStyles[padding]}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};
