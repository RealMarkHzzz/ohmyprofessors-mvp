import React from 'react'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  // Add any custom props here
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', type = 'text', ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={`input ${className}`}
        {...props}
      />
    )
  }
)

Input.displayName = 'Input'
