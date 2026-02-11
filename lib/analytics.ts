/**
 * Analytics Tracking System
 * Simple, privacy-focused event tracking for PMF metrics
 * 
 * Features:
 * - Anonymous user tracking (localStorage)
 * - Session tracking (sessionStorage)
 * - No PII collection
 * - Direct to Supabase (no third-party dependencies)
 * 
 * @module lib/analytics
 */

import { createClient } from '@/lib/supabase/client';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export type EventType = 
  | 'page_view'
  | 'professor_view'
  | 'review_submit'
  | 'user_return'
  | 'search';

export interface EventMetadata {
  page?: string;
  professorId?: string;
  professorName?: string;
  reviewId?: string;
  query?: string;
  [key: string]: unknown;
}

export interface AnalyticsEvent {
  id?: string;
  event_type: EventType;
  user_id: string;
  session_id: string;
  metadata?: EventMetadata;
  created_at?: string;
}

// ============================================================================
// USER & SESSION ID MANAGEMENT
// ============================================================================

/**
 * Get or create anonymous user ID
 * Stored in localStorage for cross-session tracking
 */
export function getOrCreateUserId(): string {
  if (typeof window === 'undefined') return 'server';
  
  const STORAGE_KEY = 'omp_user_id';
  
  let userId = localStorage.getItem(STORAGE_KEY);
  
  if (!userId) {
    // Generate anonymous ID: anon_[timestamp]_[random]
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 9);
    userId = `anon_${timestamp}_${random}`;
    
    try {
      localStorage.setItem(STORAGE_KEY, userId);
    } catch (error) {
      console.warn('Failed to store user ID:', error);
    }
  }
  
  return userId;
}

/**
 * Get or create session ID
 * Stored in sessionStorage (cleared when browser tab closes)
 */
export function getOrCreateSessionId(): string {
  if (typeof window === 'undefined') return 'server';
  
  const STORAGE_KEY = 'omp_session_id';
  
  let sessionId = sessionStorage.getItem(STORAGE_KEY);
  
  if (!sessionId) {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 9);
    sessionId = `session_${timestamp}_${random}`;
    
    try {
      sessionStorage.setItem(STORAGE_KEY, sessionId);
    } catch (error) {
      console.warn('Failed to store session ID:', error);
    }
  }
  
  return sessionId;
}

// ============================================================================
// CORE TRACKING FUNCTION
// ============================================================================

/**
 * Track an analytics event
 * Fire-and-forget (doesn't block UI)
 */
async function trackEvent(
  eventType: EventType,
  metadata?: EventMetadata
): Promise<void> {
  // Skip tracking on server-side
  if (typeof window === 'undefined') return;
  
  // Skip tracking in development (optional - remove if you want dev data)
  if (process.env.NODE_ENV === 'development') {
    console.log('[Analytics]', eventType, metadata);
    return;
  }
  
  try {
    const supabase = createClient();
    const userId = getOrCreateUserId();
    const sessionId = getOrCreateSessionId();
    
    const event: AnalyticsEvent = {
      event_type: eventType,
      user_id: userId,
      session_id: sessionId,
      metadata: metadata || {},
    };
    
    // Fire and forget (don't await to avoid blocking UI)
    supabase
      .from('analytics_events')
      .insert(event as any)
      .then(({ error }) => {
        if (error) {
          console.error('Analytics tracking failed:', error);
        }
      });
      
  } catch (error) {
    console.error('Analytics error:', error);
  }
}

// ============================================================================
// PUBLIC TRACKING FUNCTIONS
// ============================================================================

/**
 * Track page view
 * @param page - Page path (e.g., '/professors/john-smith')
 */
export function trackPageView(page: string): void {
  trackEvent('page_view', { page });
}

/**
 * Track professor profile view
 * @param professorId - Professor UUID
 * @param professorName - Professor name (optional, for context)
 */
export function trackProfessorView(
  professorId: string,
  professorName?: string
): void {
  trackEvent('professor_view', {
    professorId,
    ...(professorName && { professorName }),
  });
}

/**
 * Track review submission
 * @param reviewId - Review UUID
 * @param professorId - Professor UUID
 */
export function trackReviewSubmit(
  reviewId: string,
  professorId: string
): void {
  trackEvent('review_submit', {
    reviewId,
    professorId,
  });
}

/**
 * Track user return (called on app initialization)
 * Helps measure retention
 */
export function trackUserReturn(): void {
  trackEvent('user_return', {
    timestamp: new Date().toISOString(),
  });
}

/**
 * Track search query
 * @param query - Search query string
 */
export function trackSearch(query: string): void {
  // Only track non-empty queries
  if (!query.trim()) return;
  
  trackEvent('search', {
    query: query.trim().toLowerCase(),
    queryLength: query.length,
  });
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Check if this is the user's first visit
 */
export function isFirstVisit(): boolean {
  if (typeof window === 'undefined') return false;
  
  const userId = localStorage.getItem('omp_user_id');
  return !userId;
}

/**
 * Reset user ID (for testing or privacy)
 * WARNING: This will create a new user identity
 */
export function resetUserId(): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem('omp_user_id');
    sessionStorage.removeItem('omp_session_id');
  } catch (error) {
    console.warn('Failed to reset user ID:', error);
  }
}

/**
 * Get current user and session IDs (for debugging)
 */
export function getAnalyticsIds(): { userId: string; sessionId: string } {
  return {
    userId: getOrCreateUserId(),
    sessionId: getOrCreateSessionId(),
  };
}
