import { Navbar } from '@/components/shared/Navbar'
import { HeroSection } from '@/components/home/HeroSection'
import { FeaturesSection } from '@/components/home/FeaturesSection'
import { ProfessorListClient } from '@/components/home/ProfessorListClient'
import { Footer } from '@/components/shared/Footer'
import { Button } from '@/components/ui/Button'

export const metadata = {
  title: 'OhMyProfessors - Find Your Perfect Professor',
  description: 'Real Student Reviews, Real Decisions. Rate and discover professors at Australian universities.',
}

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <HeroSection />

        {/* Features Section */}
        <FeaturesSection />

        {/* Professor List Section */}
        <section id="professors" className="section bg-white dark:bg-gray-900">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Browse{' '}
                <span className="gradient-text">Professors</span>
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Explore reviews and ratings from students at University of Adelaide
              </p>
            </div>
            
            {/* Professor List - Client Component for interactivity */}
            <ProfessorListClient />
          </div>
        </section>

        {/* CTA Section */}
        <section className="section bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center text-white">
              <h3 className="font-heading text-2xl md:text-3xl font-bold mb-4">
                Help Other Students Succeed
              </h3>
              <p className="text-lg mb-8 text-white/90">
                Share your experience with professors at University of Adelaide and help your peers make better decisions.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button 
                  className="bg-white text-blue-600 dark:text-blue-700 hover:bg-gray-100 dark:hover:bg-gray-200 shadow-lg"
                >
                  Write a Review
                </Button>
                <Button 
                  variant="secondary"
                  className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm"
                >
                  Learn More
                </Button>
              </div>
              <p className="text-sm mt-6 text-white/70">
                No account required. Takes less than 2 minutes.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
