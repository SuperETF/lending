-- FRC 러닝 크루 조회 전용 RLS 정책
-- 모든 사용자가 조회(SELECT)만 가능하도록 설정

-- 기존 정책 삭제
DROP POLICY IF EXISTS "Admins can view all data" ON running_sessions;
DROP POLICY IF EXISTS "Admins can view all participants" ON participants;
DROP POLICY IF EXISTS "Anyone can insert participants" ON participants;
DROP POLICY IF EXISTS "Anyone can view running sessions" ON running_sessions;
DROP POLICY IF EXISTS "Anyone can do everything on running_sessions" ON running_sessions;
DROP POLICY IF EXISTS "Anyone can do everything on participants" ON participants;
DROP POLICY IF EXISTS "Anyone can select running_sessions" ON running_sessions;
DROP POLICY IF EXISTS "Anyone can select participants" ON participants;

-- 조회 전용 정책 생성 - running_sessions 테이블
CREATE POLICY "Anyone can select running_sessions" ON running_sessions
  FOR SELECT USING (true);

-- 조회 전용 정책 생성 - participants 테이블
CREATE POLICY "Anyone can select participants" ON participants
  FOR SELECT USING (true);

-- admins 테이블 조회 전용 정책 (필요한 경우)
DROP POLICY IF EXISTS "Anyone can do everything on admins" ON admins;
CREATE POLICY "Anyone can select admins" ON admins
  FOR SELECT USING (true);

-- 정책 적용 확인
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies 
WHERE schemaname = 'public' 
AND tablename IN ('running_sessions', 'participants', 'admins');
