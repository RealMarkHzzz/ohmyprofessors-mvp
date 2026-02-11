/**
 * Reviews API - Supabase data layer
 * Maps database review types to frontend interfaces
 */

import { createClient } from '@/lib/supabase/server';
import type { Review as DBReview } from '@/types/models';

// Frontend interface (matches existing mock data structure)
export interface Review {
  id: string;
  professor_id: string;
  user_id: string | null;
  rating: number;
  difficulty: number;
  course_code: string;
  course_name: string;
  content: string | null;
  tags: string[];
  helpful_count: number;
  semester: string;
  would_take_again: boolean;
  attendance_mandatory: boolean;
  created_at: string;
  updated_at: string;
}

/**
 * Map database review to frontend format
 */
function mapReview(dbReview: DBReview): Review {
  return {
    id: dbReview.id,
    professor_id: dbReview.professor_id,
    user_id: dbReview.user_id,
    rating: dbReview.rating_overall,
    difficulty: dbReview.rating_difficulty,
    course_code: dbReview.course_code,
    course_name: dbReview.course_name,
    content: dbReview.content,
    tags: dbReview.tags || [],
    helpful_count: dbReview.upvotes - dbReview.downvotes,
    semester: `${dbReview.academic_year} ${dbReview.semester}`,
    would_take_again: dbReview.would_take_again ?? false,
    attendance_mandatory: dbReview.attendance_mandatory ?? false,
    created_at: dbReview.created_at,
    updated_at: dbReview.updated_at,
  };
}

/**
 * Get reviews for a specific professor
 */
export async function getReviewsByProfessorId(professorId: string): Promise<Review[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('professor_id', professorId)
    .eq('status', 'approved')
    .is('deleted_at', null)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching reviews:', error);
    return [];
  }

  return data?.map(mapReview) || [];
}

/**
 * Get rating distribution for a professor
 */
export async function getRatingDistribution(professorId: string): Promise<Record<number, number>> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('reviews')
    .select('rating_overall')
    .eq('professor_id', professorId)
    .eq('status', 'approved')
    .is('deleted_at', null);

  if (error) {
    console.error('Error fetching rating distribution:', error);
    return {};
  }

  // Count ratings
  const distribution: Record<number, number> = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  };

  data?.forEach((review: any) => {
    const rating = Math.round(review.rating_overall);
    if (rating >= 1 && rating <= 5 && distribution[rating] !== undefined) {
      distribution[rating]++;
    }
  });

  return distribution;
}

/**
 * Get all reviews (for homepage stats)
 */
export async function getAllReviews(): Promise<Review[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('status', 'approved')
    .is('deleted_at', null)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching all reviews:', error);
    return [];
  }

  return data?.map(mapReview) || [];
}

/**
 * Create a new review
 */
export async function createReview(review: Omit<Review, 'id' | 'created_at' | 'updated_at' | 'helpful_count'>): Promise<Review | null> {
  const supabase = await createClient();

  // Parse semester back to academic_year and semester
  const [academicYear, ...semesterParts] = review.semester.split(' ');
  const semester = semesterParts.join(' ');

  const { data, error } = await supabase
    .from('reviews')
    .insert({
      professor_id: review.professor_id,
      user_id: review.user_id || '',
      rating_overall: review.rating,
      rating_difficulty: review.difficulty,
      rating_clarity: review.rating, // Default to overall rating
      rating_helpfulness: review.rating, // Default to overall rating
      course_code: review.course_code,
      course_name: review.course_name,
      content: review.content || '',
      tags: review.tags,
      academic_year: academicYear,
      semester: semester,
      would_take_again: review.would_take_again,
      attendance_mandatory: review.attendance_mandatory,
      difficulty: 'medium', // Default, could be calculated
      title: review.course_name, // Use course name as title
      status: 'pending', // Reviews need approval
      is_anonymous: !review.user_id,
    } as any)
    .select()
    .single();

  if (error) {
    console.error('Error creating review:', error);
    return null;
  }

  return data ? mapReview(data) : null;
}
