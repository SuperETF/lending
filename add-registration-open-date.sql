-- 기존 running_sessions 테이블에 registration_open_date 컬럼 추가
ALTER TABLE running_sessions 
ADD COLUMN registration_open_date TIMESTAMP WITH TIME ZONE DEFAULT NULL;

-- 기존 데이터는 NULL로 유지 (즉시 신청 가능)
-- UPDATE running_sessions 
-- SET registration_open_date = NULL 
-- WHERE registration_open_date IS NOT NULL;
