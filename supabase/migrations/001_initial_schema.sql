-- ============================================================================
-- Migration: Create base tables
-- Description: Initial database schema for OhMyProfessors
-- ============================================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create custom types
CREATE TYPE user_role AS ENUM ('student', 'admin', 'moderator');
CREATE TYPE review_status AS ENUM ('pending', 'approved', 'rejected', 'flagged');
CREATE TYPE difficulty_level AS ENUM ('easy', 'medium', 'hard', 'very_hard');

-- Universities Table
CREATE TABLE public.universities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    country TEXT NOT NULL,
    state TEXT,
    city TEXT NOT NULL,
    website TEXT,
    logo_url TEXT,
    description TEXT,
    student_count INTEGER,
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

-- Users Table (extends Supabase auth.users)
CREATE TABLE public.users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    university_id UUID REFERENCES public.universities(id),
    role user_role DEFAULT 'student',
    email_verified BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

-- See CTO_ARCHITECTURE.md for complete schema
-- This is a minimal starting point
