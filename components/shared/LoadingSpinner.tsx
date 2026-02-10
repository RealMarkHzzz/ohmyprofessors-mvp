'use client'

export function LoadingSpinner({ message = 'Loading...' }: { message?: string }) {
  return (
    <div className="text-center py-12">
      <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      <p className="text-gray-600 mt-4">{message}</p>
    </div>
  )
}
