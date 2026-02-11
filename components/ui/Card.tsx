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
  metric?: string
  className?: string
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ 
  icon, 
  title, 
  description,
  metric,
  className = '' 
}) => {
  return (
    <Card hover className={className}>
      <div className="flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="font-heading text-xl font-semibold text-gray-900 mb-3 text-center">
        {title}
      </h3>
      <p className="text-base text-gray-600 leading-relaxed mb-4 text-center">
        {description}
      </p>
      {metric && (
        <div className="text-center mt-4 pt-4 border-t border-gray-200">
          <p className="text-sm font-semibold text-blue-500">
            {metric}
          </p>
        </div>
      )}
    </Card>
  )
}
