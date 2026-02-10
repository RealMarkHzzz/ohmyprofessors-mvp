import { NextRequest, NextResponse } from 'next/server'
import { mockReviews } from '@/lib/data/mock-reviews'

/**
 * PATCH /api/reviews/[id]/helpful
 * Mark a review as helpful (increment helpful_count)
 */
export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params
    
    // Find the review
    const review = mockReviews.find(r => r.id === id)
    
    if (!review) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Review not found' 
        },
        { status: 404 }
      )
    }
    
    // Increment helpful count
    // Note: In production, we'd check if user already marked as helpful
    review.helpful_count += 1
    review.updated_at = new Date().toISOString()
    
    console.log(`✅ Review ${id} marked as helpful (count: ${review.helpful_count})`)
    
    return NextResponse.json({
      success: true,
      review,
      message: 'Review marked as helpful'
    })
  } catch (error) {
    console.error('❌ Error marking review as helpful:', error)
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error' 
      },
      { status: 500 }
    )
  }
}
