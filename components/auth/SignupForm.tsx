/**
 * Signup Form Component
 * 注册表单
 */
'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Mail, Lock, User, AlertCircle, CheckCircle } from 'lucide-react'

interface SignupFormProps {
  onSuccess?: () => void
  onSwitchToLogin?: () => void
}

export function SignupForm({ onSuccess, onSwitchToLogin }: SignupFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  
  const supabase = createClient()
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    // 验证密码匹配
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }
    
    // 验证密码强度
    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      setLoading(false)
      return
    }
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })
    
    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      setSuccess(true)
      setLoading(false)
    }
  }
  
  if (success) {
    return (
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Check your email
          </h2>
          <p className="text-sm text-gray-600">
            We've sent a confirmation link to <strong>{email}</strong>
          </p>
        </div>
        <button
          onClick={onSwitchToLogin}
          className="text-sm text-blue-600 hover:text-blue-700"
        >
          Back to sign in
        </button>
      </div>
    )
  }
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Create an account
        </h2>
        <p className="text-sm text-gray-600">
          Join OhMyProfessors to start rating courses
        </p>
      </div>
      
      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}
      
      {/* Email Input */}
      <div>
        <label htmlFor="signup-email" className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            id="signup-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="
              w-full h-11
              pl-10 pr-4
              bg-gray-50 border border-gray-300 rounded-lg
              text-base
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
            "
            placeholder="you@example.com"
            required
          />
        </div>
      </div>
      
      {/* Password Input */}
      <div>
        <label htmlFor="signup-password" className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            id="signup-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="
              w-full h-11
              pl-10 pr-4
              bg-gray-50 border border-gray-300 rounded-lg
              text-base
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
            "
            placeholder="••••••••"
            required
          />
        </div>
        <p className="text-xs text-gray-500 mt-1">
          At least 6 characters
        </p>
      </div>
      
      {/* Confirm Password Input */}
      <div>
        <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
          Confirm Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            id="confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="
              w-full h-11
              pl-10 pr-4
              bg-gray-50 border border-gray-300 rounded-lg
              text-base
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
            "
            placeholder="••••••••"
            required
          />
        </div>
      </div>
      
      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="
          w-full h-11
          bg-blue-600 hover:bg-blue-700
          text-white font-medium rounded-lg
          transition-colors
          disabled:opacity-50 disabled:cursor-not-allowed
        "
      >
        {loading ? 'Creating account...' : 'Create account'}
      </button>
      
      {/* Switch to Login */}
      {onSwitchToLogin && (
        <div className="text-center text-sm">
          <span className="text-gray-600">Already have an account? </span>
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Sign in
          </button>
        </div>
      )}
    </form>
  )
}
