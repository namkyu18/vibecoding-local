-- Supabase 데이터베이스 스키마
-- namkyu18's Project를 위한 테이블 생성

-- 1. 개발자 정보 테이블
CREATE TABLE IF NOT EXISTS developer (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(100) NOT NULL,
    education VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    github VARCHAR(200) NOT NULL,
    linkedin VARCHAR(200) NOT NULL,
    philosophy TEXT NOT NULL,
    experience TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. 기술 스택 테이블
CREATE TABLE IF NOT EXISTS skills (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    icon VARCHAR(10) NOT NULL,
    level VARCHAR(10) CHECK (level IN ('초급', '중급', '고급')) NOT NULL,
    category VARCHAR(20) CHECK (category IN ('frontend', 'backend', 'tools', 'design')) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. 프로젝트 테이블
CREATE TABLE IF NOT EXISTS projects (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    detailed_description TEXT NOT NULL,
    tech TEXT[] NOT NULL, -- PostgreSQL 배열 타입
    status VARCHAR(10) CHECK (status IN ('완료', '진행중', '계획중')) NOT NULL,
    image VARCHAR(200) NOT NULL,
    github_url VARCHAR(200) NOT NULL,
    demo_url VARCHAR(200) NOT NULL,
    features TEXT[] NOT NULL,
    duration VARCHAR(50) NOT NULL,
    team_size VARCHAR(100) NOT NULL,
    challenges TEXT[] NOT NULL,
    solutions TEXT[] NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. 방명록 테이블
CREATE TABLE IF NOT EXISTS guestbook (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. 좋아요 테이블
CREATE TABLE IF NOT EXISTS likes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    item_id VARCHAR(100) NOT NULL,
    item_type VARCHAR(20) CHECK (item_type IN ('project', 'skill', 'general')) NOT NULL,
    count INTEGER DEFAULT 1 NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(item_id, item_type)
);

-- 6. 추천 문구 테이블
CREATE TABLE IF NOT EXISTS recommendations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    content TEXT NOT NULL,
    author VARCHAR(100),
    category VARCHAR(20) CHECK (category IN ('motivation', 'tech', 'life', 'career')) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_tech ON projects USING GIN(tech);
CREATE INDEX IF NOT EXISTS idx_skills_category ON skills(category);
CREATE INDEX IF NOT EXISTS idx_skills_level ON skills(level);
CREATE INDEX IF NOT EXISTS idx_guestbook_created_at ON guestbook(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_likes_item ON likes(item_id, item_type);
CREATE INDEX IF NOT EXISTS idx_recommendations_category ON recommendations(category);

-- RLS (Row Level Security) 정책 설정
ALTER TABLE developer ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE guestbook ENABLE ROW LEVEL SECURITY;
ALTER TABLE likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE recommendations ENABLE ROW LEVEL SECURITY;

-- 모든 사용자가 읽기 가능하도록 설정
CREATE POLICY "Allow public read access" ON developer FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON skills FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON projects FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON guestbook FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON likes FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON recommendations FOR SELECT USING (true);

-- 방명록과 좋아요는 모든 사용자가 작성 가능
CREATE POLICY "Allow public insert access" ON guestbook FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert access" ON likes FOR INSERT WITH CHECK (true);

-- 좋아요는 업데이트 가능
CREATE POLICY "Allow public update access" ON likes FOR UPDATE USING (true);

-- 방명록은 삭제 가능 (관리자용)
CREATE POLICY "Allow public delete access" ON guestbook FOR DELETE USING (true);
CREATE POLICY "Allow public delete access" ON likes FOR DELETE USING (true);

-- updated_at 자동 업데이트를 위한 함수
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 트리거 생성
CREATE TRIGGER update_developer_updated_at BEFORE UPDATE ON developer FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_skills_updated_at BEFORE UPDATE ON skills FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_guestbook_updated_at BEFORE UPDATE ON guestbook FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_likes_updated_at BEFORE UPDATE ON likes FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
