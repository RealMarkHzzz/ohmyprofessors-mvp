// Professor interface compatible with both mock data and API
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

export interface SearchFilters {
  query?: string;
  department?: string | null;
  minRating?: number | null;
  tags?: string[];
}

export type SortOption = 
  | 'rating-desc'
  | 'rating-asc'
  | 'reviews-desc'
  | 'reviews-asc'
  | 'name-asc'
  | 'name-desc';

/**
 * Filter professors based on search criteria
 */
export function filterProfessors(
  professors: Professor[],
  filters: SearchFilters
): Professor[] {
  let filtered = [...professors];

  // Text search (name, email, department)
  if (filters.query && filters.query.trim()) {
    const query = filters.query.toLowerCase();
    filtered = filtered.filter(prof => 
      prof.name.toLowerCase().includes(query) ||
      prof.department.toLowerCase().includes(query) ||
      prof.email.toLowerCase().includes(query) ||
      prof.bio?.toLowerCase().includes(query)
    );
  }

  // Department filter
  if (filters.department) {
    filtered = filtered.filter(prof => prof.department === filters.department);
  }

  // Minimum rating filter
  if (filters.minRating !== null && filters.minRating !== undefined) {
    filtered = filtered.filter(prof => prof.overall_rating >= filters.minRating!);
  }

  // Tags filter (professor must have at least one of the selected tags)
  if (filters.tags && filters.tags.length > 0) {
    filtered = filtered.filter(prof => 
      filters.tags!.some(tag => prof.tags.includes(tag))
    );
  }

  return filtered;
}

/**
 * Sort professors
 */
export function sortProfessors(
  professors: Professor[],
  sortOption: SortOption
): Professor[] {
  const sorted = [...professors];

  switch (sortOption) {
    case 'rating-desc':
      return sorted.sort((a, b) => b.overall_rating - a.overall_rating);
    
    case 'rating-asc':
      return sorted.sort((a, b) => a.overall_rating - b.overall_rating);
    
    case 'reviews-desc':
      return sorted.sort((a, b) => b.total_reviews - a.total_reviews);
    
    case 'reviews-asc':
      return sorted.sort((a, b) => a.total_reviews - b.total_reviews);
    
    case 'name-asc':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    
    case 'name-desc':
      return sorted.sort((a, b) => b.name.localeCompare(a.name));
    
    default:
      return sorted;
  }
}

/**
 * Search and filter professors (combined)
 * Now accepts professors array as first parameter for client-side filtering
 */
export function searchAndFilterProfessors(
  professors: Professor[],
  filters: SearchFilters,
  sortOption: SortOption = 'rating-desc'
): Professor[] {
  const filtered = filterProfessors(professors, filters);
  const sorted = sortProfessors(filtered, sortOption);
  return sorted;
}

/**
 * Paginate results
 */
export function paginateResults<T>(
  items: T[],
  page: number = 1,
  limit: number = 20
): { items: T[]; total: number; page: number; totalPages: number } {
  const start = (page - 1) * limit;
  const end = start + limit;
  const paginatedItems = items.slice(start, end);
  
  return {
    items: paginatedItems,
    total: items.length,
    page,
    totalPages: Math.ceil(items.length / limit),
  };
}

/**
 * Get unique values from array
 */
export function getUniqueValues<T>(arr: T[]): T[] {
  return Array.from(new Set(arr));
}

/**
 * Calculate rating distribution percentage
 */
export function getRatingDistributionPercent(
  distribution: { [key: number]: number }
): { [key: number]: number } {
  const total = Object.values(distribution).reduce((sum, count) => sum + count, 0);
  const percentages: { [key: number]: number } = {};
  
  Object.entries(distribution).forEach(([rating, count]) => {
    percentages[Number(rating)] = total > 0 ? Math.round((count / total) * 100) : 0;
  });
  
  return percentages;
}
