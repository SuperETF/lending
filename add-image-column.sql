-- 기존 running_sessions 테이블에 image_url 컬럼 추가
ALTER TABLE running_sessions 
ADD COLUMN image_url TEXT;

-- Storage 버킷 생성 및 정책 설정 (Supabase 대시보드에서 실행)
-- 1. Storage > Create Bucket > 이름: frc-session-images
-- 2. Public bucket으로 설정
-- 3. 아래 정책들을 Storage > Policies에서 설정

-- Storage 정책: 모든 사용자가 이미지 업로드 가능
-- CREATE POLICY "Anyone can upload images" ON storage.objects 
--   FOR INSERT WITH CHECK (bucket_id = 'frc-session-images');

-- Storage 정책: 모든 사용자가 이미지 조회 가능  
-- CREATE POLICY "Anyone can view images" ON storage.objects
--   FOR SELECT USING (bucket_id = 'frc-session-images');

-- Storage 정책: 모든 사용자가 이미지 삭제 가능
-- CREATE POLICY "Anyone can delete images" ON storage.objects
--   FOR DELETE USING (bucket_id = 'frc-session-images');
