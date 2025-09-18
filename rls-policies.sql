-- FRC 러닝 크루 RLS 정책 업데이트
-- 모든 사용자가 모든 CRUD 작업을 할 수 있도록 설정

-- 기존 정책 삭제
DROP POLICY IF EXISTS "Admins can view all data" ON running_sessions;
DROP POLICY IF EXISTS "Admins can view all participants" ON participants;
DROP POLICY IF EXISTS "Anyone can insert participants" ON participants;
DROP POLICY IF EXISTS "Anyone can view running sessions" ON running_sessions;
DROP POLICY IF EXISTS "Anyone can select running_sessions" ON running_sessions;
DROP POLICY IF EXISTS "Anyone can select participants" ON participants;

-- 새로운 정책 생성 - running_sessions 테이블
-- 모든 사용자가 모든 작업 가능
CREATE POLICY "Anyone can do everything on running_sessions" ON running_sessions
  FOR ALL USING (true) WITH CHECK (true);

-- 추가로 조회 전용 정책도 생성 (더 명확하게)
CREATE POLICY "Anyone can select running_sessions" ON running_sessions
  FOR SELECT USING (true);

-- 새로운 정책 생성 - participants 테이블  
-- 모든 사용자가 모든 작업 가능
CREATE POLICY "Anyone can do everything on participants" ON participants
  FOR ALL USING (true) WITH CHECK (true);

-- 추가로 조회 전용 정책도 생성 (더 명확하게)
CREATE POLICY "Anyone can select participants" ON participants
  FOR SELECT USING (true);

-- admins 테이블도 모든 작업 허용 (필요한 경우)
DROP POLICY IF EXISTS "Admins only" ON admins;
CREATE POLICY "Anyone can do everything on admins" ON admins
  FOR ALL USING (true) WITH CHECK (true);

-- 정책 적용 확인
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies 
WHERE schemaname = 'public' 
AND tablename IN ('running_sessions', 'participants', 'admins');
