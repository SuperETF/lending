-- 러닝 세션 테이블에 오픈 채팅방 링크 필드 추가
ALTER TABLE running_sessions 
ADD COLUMN chat_link TEXT;

-- 기존 세션들에 대한 설명 추가 (선택사항)
COMMENT ON COLUMN running_sessions.chat_link IS '세션 참여자들을 위한 오픈 채팅방 링크';
