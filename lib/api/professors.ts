/**
 * Professors API - Supabase data layer
 * Maps database types to frontend interfaces
 * DHH principle: Keep it simple, avoid over-abstraction
 */

import { createClient } from '@/lib/supabase/server';
import type { Professor as DBProfessor, University } from '@/types/models';

// Frontend interface (matches existing mock data structure)
export interface Professor {
  id: string;
  name: string;
  email: string;
  department: string;
  university: string;
  avatar_url: string | null;
  bio: string | null;
  title: string;
  slug: string;
  overall_rating: number;
  total_reviews: number;
  difficulty_rating: number;
  would_take_again_percent: number;
  tags: string[];
  created_at: string;
}

/**
 * Map database professor to frontend format
 */
function mapProfessor(dbProf: DBProfessor & { universities?: University }): Professor {
  return {
    id: dbProf.id,
    name: dbProf.name,  // ✅ Fixed: Using correct field name
    email: dbProf.email || '',
    department: dbProf.department,
    university: dbProf.universities?.name || 'Australia G8 University',
    avatar_url: dbProf.profile_image_url,
    bio: dbProf.bio,
    title: dbProf.title || 'Lecturer',
    slug: dbProf.slug,
    overall_rating: dbProf.rating_overall,
    total_reviews: dbProf.total_reviews,
    difficulty_rating: dbProf.rating_difficulty,
    would_take_again_percent: dbProf.would_take_again_percent,
    tags: dbProf.research_interests || [],
    created_at: dbProf.created_at,
  };
}

/**
 * Get all professors with optional filters
 */
export async function getProfessors(filters?: {
  department?: string;
  minRating?: number;
  search?: string;
}): Promise<Professor[]> {
  const supabase = await createClient();

  let query = supabase
    .from('professors')
    .select('*, universities(name, slug)')
    .is('deleted_at', null)
    .order('rating_overall', { ascending: false });

  // Apply filters
  if (filters?.department) {
    query = query.eq('department', filters.department);
  }

  if (filters?.minRating) {
    query = query.gte('rating_overall', filters.minRating);
  }

  if (filters?.search) {
    query = query.or(
      `name.ilike.%${filters.search}%,department.ilike.%${filters.search}%,email.ilike.%${filters.search}%`
    );
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching professors:', error);
    return [];
  }

  return data?.map(mapProfessor) || [];
}

/**
 * Get professor by slug
 */
export async function getProfessorBySlug(slug: string): Promise<Professor | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('professors')
    .select('*, universities(name, slug)')
    .eq('slug', slug)
    .is('deleted_at', null)
    .single();

  if (error || !data) {
    console.error('Error fetching professor:', error);
    return null;
  }

  return mapProfessor(data);
}

/**
 * Search professors by query
 */
export async function searchProfessors(query: string): Promise<Professor[]> {
  return getProfessors({ search: query });
}

/**
 * Get professors by department
 */
export async function getProfessorsByDepartment(department: string): Promise<Professor[]> {
  return getProfessors({ department });
}

/**
 * Get top-rated professors
 */
export async function getTopProfessors(limit: number = 10): Promise<Professor[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('professors')
    .select('*, universities(name, slug)')
    .is('deleted_at', null)
    .order('rating_overall', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching top professors:', error);
    return [];
  }

  return data?.map(mapProfessor) || [];
}

/**
 * Get all unique departments
 */
export async function getAllDepartments(): Promise<string[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('professors')
    .select('department')
    .is('deleted_at', null);

  if (error) {
    console.error('Error fetching departments:', error);
    return [];
  }

  // Extract unique departments and sort
  const departments = Array.from(new Set(data?.map((d: any) => d.department) || []));
  return departments.sort();
}

/**
 * Get all unique tags (from research_interests)
 */
export async function getAllTags(): Promise<string[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('professors')
    .select('research_interests')
    .is('deleted_at', null);

  if (error) {
    console.error('Error fetching tags:', error);
    return [];
  }

  // Flatten all research_interests arrays and get unique values
  const tagsSet = new Set<string>();
  data?.forEach((prof: any) => {
    prof.research_interests?.forEach((tag: string) => tagsSet.add(tag));
  });

  return Array.from(tagsSet).sort();
}
