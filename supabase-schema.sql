-- FRC 러닝 크루 데이터베이스 스키마

-- 관리자 테이블
CREATE TABLE admins (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 러닝 세션 테이블
CREATE TABLE running_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  date DATE NOT NULL,
  time TIME NOT NULL,
  location VARCHAR(300) NOT NULL,
  max_participants INTEGER NOT NULL DEFAULT 10,
  current_participants INTEGER NOT NULL DEFAULT 0,
  registration_open_date TIMESTAMP WITH TIME ZONE DEFAULT NULL,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by VARCHAR(100) DEFAULT 'admin'
);

-- 참여자 테이블
CREATE TABLE participants (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID REFERENCES running_sessions(id) ON DELETE SET NULL,
  name VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(255) NOT NULL,
  emergency_contact VARCHAR(100) NOT NULL,
  emergency_phone VARCHAR(20) NOT NULL,
  medical_conditions TEXT,
  privacy_consent BOOLEAN NOT NULL DEFAULT FALSE,
  marketing_consent BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 인덱스 생성
CREATE INDEX idx_running_sessions_date ON running_sessions(date);
CREATE INDEX idx_participants_session_id ON participants(session_id);
CREATE INDEX idx_participants_created_at ON participants(created_at);

-- Row Level Security (RLS) 활성화
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE running_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE participants ENABLE ROW LEVEL SECURITY;

-- RLS 정책 생성
-- 관리자는 모든 데이터에 접근 가능
CREATE POLICY "Admins can view all data" ON running_sessions
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can view all participants" ON participants
  FOR ALL USING (auth.role() = 'authenticated');

-- 익명 사용자는 참여자 데이터만 삽입 가능
CREATE POLICY "Anyone can insert participants" ON participants
  FOR INSERT WITH CHECK (true);

-- 익명 사용자는 러닝 세션 조회만 가능
CREATE POLICY "Anyone can view running sessions" ON running_sessions
  FOR SELECT USING (true);

-- 기본 관리자 계정 생성 (선택사항)
INSERT INTO admins (email, name) VALUES 
('admin@frc.com', 'FRC 관리자');

-- 샘플 러닝 세션 데이터 (선택사항)
INSERT INTO running_sessions (title, description, date, time, location, max_participants, created_by) 
VALUES 
('초보자 러닝 클래스', '러닝을 처음 시작하는 분들을 위한 기초 클래스입니다. 물리치료사가 직접 지도합니다.', 
 CURRENT_DATE + INTERVAL '7 days', '19:00:00', '한강공원 반포지구', 15, 'admin'),
('중급자 러닝 그룹', '어느 정도 러닝 경험이 있는 분들을 위한 중급 클래스입니다.', 
 CURRENT_DATE + INTERVAL '10 days', '18:30:00', '올림픽공원', 12, 'admin');
