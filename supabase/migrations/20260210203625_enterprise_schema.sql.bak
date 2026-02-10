-- OhMyProfessors Database Schema
-- Version: 1.0
-- Date: 2026-02-10
-- Execute this SQL in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Universities table
CREATE TABLE universities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    location TEXT,
    website TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Professors table
CREATE TABLE professors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    university_id UUID REFERENCES universities(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    department TEXT,
    email TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Users table (extends Supabase auth.users)
CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    display_name TEXT,
    university_id UUID REFERENCES universities(id),
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Reviews table
CREATE TABLE reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    professor_id UUID REFERENCES professors(id) ON DELETE CASCADE,
    user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    course_code TEXT NOT NULL,
    difficulty INTEGER CHECK (difficulty >= 1 AND difficulty <= 5),
    workload INTEGER CHECK (workload >= 0 AND workload <= 100), -- hours/week
    would_recommend BOOLEAN NOT NULL,
    exam_format TEXT[], -- Array of tags: ['open-book', 'closed-book', 'take-home']
    comment TEXT NOT NULL,
    upvotes INTEGER DEFAULT 0,
    downvotes INTEGER DEFAULT 0,
    status TEXT DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Ensure users can only review each professor+course once
    UNIQUE(professor_id, user_id, course_code)
);

-- Review votes table
CREATE TABLE review_votes (
    review_id UUID REFERENCES reviews(id) ON DELETE CASCADE,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    vote_type TEXT CHECK (vote_type IN ('upvote', 'downvote')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    
    PRIMARY KEY (review_id, user_id)
);

-- Professor tags table (for categorization)
CREATE TABLE professor_tags (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    professor_id UUID REFERENCES professors(id) ON DELETE CASCADE,
    tag TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    
    UNIQUE(professor_id, tag)
);

-- Saved professors table (bookmarking)
CREATE TABLE saved_professors (
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    professor_id UUID REFERENCES professors(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    
    PRIMARY KEY (user_id, professor_id)
);

-- Indexes for performance
CREATE INDEX idx_professors_university ON professors(university_id);
CREATE INDEX idx_professors_slug ON professors(slug);
CREATE INDEX idx_professors_name_search ON professors USING gin(to_tsvector('english', name));
CREATE INDEX idx_reviews_professor ON reviews(professor_id);
CREATE INDEX idx_reviews_user ON reviews(user_id);
CREATE INDEX idx_reviews_status ON reviews(status);
CREATE INDEX idx_reviews_created_at ON reviews(created_at DESC);
CREATE INDEX idx_reviews_upvotes ON reviews(upvotes DESC);
CREATE INDEX idx_professor_tags_professor ON professor_tags(professor_id);
CREATE INDEX idx_professor_tags_tag ON professor_tags(tag);
CREATE INDEX idx_saved_professors_user ON saved_professors(user_id);

-- Trigger to auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_universities_updated_at
    BEFORE UPDATE ON universities
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_professors_updated_at
    BEFORE UPDATE ON professors
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reviews_updated_at
    BEFORE UPDATE ON reviews
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) policies
ALTER TABLE universities ENABLE ROW LEVEL SECURITY;
ALTER TABLE professors ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE review_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE professor_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_professors ENABLE ROW LEVEL SECURITY;

-- Universities: Public read
CREATE POLICY "Universities are viewable by everyone"
    ON universities FOR SELECT
    USING (true);

-- Professors: Public read
CREATE POLICY "Professors are viewable by everyone"
    ON professors FOR SELECT
    USING (true);

-- Profiles: Users can view own profile
CREATE POLICY "Users can view own profile"
    ON profiles FOR SELECT
    USING (auth.uid() = id);

-- Profiles: Users can update own profile
CREATE POLICY "Users can update own profile"
    ON profiles FOR UPDATE
    USING (auth.uid() = id);

-- Profiles: Auto-create profile on signup
CREATE POLICY "Users can insert own profile"
    ON profiles FOR INSERT
    WITH CHECK (auth.uid() = id);

-- Reviews: Public read for approved reviews
CREATE POLICY "Approved reviews are viewable by everyone"
    ON reviews FOR SELECT
    USING (status = 'approved');

-- Reviews: Users can view own reviews
CREATE POLICY "Users can view own reviews"
    ON reviews FOR SELECT
    USING (auth.uid() = user_id);

-- Reviews: Authenticated users can create
CREATE POLICY "Authenticated users can create reviews"
    ON reviews FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Reviews: Users can update own pending reviews
CREATE POLICY "Users can update own pending reviews"
    ON reviews FOR UPDATE
    USING (auth.uid() = user_id AND status = 'pending');

-- Review votes: Authenticated users can vote
CREATE POLICY "Authenticated users can vote"
    ON review_votes FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own votes"
    ON review_votes FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own votes"
    ON review_votes FOR DELETE
    USING (auth.uid() = user_id);

-- Professor tags: Public read
CREATE POLICY "Professor tags are viewable by everyone"
    ON professor_tags FOR SELECT
    USING (true);

-- Saved professors: Users can manage own bookmarks
CREATE POLICY "Users can view own saved professors"
    ON saved_professors FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can save professors"
    ON saved_professors FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can unsave professors"
    ON saved_professors FOR DELETE
    USING (auth.uid() = user_id);

-- Seed data: Add Adelaide University
INSERT INTO universities (name, slug, location, website)
VALUES (
    'University of Adelaide',
    'university-of-adelaide',
    'Adelaide, South Australia',
    'https://www.adelaide.edu.au'
) ON CONFLICT (slug) DO NOTHING;

-- Success message
DO $$
BEGIN
    RAISE NOTICE 'Schema created successfully! Total tables: 7';
    RAISE NOTICE 'Tables: universities, professors, profiles, reviews, review_votes, professor_tags, saved_professors';
    RAISE NOTICE 'Next steps:';
    RAISE NOTICE '1. Configure Auth providers in Supabase Dashboard';
    RAISE NOTICE '2. Set environment variables in Vercel';
    RAISE NOTICE '3. Deploy your application';
END $$;
