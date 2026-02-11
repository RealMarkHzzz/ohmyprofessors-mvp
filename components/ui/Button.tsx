import React from 'react'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  loadingText?: string
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = 'primary', size = 'md', loading, loadingText, className = '', disabled, ...props }, ref) => {
    const baseClasses = 'font-semibold rounded-xl transition-all duration-200'
    
    const variants = {
      primary: 'btn-primary',
      secondary: 'btn-secondary',
      ghost: 'btn-ghost',
    }
    
    const sizes = {
      sm: 'text-sm py-2 px-4',
      md: 'text-base py-3.5 px-8',
      lg: 'text-lg py-4 px-10',
    }
    
    return (
      <button 
        ref={ref}
        disabled={loading || disabled}
        className={`
          ${baseClasses} 
          ${variants[variant]} 
          ${sizes[size]} 
          ${className}
          ${loading ? 'opacity-70 cursor-wait pointer-events-none' : ''}
          disabled:opacity-50
          disabled:cursor-not-allowed
          disabled:grayscale
          disabled:shadow-none
        `}
        {...props}
      >
        {loading ? (
          <span className="flex items-center gap-2 justify-center">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            {loadingText || children}
          </span>
        ) : children}
      </button>
    )
  }
)

Button.displayName = 'Button'
