/**
 * Application-wide constants and configuration
 */

export const APP_CONFIG = {
  name: "OhMyProfessors",
  description: "Rate and review your professors",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  author: "OhMyProfessors Team",
  keywords: [
    "professor ratings",
    "university reviews",
    "course reviews",
    "student feedback",
  ],
} as const;

export const RATING_CONFIG = {
  min: 1,
  max: 5,
  step: 1,
  categories: ["overall", "difficulty", "clarity", "helpfulness"] as const,
} as const;

export const PAGINATION = {
  defaultPageSize: 20,
  maxPageSize: 100,
  professorsList: 24,
  reviewsList: 10,
} as const;

export const REVIEW_CONFIG = {
  minTitleLength: 5,
  maxTitleLength: 100,
  minContentLength: 20,
  maxContentLength: 5000,
  maxTags: 10,
} as const;

export const CACHE_DURATION = {
  static: 60 * 60 * 24 * 30, // 30 days
  professor: 60, // 1 minute (ISR)
  reviews: 0, // No cache (real-time)
  universities: 60 * 60 * 24, // 1 day
} as const;
