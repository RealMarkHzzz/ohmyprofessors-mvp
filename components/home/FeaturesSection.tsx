'use client'

import { Check, Zap, BarChart3, Search, Users, Lock } from 'lucide-react'
import { FeatureCard } from '@/components/ui/Card'

const features = [
  {
    icon: <Check className="w-12 h-12 text-blue-600" />,
    title: 'Verified Reviews',
    description: 'All reviews are from verified students who have taken courses with the professors.',
  },
  {
    icon: <Zap className="w-12 h-12 text-blue-600" />,
    title: 'Real-Time Updates',
    description: 'Get instant notifications when new reviews are posted for your courses.',
  },
  {
    icon: <BarChart3 className="w-12 h-12 text-blue-600" />,
    title: 'Detailed Ratings',
    description: 'See ratings for teaching quality, difficulty, grading fairness, and more.',
  },
  {
    icon: <Search className="w-12 h-12 text-blue-600" />,
    title: 'Advanced Search',
    description: 'Filter by department, course level, rating, and more to find the perfect professor.',
  },
  {
    icon: <Users className="w-12 h-12 text-blue-600" />,
    title: 'Community Driven',
    description: 'Join thousands of students sharing their experiences to help others succeed.',
  },
  {
    icon: <Lock className="w-12 h-12 text-blue-600" />,
    title: 'Privacy Protected',
    description: 'Your personal information is encrypted and never shared with professors or universities.',
  },
]

export const FeaturesSection = () => {
  return (
    <section id="features" className="section bg-gray-50">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose{' '}
            <span className="gradient-text">OhMyProfessors</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Make informed decisions about your education with comprehensive professor reviews and ratings.
          </p>
        </div>
        
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="stagger-item">
              <FeatureCard {...feature} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
