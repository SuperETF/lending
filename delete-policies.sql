-- FRC 러닝 크루 삭제 전용 RLS 정책
-- 모든 사용자가 삭제(DELETE) 작업을 할 수 있도록 설정

-- 기존 모든 정책 삭제 (완전 초기화)
DROP POLICY IF EXISTS "Admins can view all data" ON running_sessions;
DROP POLICY IF EXISTS "Admins can view all participants" ON participants;
DROP POLICY IF EXISTS "Anyone can insert participants" ON participants;
DROP POLICY IF EXISTS "Anyone can view running sessions" ON running_sessions;
DROP POLICY IF EXISTS "Anyone can select running_sessions" ON running_sessions;
DROP POLICY IF EXISTS "Anyone can select participants" ON participants;
DROP POLICY IF EXISTS "Anyone can do everything on running_sessions" ON running_sessions;
DROP POLICY IF EXISTS "Anyone can do everything on participants" ON participants;
DROP POLICY IF EXISTS "Anyone can do everything on admins" ON admins;

-- running_sessions 테이블 - 모든 작업 허용
CREATE POLICY "Full access to running_sessions" ON running_sessions
  FOR ALL USING (true) WITH CHECK (true);

-- participants 테이블 - 모든 작업 허용  
CREATE POLICY "Full access to participants" ON participants
  FOR ALL USING (true) WITH CHECK (true);

-- admins 테이블 - 모든 작업 허용
CREATE POLICY "Full access to admins" ON admins
  FOR ALL USING (true) WITH CHECK (true);

-- 추가로 명시적인 DELETE 정책 생성 (더 확실하게)
CREATE POLICY "Anyone can delete running_sessions" ON running_sessions
  FOR DELETE USING (true);

CREATE POLICY "Anyone can delete participants" ON participants
  FOR DELETE USING (true);

-- RLS 활성화 상태 확인
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('running_sessions', 'participants', 'admins');

-- 적용된 정책 확인
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies 
WHERE schemaname = 'public' 
AND tablename IN ('running_sessions', 'participants', 'admins')
ORDER BY tablename, policyname;
