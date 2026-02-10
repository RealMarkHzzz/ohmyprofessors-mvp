/**
 * Application route paths
 * Centralized route management for type-safe navigation
 */

export const ROUTES = {
  home: "/",
  about: "/about",
  
  // Authentication
  login: "/login",
  signup: "/signup",
  logout: "/logout",
  
  // Professors
  professors: "/professors",
  professorDetail: (id: string) => `/professors/${id}`,
  
  // Reviews
  reviews: "/reviews",
  newReview: (professorId: string) => `/reviews/new?professor=${professorId}`,
  
  // Universities
  universities: "/universities",
  universityDetail: (id: string) => `/universities/${id}`,
  
  // User
  profile: "/profile",
  settings: "/settings",
  
  // API
  api: {
    auth: {
      callback: "/api/auth/callback",
    },
    professors: "/api/professors",
    reviews: "/api/reviews",
  },
} as const;
