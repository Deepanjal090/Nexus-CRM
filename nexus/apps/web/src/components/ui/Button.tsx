import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  isLoading?: boolean;
}

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-white hover:bg-primary-hover border border-transparent shadow-sm',
  secondary: 'bg-surface-2 text-text hover:bg-surface-offset border border-border',
  outline: 'bg-surface text-text-muted hover:bg-surface-2 border border-border hover:text-text',
  ghost: 'bg-transparent text-text-muted hover:bg-surface-offset hover:text-text border border-transparent',
  danger: 'bg-error text-white hover:bg-error/90 border border-transparent shadow-sm',
};

const sizes: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-xs',
  md: 'h-9 px-4 text-sm',
  lg: 'h-10 px-5 text-sm',
};

export function Button({
  variant = 'primary',
  size = 'md',
  icon,
  isLoading,
  className = '',
  children,
  disabled,
  ...props
}: ButtonProps) {
  const baseClass = 'inline-flex items-center justify-center font-medium rounded-md transition-colors gap-1.5 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50 disabled:cursor-not-allowed';
  
  return (
    <button
      className={`${baseClass} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : icon ? (
        icon
      ) : null}
      {children}
    </button>
  );
}
