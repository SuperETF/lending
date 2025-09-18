-- FRC Storage RLS 정책 설정
-- frc-session-images 버킷에 대한 모든 권한 부여

-- Storage 객체에 대한 정책 생성
-- 1. 업로드 권한
CREATE POLICY "Anyone can upload to frc-session-images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'frc-session-images');

-- 2. 조회 권한
CREATE POLICY "Anyone can view frc-session-images" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'frc-session-images');

-- 3. 삭제 권한
CREATE POLICY "Anyone can delete from frc-session-images" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'frc-session-images');

-- 4. 수정 권한
CREATE POLICY "Anyone can update frc-session-images" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'frc-session-images') 
WITH CHECK (bucket_id = 'frc-session-images');

-- 현재 Storage 정책 확인
SELECT policyname, cmd, permissive, roles, qual, with_check
FROM pg_policies 
WHERE schemaname = 'storage' 
AND tablename = 'objects';
