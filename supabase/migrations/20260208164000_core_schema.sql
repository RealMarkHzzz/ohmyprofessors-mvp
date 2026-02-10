-- Core Database Schema for Oh My Professors
-- Phase 2: Database Migration

-- 1. Universities Table
CREATE TABLE IF NOT EXISTS universities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    country TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Professors Table
CREATE TABLE IF NOT EXISTS professors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    university_id UUID REFERENCES universities(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    department TEXT,
    rating_avg FLOAT DEFAULT 0,
    review_count INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Subjects Table (Courses)
CREATE TABLE IF NOT EXISTS subjects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    university_id UUID REFERENCES universities(id) ON DELETE CASCADE,
    course_code TEXT NOT NULL,
    course_name TEXT,
    department TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(university_id, course_code)
);

-- 4. Reviews Table
CREATE TABLE IF NOT EXISTS reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    professor_id UUID REFERENCES professors(id) ON DELETE CASCADE,
    subject_id UUID REFERENCES subjects(id) ON DELETE SET NULL,
    user_id UUID NOT NULL, -- References auth.users(id)
    rating INT CHECK (rating >= 1 AND rating <= 5),
    difficulty INT CHECK (difficulty >= 1 AND difficulty <= 5),
    clarity INT CHECK (clarity >= 1 AND clarity <= 5),
    responsiveness INT CHECK (responsiveness >= 1 AND responsiveness <= 5),
    fairness INT CHECK (fairness >= 1 AND fairness <= 5),
    engagement INT CHECK (engagement >= 1 AND engagement <= 5),
    workload INT CHECK (workload >= 1 AND workload <= 5),
    interest_level INT CHECK (interest_level >= 1 AND interest_level <= 5),
    practicality INT CHECK (practicality >= 1 AND practicality <= 5),
    comment TEXT,
    semester TEXT,
    year INT,
    campus TEXT,
    delivery_mode TEXT,
    is_verified_student BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Row Level Security (RLS) Configuration
ALTER TABLE universities ENABLE ROW LEVEL SECURITY;
ALTER TABLE professors ENABLE ROW LEVEL SECURITY;
ALTER TABLE subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Universities: Read only for everyone
DO $$ BEGIN
    CREATE POLICY "Universities are viewable by everyone" ON universities FOR SELECT USING (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- Professors: Read only for everyone
DO $$ BEGIN
    CREATE POLICY "Professors are viewable by everyone" ON professors FOR SELECT USING (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- Subjects: Read only for everyone
DO $$ BEGIN
    CREATE POLICY "Subjects are viewable by everyone" ON subjects FOR SELECT USING (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- Reviews: Read only for everyone, Write for authenticated owners
DO $$ BEGIN
    CREATE POLICY "Reviews are viewable by everyone" ON reviews FOR SELECT USING (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
    CREATE POLICY "Authenticated users can insert reviews" ON reviews FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
    CREATE POLICY "Users can update their own reviews" ON reviews FOR UPDATE USING (auth.uid() = user_id);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
    CREATE POLICY "Users can delete their own reviews" ON reviews FOR DELETE USING (auth.uid() = user_id);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
