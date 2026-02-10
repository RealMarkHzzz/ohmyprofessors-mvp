import React from 'react'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean
  glass?: boolean
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ children, hover = false, glass = false, className = '', ...props }, ref) => {
    const baseClass = glass ? 'glass-card' : hover ? 'card-hover' : 'card'
    
    return (
      <div ref={ref} className={`${baseClass} ${className}`} {...props}>
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'

/* ========================================
   Feature Card Component
   ======================================== */
export interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  className?: string
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ 
  icon, 
  title, 
  description,
  className = '' 
}) => {
  return (
    <Card hover className={className}>
      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="font-heading text-lg font-semibold text-gray-900 mb-2">
        {title}
      </h3>
      <p className="text-sm text-gray-600 leading-relaxed">
        {description}
      </p>
    </Card>
  )
}
