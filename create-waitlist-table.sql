-- 대기 신청 테이블 생성
CREATE TABLE waitlist_participants (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID REFERENCES running_sessions(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 인덱스 생성
CREATE INDEX idx_waitlist_participants_session_id ON waitlist_participants(session_id);
CREATE INDEX idx_waitlist_participants_created_at ON waitlist_participants(created_at);

-- Row Level Security (RLS) 활성화
ALTER TABLE waitlist_participants ENABLE ROW LEVEL SECURITY;

-- RLS 정책 생성
-- 관리자는 모든 대기 신청 데이터에 접근 가능
CREATE POLICY "Admins can view all waitlist participants" ON waitlist_participants
  FOR ALL USING (auth.role() = 'authenticated');

-- 익명 사용자는 대기 신청 데이터만 삽입 가능
CREATE POLICY "Anyone can insert waitlist participants" ON waitlist_participants
  FOR INSERT WITH CHECK (true);
