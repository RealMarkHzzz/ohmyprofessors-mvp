import { HeroSection } from '@/components/home/HeroSection'
import { ProfessorListClient } from '@/components/home/ProfessorListClient'

export const metadata = {
  title: 'OhMyProfessors - Find Your Perfect Professor',
  description: 'Real Student Reviews, Real Decisions. Rate and discover professors at Australian universities.',
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950">
      {/* Header - Pre-rendered */}
      <header className="border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            🎓 OhMyProfessors
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Rate your professors at Australian universities
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Hero Section - Pre-rendered with SSG */}
        <HeroSection />

        {/* Professor List - Client Component for interactivity */}
        <ProfessorListClient />

        {/* CTA Section - Pre-rendered */}
        <div className="mt-12 bg-blue-600 dark:bg-blue-700 rounded-lg shadow-lg p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">
            Help Other Students
          </h3>
          <p className="text-lg mb-6">
            Share your experience with professors at University of Adelaide
          </p>
          <button className="bg-white text-blue-600 dark:bg-gray-100 dark:text-blue-700 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 dark:hover:bg-gray-200 transition-colors">
            Write a Review
          </button>
        </div>
      </main>

      {/* Footer - Pre-rendered */}
      <footer className="border-t bg-gray-50 dark:bg-gray-900 dark:border-gray-800 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center text-gray-600 dark:text-gray-400">
          <p>© 2027 OhMyProfessors | University of Adelaide</p>
          <p className="text-sm mt-2">Beta Version 1.0.0</p>
        </div>
      </footer>
    </div>
  )
}
