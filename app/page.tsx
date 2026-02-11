import { Navbar } from '@/components/shared/Navbar'
import { HeroSection } from '@/components/home/HeroSection'
import { SocialProofBar } from '@/components/home/SocialProofBar'
import { FeaturesSection } from '@/components/home/FeaturesSection'
import { ProfessorListClient } from '@/components/home/ProfessorListClient'
import { Footer } from '@/components/shared/Footer'
import { Button } from '@/components/ui/Button'
import { getProfessors, getAllDepartments, getAllTags } from '@/lib/api/professors'
import { getAllReviews } from '@/lib/api/reviews'

export const metadata = {
  title: 'OhMyProfessors - Find Your Perfect Professor',
  description: 'Real Student Reviews, Real Decisions. Rate and discover professors at Australian universities.',
}

export default async function Home() {
  // Fetch data on the server (Server Component)
  const [professors, departments, tags, reviews] = await Promise.all([
    getProfessors(),
    getAllDepartments(),
    getAllTags(),
    getAllReviews(),
  ])

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <HeroSection />

        {/* Social Proof Bar */}
        <SocialProofBar />

        {/* Features Section */}
        <FeaturesSection />

        {/* Professor List Section */}
        <section id="professors" className="section bg-white">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Browse{' '}
                <span className="text-gray-950">Professors</span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Explore reviews and ratings from students at University of Adelaide
              </p>
            </div>
            
            {/* Professor List - Client Component for interactivity */}
            <ProfessorListClient 
              initialProfessors={professors}
              initialDepartments={departments}
              initialTags={tags}
              initialReviewCount={reviews.length}
            />
          </div>
        </section>

        {/* CTA Section - Flat Design */}
        <div className="text-center py-12 bg-gray-50">
          <p className="text-gray-700 mb-4">
            想分享你的课程体验？
          </p>
          <a href="/submit-review" className="text-[#D4AF37] hover:underline font-medium">
            提交评价 →
          </a>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
