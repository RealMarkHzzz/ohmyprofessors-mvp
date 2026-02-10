import { NextRequest, NextResponse } from 'next/server'
import { reviewSchema } from '@/lib/validations'
import { addReview } from '@/lib/data/mock-reviews'

/**
 * POST /api/reviews
 * Submit a new review
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate data with Zod schema
    const validationResult = reviewSchema.safeParse(body)
    
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Validation failed',
          details: validationResult.error.flatten().fieldErrors
        },
        { status: 400 }
      )
    }
    
    const validatedData = validationResult.data
    
    // Add review to mock data (in-memory for MVP)
    const newReview = addReview({
      professor_id: validatedData.professor_id,
      user_id: null, // Anonymous for now
      rating: validatedData.rating,
      difficulty: validatedData.difficulty,
      course_code: validatedData.course_code,
      course_name: validatedData.course_name,
      content: validatedData.content || null,
      tags: validatedData.tags,
      semester: validatedData.semester,
      would_take_again: validatedData.would_take_again,
      attendance_mandatory: validatedData.attendance_mandatory,
    })
    
    console.log('✅ Review created:', newReview.id)
    
    return NextResponse.json(
      { 
        success: true, 
        review: newReview,
        message: 'Review submitted successfully'
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('❌ Error creating review:', error)
    
    if (error instanceof Error) {
      return NextResponse.json(
        { 
          success: false, 
          error: error.message 
        },
        { status: 500 }
      )
    }
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error' 
      },
      { status: 500 }
    )
  }
}

/**
 * GET /api/reviews
 * Get all reviews (with optional filtering)
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const professorId = searchParams.get('professor_id')
    
    // Import here to avoid circular dependencies
    const { getAllReviews, getReviewsByProfessorId } = await import('@/lib/data/mock-reviews')
    
    const reviews = professorId 
      ? getReviewsByProfessorId(professorId)
      : getAllReviews()
    
    return NextResponse.json({
      success: true,
      reviews,
      count: reviews.length
    })
  } catch (error) {
    console.error('❌ Error fetching reviews:', error)
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch reviews' 
      },
      { status: 500 }
    )
  }
}
