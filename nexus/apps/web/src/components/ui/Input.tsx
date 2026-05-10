import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, leftIcon, className = '', ...props }, ref) => {
    return (
      <div className={`flex flex-col w-full ${className}`}>
        {label && <label className="block text-xs font-medium text-text-muted mb-1.5">{label}</label>}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-faint pointer-events-none">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            className={`w-full h-9 ${leftIcon ? 'pl-9' : 'px-3'} pr-3 rounded-md bg-surface border ${
              error ? 'border-error focus:ring-error/20' : 'border-border focus:border-primary focus:ring-primary/20'
            } text-sm text-text focus:outline-none focus:ring-2 transition-all placeholder:text-text-faint`}
            {...props}
          />
        </div>
        {error && <span className="text-xs text-error mt-1">{error}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';
