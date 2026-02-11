import { getProfessorBySlug } from '@/lib/api/professors'
import { getReviewsByProfessorId, getRatingDistribution } from '@/lib/api/reviews'
import { notFound } from 'next/navigation'
import ProfessorPageClient from './page-client'

interface ProfessorPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function ProfessorPage({ params }: ProfessorPageProps) {
  const { slug } = await params
  
  // Fetch data on server
  const professor = await getProfessorBySlug(slug)
  
  if (!professor) {
    notFound()
  }

  const [reviews, ratingDist] = await Promise.all([
    getReviewsByProfessorId(professor.id),
    getRatingDistribution(professor.id),
  ])

  // Pass data to client component via search params (URL encoding)
  // This is a workaround for server->client data passing in Next.js 15
  return (
    <ProfessorPageClient
      params={Promise.resolve({ slug })}
      searchParams={Promise.resolve({
        professor: encodeURIComponent(JSON.stringify(professor)),
        reviews: encodeURIComponent(JSON.stringify(reviews)),
        ratingDist: encodeURIComponent(JSON.stringify(ratingDist)),
      })}
    />
  )
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ProfessorPageProps) {
  const { slug } = await params
  const professor = await getProfessorBySlug(slug)

  if (!professor) {
    return {
      title: 'Professor Not Found',
    }
  }

  return {
    title: `${professor.name} - ${professor.title} | OhMyProfessors`,
    description: `Read ${professor.total_reviews} student reviews for ${professor.name}, ${professor.title} in ${professor.department} at ${professor.university}. Average rating: ${professor.overall_rating}/5`,
  }
}
