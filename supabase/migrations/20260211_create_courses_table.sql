-- ================================================
-- Course-First Mode: Database Schema Migration
-- ================================================
-- Created: 2026-02-11
-- Purpose: 课程优先模式数据模型
-- ================================================

-- 1. COURSES TABLE
-- ================================================
CREATE TABLE IF NOT EXISTS courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code VARCHAR(20) NOT NULL,
  name VARCHAR(255) NOT NULL,
  department VARCHAR(100),
  university VARCHAR(100) NOT NULL,
  description TEXT,
  credits INTEGER,
  avg_rating DECIMAL(3,2) DEFAULT 0 CHECK (avg_rating >= 0 AND avg_rating <= 5),
  total_reviews INTEGER DEFAULT 0 CHECK (total_reviews >= 0),
  professor_count INTEGER DEFAULT 0 CHECK (professor_count >= 0),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Unique constraint: 同一大学不能有重复的课程代码
  CONSTRAINT unique_university_code UNIQUE(university, code)
);

-- 2. COURSE-PROFESSOR ASSOCIATION TABLE
-- ================================================
CREATE TABLE IF NOT EXISTS course_professors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  professor_id UUID NOT NULL REFERENCES professors(id) ON DELETE CASCADE,
  semester VARCHAR(20),
  rating DECIMAL(3,2) DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
  review_count INTEGER DEFAULT 0 CHECK (review_count >= 0),
  difficulty VARCHAR(10) CHECK (difficulty IN ('Easy', 'Medium', 'Hard')),
  top_tags TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Unique constraint: 同一教授在同一学期只能教一次同一课程
  CONSTRAINT unique_course_professor_semester UNIQUE(course_id, professor_id, semester)
);

-- 3. INDEXES FOR PERFORMANCE
-- ================================================
-- Course 查询索引
CREATE INDEX IF NOT EXISTS idx_courses_university ON courses(university);
CREATE INDEX IF NOT EXISTS idx_courses_code ON courses(code);
CREATE INDEX IF NOT EXISTS idx_courses_avg_rating ON courses(avg_rating DESC);
CREATE INDEX IF NOT EXISTS idx_courses_total_reviews ON courses(total_reviews DESC);

-- Course-Professor 关联查询索引
CREATE INDEX IF NOT EXISTS idx_course_professors_course ON course_professors(course_id);
CREATE INDEX IF NOT EXISTS idx_course_professors_professor ON course_professors(professor_id);
CREATE INDEX IF NOT EXISTS idx_course_professors_rating ON course_professors(rating DESC);

-- 4. TRIGGERS FOR AUTO-UPDATE
-- ================================================
-- 自动更新 updated_at 时间戳
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_courses_updated_at
  BEFORE UPDATE ON courses
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- 5. ROW LEVEL SECURITY (RLS)
-- ================================================
-- 启用 RLS
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_professors ENABLE ROW LEVEL SECURITY;

-- 公开读取策略（所有人可以查看课程和关联）
CREATE POLICY "Allow public read access on courses"
  ON courses FOR SELECT
  USING (true);

CREATE POLICY "Allow public read access on course_professors"
  ON course_professors FOR SELECT
  USING (true);

-- 管理员写入策略（需要认证 + 管理员角色）
-- TODO: 实施管理员角色检查
CREATE POLICY "Allow authenticated insert on courses"
  ON courses FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated update on courses"
  ON courses FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated delete on courses"
  ON courses FOR DELETE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated insert on course_professors"
  ON course_professors FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated update on course_professors"
  ON course_professors FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated delete on course_professors"
  ON course_professors FOR DELETE
  USING (auth.role() = 'authenticated');

-- 6. COMMENTS FOR DOCUMENTATION
-- ================================================
COMMENT ON TABLE courses IS '课程信息表 - 课程优先模式核心';
COMMENT ON TABLE course_professors IS '课程-教授关联表 - 记录哪些教授教过哪些课程';

COMMENT ON COLUMN courses.code IS '课程代码，如 COMP 1012';
COMMENT ON COLUMN courses.avg_rating IS '课程平均评分（所有教授的平均）';
COMMENT ON COLUMN courses.professor_count IS '教授该课程的教授数量';

COMMENT ON COLUMN course_professors.semester IS '学期信息，如 2024 S1';
COMMENT ON COLUMN course_professors.rating IS '该教授教授该课程的评分';
COMMENT ON COLUMN course_professors.difficulty IS '难度等级：Easy/Medium/Hard';
COMMENT ON COLUMN course_professors.top_tags IS '该教授教授该课程的热门标签';
